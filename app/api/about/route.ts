import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/about - Récupérer tout le contenu About
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeHidden = searchParams.get('includeHidden') === 'true'
    
    const where = includeHidden ? {} : { visible: true }
    
    const content = await prisma.aboutContent.findMany({
      where,
      orderBy: [
        { section: 'asc' },
        { order: 'asc' }
      ]
    })

    // Organiser le contenu par sections
    const organizedContent = content.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    }, {} as Record<string, any[]>)

    return NextResponse.json({
      success: true,
      content: organizedContent,
      raw: content
    })
  } catch (error) {
    console.error('Error fetching about content:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du contenu' },
      { status: 500 }
    )
  }
}

// POST /api/about - Créer un nouvel élément de contenu
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { section, type, content, order, visible = true } = body

    // Validation des champs requis
    if (!section || !type || !content) {
      return NextResponse.json(
        { success: false, error: 'Les champs section, type et content sont requis' },
        { status: 400 }
      )
    }

    // Créer l'élément de contenu
    const aboutContent = await prisma.aboutContent.create({
      data: {
        section,
        type,
        content,
        order: order || 0,
        visible
      }
    })

    return NextResponse.json({
      success: true,
      content: aboutContent
    })
  } catch (error) {
    console.error('Error creating about content:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du contenu' },
      { status: 500 }
    )
  }
}

// PUT /api/about - Mettre à jour plusieurs éléments (pour la réorganisation)
export async function PUT(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { updates } = body // Array d'objets {id, section?, type?, content?, order?, visible?}

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { success: false, error: 'Le format des mises à jour est invalide' },
        { status: 400 }
      )
    }

    // Effectuer les mises à jour en parallèle
    const updatePromises = updates.map(update => {
      const { id, ...data } = update
      return prisma.aboutContent.update({
        where: { id },
        data
      })
    })

    const updatedContent = await Promise.all(updatePromises)

    return NextResponse.json({
      success: true,
      content: updatedContent
    })
  } catch (error) {
    console.error('Error updating about content:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du contenu' },
      { status: 500 }
    )
  }
}