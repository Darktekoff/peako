'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Music, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  ExternalLink,
  Play,
  TrendingUp,
  Calendar,
  Hash,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  releaseDate: string
  genre: string
  duration: string
  coverArt: string
  soundcloudUrl: string
  soundcloudId: string
  playCount: number
  featured: boolean
  visible: boolean
  order: number
  soundcloudData?: {
    description: string
    playback_count: number
    favoritings_count: number
    tags: string
  }
  lastSyncAt?: string
  syncSource: string
}

export default function MusicManager() {
  const router = useRouter()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les tracks depuis la DB
  const loadTracks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tracks')
      const data = await response.json()
      
      if (data.success) {
        setTracks(data.tracks)
      } else {
        console.error('Error loading tracks:', data.error)
      }
    } catch (error) {
      console.error('Error loading tracks:', error)
    } finally {
      setLoading(false)
    }
  }


  // Toggle visibilité d'une track
  const toggleVisibility = async (trackId: string) => {
    try {
      const track = tracks.find(t => t.id === trackId)
      if (!track) return

      const response = await fetch(`/api/tracks/${trackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ visible: !track.visible })
      })

      if (response.ok) {
        setTracks(prev => prev.map(track => 
          track.id === trackId 
            ? { ...track, visible: !track.visible }
            : track
        ))
      }
    } catch (error) {
      console.error('Error toggling visibility:', error)
    }
  }

  // Toggle featured d'une track
  const toggleFeatured = async (trackId: string) => {
    try {
      const track = tracks.find(t => t.id === trackId)
      if (!track) return

      const response = await fetch(`/api/tracks/${trackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featured: !track.featured })
      })

      if (response.ok) {
        setTracks(prev => prev.map(track => 
          track.id === trackId 
            ? { ...track, featured: !track.featured }
            : track
        ))
      }
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  // Supprimer une track
  const deleteTrack = async (trackId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette track ?')) {
      return
    }

    try {
      const response = await fetch(`/api/tracks/${trackId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setTracks(prev => prev.filter(track => track.id !== trackId))
        alert('Track supprimée avec succès')
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting track:', error)
      alert('Erreur lors de la suppression')
    }
  }

  useEffect(() => {
    loadTracks()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion de la musique</h1>
          <p className="text-gray-600">
            Gérez votre discographie et vos tracks
          </p>
        </div>
        
        <div>
          <button
            onClick={() => router.push('/admin/music/new')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvelle track
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Music className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Tracks</p>
              <p className="text-2xl font-semibold text-gray-900">{tracks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Eye className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Visibles</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tracks.filter(t => t.visible).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Featured</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tracks.filter(t => t.featured).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Écoutes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(tracks.reduce((sum, t) => sum + t.playCount, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Liste des tracks */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Mes tracks</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Chargement des tracks...</p>
          </div>
        ) : tracks.length === 0 ? (
          <div className="p-8 text-center">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune track trouvée</h3>
            <p className="text-gray-500 mb-4">
              Ajoutez votre première track en cliquant sur "Nouvelle track"
            </p>
            <button
              onClick={() => router.push('/admin/music/new')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter ma première track
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {tracks.map((track) => (
              <div key={track.id} className="p-6">
                <div className="flex items-start gap-4">
                  {/* Cover Art */}
                  <div className="flex-shrink-0">
                    {track.coverArt ? (
                      <img 
                        src={track.coverArt} 
                        alt={track.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Infos Track */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {track.title}
                        </h3>
                        <p className="text-gray-600">{track.artist}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(track.releaseDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Hash className="w-4 h-4" />
                            {track.genre}
                          </div>
                          <div className="flex items-center gap-1">
                            <Play className="w-4 h-4" />
                            {formatNumber(track.playCount)} écoutes
                          </div>
                        </div>

                        {track.soundcloudData?.description && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {track.soundcloudData.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleVisibility(track.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            track.visible 
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={track.visible ? 'Masquer' : 'Afficher'}
                        >
                          {track.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => toggleFeatured(track.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            track.featured 
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={track.featured ? 'Retirer des favoris' : 'Mettre en favori'}
                        >
                          {track.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => router.push(`/admin/music/edit/${track.id}`)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteTrack(track.id)}
                          className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {track.soundcloudUrl && (
                          <a
                            href={track.soundcloudUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                            title="Voir sur SoundCloud"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}