import { S3Client } from '@aws-sdk/client-s3'

// Configuration du client S3 pour Cloudflare R2
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

// Configuration du bucket
export const R2_CONFIG = {
  bucket: process.env.R2_BUCKET_NAME!,
  publicUrl: process.env.R2_PUBLIC_URL!,
}

// Fonction utilitaire pour générer une clé unique pour le fichier
export function generateFileKey(originalName: string, folder: string = 'uploads'): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  return `${folder}/${timestamp}-${randomString}.${extension}`
}

// Fonction utilitaire pour obtenir l'URL publique
export function getPublicUrl(key: string): string {
  return `${R2_CONFIG.publicUrl}/${key}`
}