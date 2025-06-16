import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadImage, uploadToR2, validateFileType, validateFileSize } from '@/lib/upload'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse la form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'image'
    const folder = formData.get('folder') as string || category

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validations
    if (!validateFileSize(file.size, file.type)) {
      const maxSize = file.type.startsWith('image/') ? '10MB' : '50MB'
      return NextResponse.json(
        { error: `File size too large (max ${maxSize})` },
        { status: 400 }
      )
    }

    if (!validateFileType(file.type, category as 'image' | 'video' | 'audio' | 'document')) {
      return NextResponse.json(
        { error: `Invalid file type for category: ${category}` },
        { status: 400 }
      )
    }

    // Convertir le fichier en Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let result

    // Upload avec optimisation pour les images
    if (category === 'image') {
      result = await uploadImage(buffer, file.name, folder)
    } else {
      // Upload direct pour vidéos/audio/documents
      result = await uploadToR2(buffer, file.name, file.type, folder)
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Upload failed' },
        { status: 500 }
      )
    }

    // Sauvegarder les métadonnées en base de données
    const media = await prisma.media.create({
      data: {
        filename: result.key!.split('/').pop()!, // Nom du fichier final
        originalName: file.name,
        url: result.url!,
        thumbnailUrl: result.thumbnailUrl,
        key: result.key!,
        size: file.size,
        mimeType: file.type,
        category: category === 'image' ? 'IMAGE' : category === 'video' ? 'VIDEO' : category === 'audio' ? 'AUDIO' : 'DOCUMENT',
        folder: folder,
      }
    })

    return NextResponse.json({
      success: true,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      key: result.key,
      filename: file.name,
      size: file.size,
      type: file.type,
      id: media.id,
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { error: 'File key required' },
        { status: 400 }
      )
    }

    const { deleteFromR2 } = await import('@/lib/upload')
    const success = await deleteFromR2(key)

    if (!success) {
      return NextResponse.json(
        { error: 'Delete failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}