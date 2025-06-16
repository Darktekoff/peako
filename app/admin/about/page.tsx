'use client'

import { useState, useEffect } from 'react'
import { Save, Eye, Plus, Settings, RefreshCw } from 'lucide-react'
import EditableHero from '@/components/admin/about/EditableHero'
import EditableText from '@/components/admin/about/EditableText'
import EditableStats from '@/components/admin/about/EditableStats'
import EditableList from '@/components/admin/about/EditableList'
import EditableAchievements from '@/components/admin/about/EditableAchievements'
import EditableGallery from '@/components/admin/about/EditableGallery'
import SectionToggle from '@/components/admin/about/SectionToggle'

interface AboutContentItem {
  id: string
  section: string
  type: string
  content: any
  order: number
  visible: boolean
  createdAt: string
  updatedAt: string
}

interface AboutContent {
  [section: string]: AboutContentItem[]
}

export default function AboutAdmin() {
  const [content, setContent] = useState<AboutContent>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Charger le contenu existant
  const loadContent = async () => {
    try {
      const response = await fetch('/api/about?includeHidden=true')
      const data = await response.json()
      
      if (data.success) {
        setContent(data.content)
        setIsInitialized(data.raw && data.raw.length > 0)
      }
    } catch (error) {
      console.error('Erreur lors du chargement du contenu:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initialiser le contenu par défaut
  const initializeContent = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/about/init', {
        method: 'POST'
      })
      const data = await response.json()
      
      if (data.success) {
        await loadContent()
        setIsInitialized(true)
      } else {
        console.error('Erreur lors de l\'initialisation:', data.error)
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error)
    } finally {
      setSaving(false)
    }
  }

  // Sauvegarder un élément
  const saveItem = async (id: string, updates: Partial<AboutContentItem>) => {
    try {
      const response = await fetch(`/api/about/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (response.ok) {
        setLastSaved(new Date())
        await loadContent() // Recharger pour avoir les données à jour
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  // Toggle visibilité d'une section
  const toggleSectionVisibility = async (section: string, visible: boolean) => {
    const sectionItems = content[section] || []
    const updates = sectionItems.map(item => ({
      id: item.id,
      visible
    }))

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      })
      
      if (response.ok) {
        setLastSaved(new Date())
        await loadContent()
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  useEffect(() => {
    loadContent()
  }, [])

  // Composant de rendu selon le type
  const renderContentEditor = (item: AboutContentItem) => {
    const onSave = (updates: any) => saveItem(item.id, { content: updates })

    switch (item.type) {
      case 'HERO':
        return <EditableHero key={item.id} content={item.content} onSave={onSave} />
      case 'TEXT':
        return <EditableText key={item.id} content={item.content} onSave={onSave} />
      case 'STATS':
        return <EditableStats key={item.id} content={item.content} onSave={onSave} />
      case 'LIST':
        return <EditableList key={item.id} content={item.content} onSave={onSave} />
      case 'ACHIEVEMENT':
        return <EditableAchievements key={item.id} content={item.content} onSave={onSave} />
      case 'GALLERY':
        return <EditableGallery key={item.id} content={item.content} onSave={onSave} />
      default:
        return <div key={item.id} className="p-4 bg-red-900/20 border border-red-500 rounded-lg">Type de contenu non reconnu: {item.type}</div>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-400">Chargement du contenu...</p>
        </div>
      </div>
    )
  }

  if (!isInitialized) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <Settings size={64} className="mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-bold text-white mb-4">Page About non initialisée</h1>
          <p className="text-gray-400 mb-8">
            La page About n'a pas encore été configurée. Cliquez sur le bouton ci-dessous pour créer le contenu par défaut.
          </p>
          <button
            onClick={initializeContent}
            disabled={saving}
            className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {saving ? (
              <>
                <RefreshCw className="animate-spin mr-2" size={20} />
                Initialisation...
              </>
            ) : (
              <>
                <Plus className="mr-2" size={20} />
                Initialiser la page About
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Édition de la page À propos</h1>
          <p className="text-gray-400">Gérez tout le contenu de votre page About</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {lastSaved && (
            <span className="text-sm text-green-400">
              Dernière sauvegarde: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 hover:border-orange-500 rounded-lg transition-colors"
          >
            <Eye className="mr-2" size={16} />
            Prévisualiser
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Panel de contrôle des sections */}
        <div className="xl:col-span-3">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Sections de la page</h3>
              <span className="text-xs text-gray-500">ordre d'affichage</span>
            </div>
            
            {/* Miniature de prévisualisation */}
            <div className="mb-6 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Aperçu de la page</div>
              <div className="space-y-1">
                <div className="h-8 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded text-xs flex items-center px-2 text-orange-300">
                  Hero + Stats
                </div>
                <div className="h-6 bg-gray-700/50 rounded text-xs flex items-center px-2 text-gray-400">
                  Biographie
                </div>
                <div className="h-6 bg-gray-700/50 rounded text-xs flex items-center px-2 text-gray-400">
                  Réalisations
                </div>
                <div className="h-6 bg-gray-700/50 rounded text-xs flex items-center px-2 text-gray-400">
                  Galerie
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {/* Ordre fixe correspondant à l'affichage réel */}
              {['hero', 'biography', 'achievements', 'gallery'].map((sectionName) => {
                const items = content[sectionName] || []
                const isVisible = items.some(item => item.visible)
                const sectionLabels: Record<string, string> = {
                  hero: '🎯 Section Hero',
                  biography: '📖 Biographie', 
                  achievements: '🏆 Réalisations',
                  gallery: '📸 Galerie'
                }
                
                return (
                  <SectionToggle
                    key={sectionName}
                    title={sectionLabels[sectionName] || sectionName}
                    isVisible={isVisible}
                    itemCount={items.length}
                    onToggle={(visible) => toggleSectionVisibility(sectionName, visible)}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Éditeurs de contenu */}
        <div className="xl:col-span-9">
          <div className="space-y-8">
            {/* Ordre fixe correspondant à l'affichage réel de la page */}
            {['hero', 'biography', 'achievements', 'gallery'].map((sectionName) => {
              const items = content[sectionName] || []
              if (items.length === 0) return null
              
              return (
                <div key={sectionName} className="space-y-6">
                  {items
                    .sort((a, b) => a.order - b.order)
                    .map(item => (
                      <div key={item.id} className={`${!item.visible ? 'opacity-50' : ''}`}>
                        {renderContentEditor(item)}
                      </div>
                    ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}