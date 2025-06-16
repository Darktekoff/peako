import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ReleaseType } from '@prisma/client'

// GET - Récupérer une track spécifique
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const track = await prisma.track.findUnique({
      where: { id }
    })

    if (!track) {
      return NextResponse.json(
        { error: 'Track non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      track
    })

  } catch (error) {
    console.error('Error fetching track:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la track' },
      { status: 500 }
    )
  }
}

// PUT - Modifier une track
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const { id } = await params

    const body = await request.json()
    const {
      title,
      artist,
      featuring,
      releaseDate,
      releaseType,
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
      order
    } = body

    // Vérifier que la track existe
    const existingTrack = await prisma.track.findUnique({
      where: { id }
    })

    if (!existingTrack) {
      return NextResponse.json(
        { error: 'Track non trouvée' },
        { status: 404 }
      )
    }

    // Validation du type de release si fourni
    if (releaseType) {
      const validReleaseTypes = ['SINGLE', 'EP', 'ALBUM', 'REMIX', 'BOOTLEG', 'COLLAB']
      if (!validReleaseTypes.includes(releaseType)) {
        return NextResponse.json(
          { error: 'Type de release invalide' },
          { status: 400 }
        )
      }
    }

    // Préparer les données de mise à jour
    const updateData: any = {}
    
    if (title !== undefined) updateData.title = title
    if (artist !== undefined) updateData.artist = artist
    if (featuring !== undefined) updateData.featuring = featuring
    if (releaseDate !== undefined) updateData.releaseDate = new Date(releaseDate)
    if (releaseType !== undefined) updateData.releaseType = releaseType as ReleaseType
    if (genre !== undefined) updateData.genre = genre
    if (duration !== undefined) updateData.duration = duration
    if (coverArt !== undefined) updateData.coverArt = coverArt
    if (audioFile !== undefined) updateData.audioFile = audioFile
    if (soundcloudUrl !== undefined) updateData.soundcloudUrl = soundcloudUrl
    if (soundcloudId !== undefined) updateData.soundcloudId = soundcloudId
    if (spotifyUrl !== undefined) updateData.spotifyUrl = spotifyUrl
    if (appleMusicUrl !== undefined) updateData.appleMusicUrl = appleMusicUrl
    if (youtubeUrl !== undefined) updateData.youtubeUrl = youtubeUrl
    if (beatportUrl !== undefined) updateData.beatportUrl = beatportUrl
    if (deezerUrl !== undefined) updateData.deezerUrl = deezerUrl
    if (featured !== undefined) updateData.featured = featured
    if (visible !== undefined) updateData.visible = visible
    if (order !== undefined) updateData.order = order

    // Mettre à jour la track
    const track = await prisma.track.update({
      where: { id },
      data: updateData
    })

    console.log('✅ Track updated:', track.title)

    return NextResponse.json({
      success: true,
      track,
      message: 'Track mise à jour avec succès'
    })

  } catch (error) {
    console.error('Error updating track:', error)
    
    // Erreur de duplication
    if (error instanceof Error && error.message.includes('unique constraint')) {
      return NextResponse.json(
        { error: 'ID SoundCloud déjà utilisé par une autre track' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la track' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une track
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const { id } = await params

    // Vérifier que la track existe
    const existingTrack = await prisma.track.findUnique({
      where: { id }
    })

    if (!existingTrack) {
      return NextResponse.json(
        { error: 'Track non trouvée' },
        { status: 404 }
      )
    }

    // Supprimer la track
    await prisma.track.delete({
      where: { id }
    })

    console.log('✅ Track deleted:', existingTrack.title)

    return NextResponse.json({
      success: true,
      message: 'Track supprimée avec succès'
    })

  } catch (error) {
    console.error('Error deleting track:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la track' },
      { status: 500 }
    )
  }
}