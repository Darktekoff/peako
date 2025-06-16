import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/events/[id] - Récupérer un événement spécifique
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Événement non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      event
    })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de l\'événement' },
      { status: 500 }
    )
  }
}

// PUT /api/events/[id] - Mettre à jour un événement
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      name,
      venue,
      city,
      country,
      date,
      time,
      description,
      ticketLink,
      coverImage,
      status,
      featured
    } = body

    // Vérifier que l'événement existe
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Événement non trouvé' },
        { status: 404 }
      )
    }

    // Mettre à jour l'événement
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(venue !== undefined && { venue }),
        ...(city !== undefined && { city }),
        ...(country !== undefined && { country }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(time !== undefined && { time }),
        ...(description !== undefined && { description }),
        ...(ticketLink !== undefined && { ticketLink }),
        ...(coverImage !== undefined && { coverImage }),
        ...(status !== undefined && { status }),
        ...(featured !== undefined && { featured })
      }
    })

    return NextResponse.json({
      success: true,
      event
    })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour de l\'événement' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - Supprimer un événement
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Vérifier que l'événement existe
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Événement non trouvé' },
        { status: 404 }
      )
    }

    // Supprimer l'événement
    await prisma.event.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Événement supprimé avec succès'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression de l\'événement' },
      { status: 500 }
    )
  }
}