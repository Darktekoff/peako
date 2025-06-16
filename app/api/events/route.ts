import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { EventStatus } from '@prisma/client'

// GET /api/events - Récupérer tous les événements
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const includeAll = searchParams.get('all') === 'true'
    
    // Si includeAll=true, retourner tous les événements (pour l'admin)
    // Sinon, retourner seulement les événements confirmés et non passés
    const where = includeAll ? {} : {
      status: EventStatus.CONFIRMED,
      date: {
        gte: new Date()
      }
    }
    
    const events = await prisma.event.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { date: 'asc' }
      ]
    })

    return NextResponse.json({
      success: true,
      events
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des événements' },
      { status: 500 }
    )
  }
}

// POST /api/events - Créer un nouvel événement
export async function POST(request: Request) {
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
      status = EventStatus.CONFIRMED,
      featured = false
    } = body

    // Validation des champs requis
    if (!name || !venue || !city || !country || !date) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, lieu, ville, pays et date sont requis' },
        { status: 400 }
      )
    }

    // Créer l'événement
    const event = await prisma.event.create({
      data: {
        name,
        venue,
        city,
        country,
        date: new Date(date),
        time,
        description,
        ticketLink,
        coverImage,
        status,
        featured
      }
    })

    return NextResponse.json({
      success: true,
      event
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de l\'événement' },
      { status: 500 }
    )
  }
}