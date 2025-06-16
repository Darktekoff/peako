'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, Music, FileText, Folder, Upload, Trash2 } from 'lucide-react'
import FileUploader from '@/components/ui/FileUploader'

interface Media {
  id: string
  filename: string
  originalName: string
  url: string
  thumbnailUrl?: string
  key: string
  size: number
  mimeType: string
  category: 'IMAGE' | 'AUDIO' | 'DOCUMENT'
  folder?: string
  createdAt: string
}

export default function MediaManager() {
  const [activeTab, setActiveTab] = useState<'images' | 'audio' | 'documents'>('images')
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les médias depuis la DB
  const loadMedia = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/media')
      const data = await response.json()
      
      if (data.success) {
        setMedia(data.media)
      } else {
        console.error('Error loading media:', data.error)
      }
    } catch (error) {
      console.error('Error loading media:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [])

  // Compter les fichiers par catégorie
  const getFileCount = (category: string) => {
    return media.filter(file => {
      if (category === 'images') return file.category === 'IMAGE'
      if (category === 'audio') return file.category === 'AUDIO'
      if (category === 'documents') return file.category === 'DOCUMENT'
      return false
    }).length
  }

  const tabs = [
    { id: 'images' as const, name: 'Images', icon: ImageIcon, count: getFileCount('images') },
    { id: 'audio' as const, name: 'Audio', icon: Music, count: getFileCount('audio') },
    { id: 'documents' as const, name: 'Documents', icon: FileText, count: getFileCount('documents') },
  ]

  const handleUpload = (files: any[]) => {
    // Recharger la liste après upload
    loadMedia()
  }

  // Supprimer un média
  const deleteMedia = async (mediaId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      return
    }

    try {
      const response = await fetch(`/api/media?id=${mediaId}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      
      if (data.success) {
        // Recharger la liste
        loadMedia()
        alert('Fichier supprimé avec succès')
      } else {
        alert('Erreur: ' + data.error)
      }
    } catch (error) {
      console.error('Error deleting media:', error)
      alert('Erreur lors de la suppression')
    }
  }

  // Filtrer les fichiers par catégorie active
  const filteredFiles = media.filter(file => {
    if (activeTab === 'images') return file.category === 'IMAGE'
    if (activeTab === 'audio') return file.category === 'AUDIO'
    if (activeTab === 'documents') return file.category === 'DOCUMENT'
    return false
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestionnaire de médias</h1>
        <p className="text-gray-600">
          Uploadez et gérez vos images, fichiers audio et documents
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
                {tab.count > 0 && (
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload de {activeTab === 'images' ? 'images' : activeTab === 'audio' ? 'fichiers audio' : 'documents'}
            </h2>
            
            <FileUploader
              category={activeTab === 'images' ? 'image' : activeTab === 'audio' ? 'audio' : 'document'}
              folder={activeTab}
              onUpload={handleUpload}
              multiple={true}
            />
          </div>
        </div>

        {/* Media Library */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Folder className="w-5 h-5" />
              Bibliothèque de médias
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Chargement des médias...</p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {activeTab === 'images' && <ImageIcon className="w-6 h-6 text-gray-400" />}
                  {activeTab === 'audio' && <Music className="w-6 h-6 text-gray-400" />}
                  {activeTab === 'documents' && <FileText className="w-6 h-6 text-gray-400" />}
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Aucun fichier
                </h3>
                <p className="text-sm text-gray-500">
                  Uploadez vos premiers fichiers pour commencer
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Affichage des fichiers uploadés */}
                <div className="grid gap-4">
                  {filteredFiles.map((file) => (
                      <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          {file.thumbnailUrl && activeTab === 'images' ? (
                            <img 
                              src={file.thumbnailUrl} 
                              alt={file.originalName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              {activeTab === 'images' && <ImageIcon className="w-6 h-6 text-gray-400" />}
                              {activeTab === 'audio' && <Music className="w-6 h-6 text-gray-400" />}
                              {activeTab === 'documents' && <FileText className="w-6 h-6 text-gray-400" />}
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {file.originalName}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.mimeType}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(file.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                            <div className="mt-2 flex items-center gap-3">
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                              >
                                Voir le fichier →
                              </a>
                              <button
                                onClick={() => navigator.clipboard.writeText(file.url)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Copier l'URL
                              </button>
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            <button
                              onClick={() => deleteMedia(file.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Comment utiliser le gestionnaire de médias</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Images :</strong> Pour les photos de concerts, covers d'albums, photos de profil</li>
          <li>• <strong>Audio :</strong> Pour les extraits de tracks, demos, sets</li>
          <li>• <strong>Documents :</strong> Pour les riders techniques, contrats, press kits</li>
          <li>• Les images sont automatiquement optimisées et des miniatures sont créées</li>
          <li>• Tous les fichiers sont stockés de manière sécurisée sur Cloudflare</li>
        </ul>
      </div>
    </div>
  )
}