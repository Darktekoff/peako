import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/about/[id] - Récupérer un élément de contenu spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const content = await prisma.aboutContent.findUnique({
      where: { id }
    })

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Élément de contenu non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      content
    })
  } catch (error) {
    console.error('Error fetching about content item:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de l\'élément' },
      { status: 500 }
    )
  }
}

// PUT /api/about/[id] - Mettre à jour un élément de contenu
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { section, type, content, order, visible } = body

    // Vérifier que l'élément existe
    const existingContent = await prisma.aboutContent.findUnique({
      where: { id }
    })

    if (!existingContent) {
      return NextResponse.json(
        { success: false, error: 'Élément de contenu non trouvé' },
        { status: 404 }
      )
    }

    // Mettre à jour l'élément
    const updatedContent = await prisma.aboutContent.update({
      where: { id },
      data: {
        ...(section !== undefined && { section }),
        ...(type !== undefined && { type }),
        ...(content !== undefined && { content }),
        ...(order !== undefined && { order }),
        ...(visible !== undefined && { visible })
      }
    })

    return NextResponse.json({
      success: true,
      content: updatedContent
    })
  } catch (error) {
    console.error('Error updating about content item:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour de l\'élément' },
      { status: 500 }
    )
  }
}

// DELETE /api/about/[id] - Supprimer un élément de contenu
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id } = await params
    
    // Vérifier que l'élément existe
    const existingContent = await prisma.aboutContent.findUnique({
      where: { id }
    })

    if (!existingContent) {
      return NextResponse.json(
        { success: false, error: 'Élément de contenu non trouvé' },
        { status: 404 }
      )
    }

    // Supprimer l'élément
    await prisma.aboutContent.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Élément de contenu supprimé avec succès'
    })
  } catch (error) {
    console.error('Error deleting about content item:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression de l\'élément' },
      { status: 500 }
    )
  }
}