'use client'

import { useState } from 'react'
import { Save, Plus, Trash2, GripVertical } from 'lucide-react'

interface TextContent {
  title: string
  paragraphs: string[]
}

interface EditableTextProps {
  content: TextContent
  onSave: (content: TextContent) => void
}

export default function EditableText({ content, onSave }: EditableTextProps) {
  const [title, setTitle] = useState(content.title || '')
  const [paragraphs, setParagraphs] = useState(content.paragraphs || [''])
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    onSave({
      title,
      paragraphs: paragraphs.filter(p => p.trim() !== '')
    })
    setHasChanges(false)
  }

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true)
  }

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...paragraphs]
    newParagraphs[index] = value
    setParagraphs(newParagraphs)
    markChanged()
  }

  const addParagraph = () => {
    setParagraphs([...paragraphs, ''])
    markChanged()
  }

  const removeParagraph = (index: number) => {
    if (paragraphs.length > 1) {
      setParagraphs(paragraphs.filter((_, i) => i !== index))
      markChanged()
    }
  }

  const moveParagraph = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === paragraphs.length - 1)
    ) {
      return
    }

    const newParagraphs = [...paragraphs]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    const temp = newParagraphs[index]
    newParagraphs[index] = newParagraphs[targetIndex]
    newParagraphs[targetIndex] = temp
    
    setParagraphs(newParagraphs)
    markChanged()
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Section Texte</h3>
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
        {/* Titre de la section */}
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
            placeholder="Mon parcours"
          />
        </div>

        {/* Paragraphes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Contenu ({paragraphs.length} paragraphe{paragraphs.length > 1 ? 's' : ''})
            </label>
            <button
              onClick={addParagraph}
              className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Plus className="mr-1" size={14} />
              Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="relative group">
                <div className="flex items-start space-x-2">
                  {/* Contrôles de réorganisation */}
                  <div className="flex flex-col space-y-1 mt-2">
                    <button
                      onClick={() => moveParagraph(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Déplacer vers le haut"
                    >
                      ↑
                    </button>
                    <GripVertical size={14} className="text-gray-500" />
                    <button
                      onClick={() => moveParagraph(index, 'down')}
                      disabled={index === paragraphs.length - 1}
                      className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Déplacer vers le bas"
                    >
                      ↓
                    </button>
                  </div>

                  {/* Zone de texte */}
                  <div className="flex-1">
                    <textarea
                      value={paragraph}
                      onChange={(e) => updateParagraph(index, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder={`Paragraphe ${index + 1}...`}
                    />
                  </div>

                  {/* Bouton de suppression */}
                  {paragraphs.length > 1 && (
                    <button
                      onClick={() => removeParagraph(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors mt-2"
                      title="Supprimer ce paragraphe"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h4 className="text-lg font-medium text-white mb-4">Prévisualisation</h4>
        <div className="bg-black rounded-lg p-6 border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6">
            {title || "Titre de la section"}
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            {paragraphs
              .filter(p => p.trim() !== '')
              .map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph || `Paragraphe ${index + 1}...`}
                </p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}