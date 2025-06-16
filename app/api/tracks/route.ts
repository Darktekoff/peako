import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ReleaseType } from '@prisma/client'

// GET - Récupérer toutes les tracks
export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { releaseDate: 'desc' }
      ]
    })

    return NextResponse.json({
      success: true,
      tracks
    })

  } catch (error) {
    console.error('Error fetching tracks:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des tracks' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle track
export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      artist = "Peak'O",
      featuring,
      releaseDate,
      releaseType = 'SINGLE',
      genre = 'Hardstyle',
      duration,
      coverArt,
      audioFile,
      soundcloudUrl,
      soundcloudId,
      spotifyUrl,
      appleMusicUrl,
      youtubeUrl,
      beatportUrl,
      deezerUrl,
      featured = false,
      visible = true
    } = body

    // Validation des champs requis
    if (!title || !releaseDate) {
      return NextResponse.json(
        { error: 'Titre et date de sortie sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que le type de release est valide
    const validReleaseTypes = ['SINGLE', 'EP', 'ALBUM', 'REMIX', 'BOOTLEG', 'COLLAB']
    if (!validReleaseTypes.includes(releaseType)) {
      return NextResponse.json(
        { error: 'Type de release invalide' },
        { status: 400 }
      )
    }

    // Calculer l'ordre suivant
    const lastTrack = await prisma.track.findFirst({
      orderBy: { order: 'desc' }
    })
    const nextOrder = (lastTrack?.order || 0) + 1

    // Créer la track
    const track = await prisma.track.create({
      data: {
        title,
        artist,
        featuring,
        releaseDate: new Date(releaseDate),
        releaseType: releaseType as ReleaseType,
        genre,
        duration,
        coverArt,
        audioFile,
        soundcloudUrl,
        soundcloudId,
        spotifyUrl,
        appleMusicUrl,
        youtubeUrl,
        beatportUrl,
        deezerUrl,
        featured,
        visible,
        order: nextOrder
      }
    })

    console.log('✅ Track created:', track.title)

    return NextResponse.json({
      success: true,
      track,
      message: 'Track créée avec succès'
    })

  } catch (error) {
    console.error('Error creating track:', error)
    
    // Erreur de duplication
    if (error instanceof Error && error.message.includes('unique constraint')) {
      return NextResponse.json(
        { error: 'Cette track existe déjà (URL SoundCloud ou ID déjà utilisé)' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la création de la track' },
      { status: 500 }
    )
  }
}