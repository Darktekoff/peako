'use client'

import { useState, useEffect } from 'react'
import { 
  Music, 
  Link, 
  Loader2, 
  Save, 
  Eye,
  EyeOff,
  Star,
  StarOff,
  ExternalLink,
  Play,
  Calendar,
  Tag,
  Clock,
  User,
  Image as ImageIcon
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import ImageUpload from '@/components/ui/ImageUpload'

interface TrackFormData {
  title: string
  artist: string
  featuring: string
  releaseDate: string
  releaseType: 'SINGLE' | 'EP' | 'ALBUM' | 'REMIX' | 'BOOTLEG' | 'COLLAB'
  genre: string
  duration: string
  coverArt: string
  soundcloudUrl: string
  spotifyUrl: string
  appleMusicUrl: string
  youtubeUrl: string
  beatportUrl: string
  deezerUrl: string
  featured: boolean
  visible: boolean
}

interface TrackFormProps {
  initialData?: Partial<TrackFormData>
  onSubmit: (data: TrackFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  mode: 'create' | 'edit'
}

export default function TrackForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode
}: TrackFormProps) {
  const [formData, setFormData] = useState<TrackFormData>({
    title: '',
    artist: "Peak'O",
    featuring: '',
    releaseDate: new Date().toISOString().split('T')[0],
    releaseType: 'SINGLE',
    genre: 'Hardstyle',
    duration: '',
    coverArt: '',
    soundcloudUrl: '',
    spotifyUrl: '',
    appleMusicUrl: '',
    youtubeUrl: '',
    beatportUrl: '',
    deezerUrl: '',
    featured: false,
    visible: true,
    ...initialData
  })

  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState('')
  const [soundcloudPreview, setSoundcloudPreview] = useState('')

  // Analyser l'URL SoundCloud
  const analyzeSoundCloud = async () => {
    if (!formData.soundcloudUrl) {
      setAnalyzeError('Veuillez saisir une URL SoundCloud')
      return
    }

    setAnalyzing(true)
    setAnalyzeError('')

    try {
      const response = await fetch('/api/analyze-soundcloud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: formData.soundcloudUrl })
      })

      const result = await response.json()

      if (result.success && result.metadata) {
        const metadata = result.metadata
        
        // Pré-remplir le formulaire avec les métadonnées
        setFormData(prev => ({
          ...prev,
          title: metadata.title || prev.title,
          artist: metadata.artist || prev.artist,
          duration: metadata.duration || prev.duration,
          coverArt: metadata.artwork_url || prev.coverArt,
          genre: metadata.genre || prev.genre,
          releaseDate: metadata.created_at 
            ? new Date(metadata.created_at).toISOString().split('T')[0]
            : prev.releaseDate
        }))

        // Préparer l'aperçu SoundCloud
        setSoundcloudPreview(formData.soundcloudUrl)
        
        console.log('✅ Métadonnées extraites avec succès')
      } else {
        setAnalyzeError(result.message || 'Erreur lors de l\'analyse')
      }
    } catch (error) {
      console.error('Erreur analyse SoundCloud:', error)
      setAnalyzeError('Erreur lors de l\'analyse de l\'URL')
    } finally {
      setAnalyzing(false)
    }
  }

  // Mettre à jour l'aperçu SoundCloud quand l'URL change
  useEffect(() => {
    if (formData.soundcloudUrl && formData.soundcloudUrl.includes('soundcloud.com')) {
      setSoundcloudPreview(formData.soundcloudUrl)
    } else {
      setSoundcloudPreview('')
    }
  }, [formData.soundcloudUrl])

  const handleInputChange = (field: keyof TrackFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Reset error when user changes SoundCloud URL
    if (field === 'soundcloudUrl') {
      setAnalyzeError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Le titre est requis')
      return
    }

    await onSubmit(formData)
  }

  const releaseTypes = [
    { value: 'SINGLE', label: 'Single' },
    { value: 'EP', label: 'EP' },
    { value: 'ALBUM', label: 'Album' },
    { value: 'REMIX', label: 'Remix' },
    { value: 'BOOTLEG', label: 'Bootleg' },
    { value: 'COLLAB', label: 'Collaboration' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'create' ? 'Nouvelle track' : 'Modifier la track'}
            </h1>
            <p className="text-gray-600">
              {mode === 'create' 
                ? 'Collez l\'URL SoundCloud pour pré-remplir automatiquement les informations'
                : 'Modifiez les informations de la track'
              }
            </p>
          </div>

          {/* URL SoundCloud */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL SoundCloud *
              </label>
              <div className="flex gap-3">
                <Input
                  value={formData.soundcloudUrl}
                  onChange={(e) => handleInputChange('soundcloudUrl', e.target.value)}
                  placeholder="https://soundcloud.com/peako_music/track-name"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={analyzeSoundCloud}
                  disabled={analyzing || !formData.soundcloudUrl}
                  variant="outline"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyse...
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4 mr-2" />
                      Analyser
                    </>
                  )}
                </Button>
              </div>
              {analyzeError && (
                <p className="text-orange-600 text-sm mt-2">{analyzeError}</p>
              )}
            </div>

            {/* Aperçu SoundCloud */}
            {soundcloudPreview && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Aperçu SoundCloud
                </h3>
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudPreview)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Informations principales */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Music className="w-5 h-5 mr-2" />
            Informations principales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Nom de la track"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artiste
              </label>
              <Input
                value={formData.artist}
                onChange={(e) => handleInputChange('artist', e.target.value)}
                placeholder="Peak'O"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featuring
              </label>
              <Input
                value={formData.featuring}
                onChange={(e) => handleInputChange('featuring', e.target.value)}
                placeholder="Artiste(s) en featuring (optionnel)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de sortie *
              </label>
              <Input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de sortie
              </label>
              <select
                value={formData.releaseType}
                onChange={(e) => handleInputChange('releaseType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {releaseTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <Input
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                placeholder="Hardstyle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée
              </label>
              <Input
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="4:20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Art
              </label>
              {/* TODO: Remplacer par un composant d'upload approprié */}
              <input
                type="url"
                value={formData.coverArt}
                onChange={(e) => handleInputChange('coverArt', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="URL du cover art"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Liens streaming */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2" />
            Liens streaming
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spotify
              </label>
              <Input
                value={formData.spotifyUrl}
                onChange={(e) => handleInputChange('spotifyUrl', e.target.value)}
                placeholder="https://open.spotify.com/track/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apple Music
              </label>
              <Input
                value={formData.appleMusicUrl}
                onChange={(e) => handleInputChange('appleMusicUrl', e.target.value)}
                placeholder="https://music.apple.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube
              </label>
              <Input
                value={formData.youtubeUrl}
                onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beatport
              </label>
              <Input
                value={formData.beatportUrl}
                onChange={(e) => handleInputChange('beatportUrl', e.target.value)}
                placeholder="https://beatport.com/track/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deezer
              </label>
              <Input
                value={formData.deezerUrl}
                onChange={(e) => handleInputChange('deezerUrl', e.target.value)}
                placeholder="https://deezer.com/track/..."
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Options</h2>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.visible}
                onChange={(e) => handleInputChange('visible', e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                {formData.visible ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                Visible sur le site
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                {formData.featured ? <Star className="w-4 h-4 mr-1" /> : <StarOff className="w-4 h-4 mr-1" />}
                Track mise en avant
              </span>
            </label>
          </div>
        </div>

        {/* Actions en bas */}
        <div className="sticky bottom-0 bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              {mode === 'create' 
                ? 'La track sera visible sur le site après création'
                : 'Les modifications seront visibles immédiatement'
              }
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 sm:flex-initial">
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading} size="lg" className="flex-1 sm:flex-initial">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {mode === 'create' ? 'Créer la track' : 'Sauvegarder les modifications'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}