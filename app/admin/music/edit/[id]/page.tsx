'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import TrackForm from '@/components/admin/TrackForm'

interface Track {
  id: string
  title: string
  artist: string
  featuring?: string
  releaseDate: string
  releaseType: string
  genre: string
  duration?: string
  coverArt?: string
  soundcloudUrl?: string
  spotifyUrl?: string
  appleMusicUrl?: string
  youtubeUrl?: string
  beatportUrl?: string
  deezerUrl?: string
  featured: boolean
  visible: boolean
}

export default function EditTrackPage() {
  const router = useRouter()
  const params = useParams()
  const trackId = params.id as string
  
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Charger les données de la track
  useEffect(() => {
    const loadTrack = async () => {
      try {
        const response = await fetch(`/api/tracks/${trackId}`)
        const data = await response.json()

        if (data.success) {
          setTrack(data.track)
        } else {
          alert('Track non trouvée')
          router.push('/admin/music')
        }
      } catch (error) {
        console.error('Error loading track:', error)
        alert('Erreur lors du chargement de la track')
        router.push('/admin/music')
      } finally {
        setLoading(false)
      }
    }

    if (trackId) {
      loadTrack()
    }
  }, [trackId, router])

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/tracks/${trackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        alert('Track mise à jour avec succès!')
        router.push('/admin/music')
      } else {
        alert('Erreur: ' + result.error)
      }
    } catch (error) {
      console.error('Error updating track:', error)
      alert('Erreur lors de la mise à jour de la track')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/music')
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-2 text-gray-600">Chargement de la track...</span>
      </div>
    )
  }

  if (!track) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Track non trouvée</p>
      </div>
    )
  }

  // Formater les données pour le formulaire
  const initialData = {
    title: track.title,
    artist: track.artist,
    featuring: track.featuring || '',
    releaseDate: new Date(track.releaseDate).toISOString().split('T')[0],
    releaseType: track.releaseType as any,
    genre: track.genre,
    duration: track.duration || '',
    coverArt: track.coverArt || '',
    soundcloudUrl: track.soundcloudUrl || '',
    spotifyUrl: track.spotifyUrl || '',
    appleMusicUrl: track.appleMusicUrl || '',
    youtubeUrl: track.youtubeUrl || '',
    beatportUrl: track.beatportUrl || '',
    deezerUrl: track.deezerUrl || '',
    featured: track.featured,
    visible: track.visible
  }

  return (
    <div className="p-6">
      <TrackForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </div>
  )
}