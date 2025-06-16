import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { r2Client, R2_CONFIG } from './r2-client'

export interface UploadResult {
  success: boolean
  url?: string
  key?: string
  error?: string
  thumbnailUrl?: string
}

// Générer un nom de fichier unique
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  const nameWithoutExt = originalName.split('.').slice(0, -1).join('.')
  const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase()
  
  return `${cleanName}-${timestamp}-${random}.${extension}`
}

// Optimiser et compresser une image
export async function optimizeImage(
  buffer: Buffer,
  options: {
    maxWidth?: number
    maxHeight?: number
    quality?: number
    createThumbnail?: boolean
  } = {}
): Promise<{ optimized: Buffer; thumbnail?: Buffer }> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 85, createThumbnail = true } = options

  // Image optimisée
  const optimized = await sharp(buffer)
    .resize(maxWidth, maxHeight, { 
      fit: 'inside',
      withoutEnlargement: true 
    })
    .jpeg({ quality })
    .toBuffer()

  // Miniature (si demandée)
  let thumbnail: Buffer | undefined
  if (createThumbnail) {
    thumbnail = await sharp(buffer)
      .resize(300, 300, { 
        fit: 'cover',
        position: 'center' 
      })
      .jpeg({ quality: 80 })
      .toBuffer()
  }

  return { optimized, thumbnail }
}

// Upload d'un fichier vers R2
export async function uploadToR2(
  file: Buffer,
  fileName: string,
  contentType: string,
  folder: string = ''
): Promise<UploadResult> {
  try {
    const key = folder ? `${folder}/${fileName}` : fileName

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000', // 1 an de cache
    })

    await r2Client.send(command)

    const url = `${R2_CONFIG.publicUrl}/${key}`

    return {
      success: true,
      url,
      key,
    }
  } catch (error) {
    console.error('Error uploading to R2:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    }
  }
}

// Upload d'une image avec optimisation
export async function uploadImage(
  file: Buffer,
  originalName: string,
  folder: string = 'images'
): Promise<UploadResult> {
  try {
    // Générer les noms de fichiers
    const fileName = generateUniqueFileName(originalName)
    const thumbnailName = fileName.replace(/\.[^/.]+$/, '-thumb.jpg')

    // Optimiser l'image
    const { optimized, thumbnail } = await optimizeImage(file)

    // Upload de l'image principale
    const imageResult = await uploadToR2(optimized, fileName, 'image/jpeg', folder)
    
    if (!imageResult.success) {
      return imageResult
    }

    // Upload de la miniature
    let thumbnailUrl: string | undefined
    if (thumbnail) {
      const thumbnailResult = await uploadToR2(thumbnail, thumbnailName, 'image/jpeg', `${folder}/thumbnails`)
      if (thumbnailResult.success) {
        thumbnailUrl = thumbnailResult.url
      }
    }

    return {
      success: true,
      url: imageResult.url,
      key: imageResult.key,
      thumbnailUrl,
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Image upload failed',
    }
  }
}

// Supprimer un fichier de R2
export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
    })

    await r2Client.send(command)
    return true
  } catch (error) {
    console.error('Error deleting from R2:', error)
    return false
  }
}

// Valider le type de fichier
export function validateFileType(contentType: string, category: 'image' | 'video' | 'audio' | 'document'): boolean {
  switch (category) {
    case 'image':
      return R2_CONFIG.allowedImageTypes.includes(contentType)
    case 'video':
      return R2_CONFIG.allowedVideoTypes.includes(contentType)
    case 'audio':
      return R2_CONFIG.allowedAudioTypes.includes(contentType)
    case 'document':
      return R2_CONFIG.allowedDocumentTypes.includes(contentType)
    default:
      return false
  }
}

// Valider la taille du fichier selon le type
export function validateFileSize(size: number, contentType?: string): boolean {
  if (contentType && contentType.startsWith('image/')) {
    return size <= R2_CONFIG.maxImageSize
  }
  return size <= R2_CONFIG.maxFileSize
}