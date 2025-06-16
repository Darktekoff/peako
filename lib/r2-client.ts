import { S3Client } from '@aws-sdk/client-s3'

if (!process.env.R2_ACCOUNT_ID) {
  throw new Error('R2_ACCOUNT_ID is required')
}

if (!process.env.R2_ACCESS_KEY_ID) {
  throw new Error('R2_ACCESS_KEY_ID is required')
}

if (!process.env.R2_SECRET_ACCESS_KEY) {
  throw new Error('R2_SECRET_ACCESS_KEY is required')
}

// Configuration du client Cloudflare R2
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

export const R2_CONFIG = {
  bucketName: process.env.R2_BUCKET_NAME || 'peako',
  publicUrl: process.env.R2_PUBLIC_URL || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  maxFileSize: 50 * 1024 * 1024, // 50MB pour supporter les vidéos
  maxImageSize: 10 * 1024 * 1024, // 10MB pour les images
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime'],
  allowedAudioTypes: ['audio/mpeg', 'audio/wav', 'audio/mp3'],
  allowedDocumentTypes: ['application/pdf', 'text/plain'],
}