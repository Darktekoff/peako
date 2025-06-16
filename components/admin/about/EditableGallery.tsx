'use client'

import { useState } from 'react'
import { Save, Plus, Trash2, Upload, Image as ImageIcon, Video, Play } from 'lucide-react'
import ImageUpload from '@/components/ui/ImageUpload'

interface Media {
  url: string
  caption?: string
  width?: number
  height?: number
  thumbnailUrl?: string
  type?: 'image' | 'video'
}

interface GalleryContent {
  title: string
  subtitle: string
  photos: Media[] // Gardons "photos" pour la compatibilité mais ça contient maintenant images + vidéos
}

interface EditableGalleryProps {
  content: GalleryContent
  onSave: (content: GalleryContent) => void
}

export default function EditableGallery({ content, onSave }: EditableGalleryProps) {
  const [title, setTitle] = useState(content.title || 'Galerie')
  const [subtitle, setSubtitle] = useState(content.subtitle || 'Quelques moments mémorables de mes performances')
  const [photos, setPhotos] = useState<Media[]>(content.photos || [])
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    onSave({
      title,
      subtitle,
      photos: photos.filter(photo => photo.url.trim() !== '')
    })
    setHasChanges(false)
  }

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true)
  }

  const addMedia = (result: any) => {
    const newMedia: Media = {
      url: result.url,
      caption: '',
      thumbnailUrl: result.thumbnailUrl,
      type: result.type || (result.url.includes('.mp4') || result.url.includes('.webm') || result.url.includes('.mov') ? 'video' : 'image'),
      width: 800,
      height: 600
    }
    setPhotos([...photos, newMedia])
    markChanged()
  }

  const updatePhotoCaption = (index: number, caption: string) => {
    const newPhotos = [...photos]
    newPhotos[index].caption = caption
    setPhotos(newPhotos)
    markChanged()
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
    markChanged()
  }

  const movePhoto = (index: number, direction: 'left' | 'right') => {
    if (
      (direction === 'left' && index === 0) ||
      (direction === 'right' && index === photos.length - 1)
    ) {
      return
    }

    const newPhotos = [...photos]
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    
    const temp = newPhotos[index]
    newPhotos[index] = newPhotos[targetIndex]
    newPhotos[targetIndex] = temp
    
    setPhotos(newPhotos)
    markChanged()
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Galerie Photos</h3>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <Save className="mr-2" size={16} />
            Sauvegarder
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* En-tête de section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titre de la section
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                markChanged()
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Galerie"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sous-titre
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => {
                setSubtitle(e.target.value)
                markChanged()
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Quelques moments mémorables de mes performances"
            />
          </div>
        </div>

        {/* Upload de photos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Galerie ({photos.length} élément{photos.length > 1 ? 's' : ''})
            </label>
            <ImageUpload
              onUpload={addMedia}
              acceptVideo={true}
              category="media"
              folder="gallery"
              className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Plus className="mr-1" size={14} />
              Ajouter média
            </ImageUpload>
          </div>

          {photos.length === 0 ? (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-gray-500 transition-colors">
              <div className="flex items-center justify-center mb-4 space-x-2">
                <ImageIcon className="text-gray-400" size={48} />
                <Video className="text-gray-400" size={48} />
              </div>
              <p className="text-gray-400 mb-4">Aucun média dans la galerie</p>
              <ImageUpload
                onUpload={addMedia}
                acceptVideo={true}
                category="media"
                folder="gallery"
                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                <Upload className="mr-2" size={16} />
                Ajouter votre premier média
              </ImageUpload>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-3 group">
                  {/* Média */}
                  <div className="relative aspect-video mb-3 rounded overflow-hidden bg-gray-700">
                    {photo.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video
                          src={photo.url}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="text-white" size={32} />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={photo.thumbnailUrl || photo.url}
                        alt={photo.caption || `Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay avec contrôles */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button
                        onClick={() => movePhoto(index, 'left')}
                        disabled={index === 0}
                        className="p-2 bg-white/20 rounded text-white hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Déplacer à gauche"
                      >
                        ←
                      </button>
                      
                      <button
                        onClick={() => removePhoto(index)}
                        className="p-2 bg-red-600/80 rounded text-white hover:bg-red-600"
                        title="Supprimer cette photo"
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      <button
                        onClick={() => movePhoto(index, 'right')}
                        disabled={index === photos.length - 1}
                        className="p-2 bg-white/20 rounded text-white hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Déplacer à droite"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  {/* Type et légende */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-gray-400">
                        Légende (optionnelle)
                      </label>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                        {photo.type === 'video' ? (
                          <>
                            <Video size={12} className="mr-1" />
                            Vidéo
                          </>
                        ) : (
                          <>
                            <ImageIcon size={12} className="mr-1" />
                            Image
                          </>
                        )}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={photo.caption || ''}
                      onChange={(e) => updatePhotoCaption(index, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder={photo.type === 'video' ? "Description de la vidéo..." : "Description de la photo..."}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h4 className="text-lg font-medium text-white mb-4">Prévisualisation</h4>
        <div className="bg-black rounded-lg p-6 border border-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {title || "Galerie"}
            </h2>
            <p className="text-gray-400">
              {subtitle || "Quelques moments mémorables de mes performances"}
            </p>
          </div>
          
          {photos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>Aucune photo à afficher</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-colors cursor-pointer group">
                  <img
                    src={photo.thumbnailUrl || photo.url}
                    alt={photo.caption || `Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}