'use client'

import { useState } from 'react'
import { Save, Plus, Trash2, Tag, GripVertical } from 'lucide-react'

interface ListContent {
  title: string
  items: string[]
}

interface EditableListProps {
  content: ListContent
  onSave: (content: ListContent) => void
}

export default function EditableList({ content, onSave }: EditableListProps) {
  const [title, setTitle] = useState(content.title || '')
  const [items, setItems] = useState<string[]>(content.items || [''])
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    onSave({
      title,
      items: items.filter(item => item.trim() !== '')
    })
    setHasChanges(false)
  }

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true)
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
    markChanged()
  }

  const addItem = () => {
    setItems([...items, ''])
    markChanged()
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
      markChanged()
    }
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === items.length - 1)
    ) {
      return
    }

    const newItems = [...items]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    const temp = newItems[index]
    newItems[index] = newItems[targetIndex]
    newItems[targetIndex] = temp
    
    setItems(newItems)
    markChanged()
  }

  const isGenresSection = title.toLowerCase().includes('genre')
  const isInfluencesSection = title.toLowerCase().includes('influence')

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Liste : {title || 'Sans titre'}</h3>
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
        {/* Titre de la liste */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Titre de la liste
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              markChanged()
            }}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Genres, Influences, etc."
          />
        </div>

        {/* Éléments de la liste */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Éléments ({items.length} élément{items.length > 1 ? 's' : ''})
            </label>
            <button
              onClick={addItem}
              className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Plus className="mr-1" size={14} />
              Ajouter
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-800 rounded-lg border border-gray-700 p-3">
                {/* Contrôles de réorganisation */}
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Déplacer vers le haut"
                  >
                    ↑
                  </button>
                  <GripVertical size={12} className="text-gray-500" />
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Déplacer vers le bas"
                  >
                    ↓
                  </button>
                </div>

                {/* Icône */}
                <Tag size={16} className="text-orange-400 flex-shrink-0" />

                {/* Champ de saisie */}
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={
                    isGenresSection ? "Hardstyle" :
                    isInfluencesSection ? "Nom de l'artiste" :
                    `Élément ${index + 1}`
                  }
                />

                {/* Bouton de suppression */}
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors flex-shrink-0"
                    title="Supprimer cet élément"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h4 className="text-lg font-medium text-white mb-4">Prévisualisation</h4>
        <div className="bg-black rounded-lg p-6 border border-gray-800">
          <h4 className="text-gray-300 font-medium mb-3">
            {title || "Titre de la liste"}
          </h4>
          
          {isGenresSection ? (
            // Affichage en badges pour les genres
            <div className="flex flex-wrap gap-2">
              {items
                .filter(item => item.trim() !== '')
                .map((item, index) => (
                  <span key={index} className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-600/30">
                    {item || `Élément ${index + 1}`}
                  </span>
                ))}
            </div>
          ) : (
            // Affichage en liste pour les influences et autres
            <div className="space-y-2">
              {items
                .filter(item => item.trim() !== '')
                .map((item, index) => (
                  <div key={index} className="text-gray-400 text-sm">
                    • {item || `Élément ${index + 1}`}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}