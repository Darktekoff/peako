import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/media - Récupérer tous les médias
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // 'IMAGE', 'AUDIO', 'DOCUMENT'
    const folder = searchParams.get('folder')
    
    const where: any = {}
    
    if (category) {
      where.category = category.toUpperCase()
    }
    
    if (folder) {
      where.folder = folder
    }
    
    const media = await prisma.media.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      media
    })
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des médias' },
      { status: 500 }
    )
  }
}

// DELETE /api/media - Supprimer un média
export async function DELETE(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du média requis' },
        { status: 400 }
      )
    }

    // Récupérer le média pour obtenir la clé R2
    const media = await prisma.media.findUnique({
      where: { id }
    })

    if (!media) {
      return NextResponse.json(
        { success: false, error: 'Média non trouvé' },
        { status: 404 }
      )
    }

    // Supprimer de R2
    const { deleteFromR2 } = await import('@/lib/upload')
    const deletedFromR2 = await deleteFromR2(media.key)
    
    if (media.thumbnailUrl) {
      // Supprimer aussi la miniature si elle existe
      const thumbnailKey = media.key.replace(/\.[^/.]+$/, '-thumb.jpg')
      await deleteFromR2(`${media.folder}/thumbnails/${thumbnailKey.split('/').pop()}`)
    }

    // Supprimer de la base de données
    await prisma.media.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Média supprimé avec succès'
    })
  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du média' },
      { status: 500 }
    )
  }
}