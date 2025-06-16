'use client'

import { useState } from 'react'
import { Save, Plus, Trash2, Award, Users, Music, Calendar, GripVertical } from 'lucide-react'

interface Achievement {
  year: string
  title: string
  description: string
  icon: string
  type: string
}

interface AchievementsContent {
  title: string
  subtitle: string
  achievements: Achievement[]
}

interface EditableAchievementsProps {
  content: AchievementsContent
  onSave: (content: AchievementsContent) => void
}

const iconOptions = [
  { value: 'Award', label: 'Award', component: Award },
  { value: 'Users', label: 'Users', component: Users },
  { value: 'Music', label: 'Music', component: Music },
  { value: 'Calendar', label: 'Calendar', component: Calendar }
]

const typeOptions = [
  { value: 'performance', label: 'Performance' },
  { value: 'contract', label: 'Contrat' },
  { value: 'release', label: 'Release' },
  { value: 'festival', label: 'Festival' },
  { value: 'award', label: 'Prix' },
  { value: 'collaboration', label: 'Collaboration' }
]

export default function EditableAchievements({ content, onSave }: EditableAchievementsProps) {
  const [title, setTitle] = useState(content.title || 'Achievements')
  const [subtitle, setSubtitle] = useState(content.subtitle || 'Les moments marquants de mon parcours')
  const [achievements, setAchievements] = useState<Achievement[]>(content.achievements || [])
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    onSave({
      title,
      subtitle,
      achievements: achievements.filter(achievement => 
        achievement.title.trim() !== '' && achievement.description.trim() !== ''
      )
    })
    setHasChanges(false)
  }

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true)
  }

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const newAchievements = [...achievements]
    newAchievements[index][field] = value
    setAchievements(newAchievements)
    markChanged()
  }

  const addAchievement = () => {
    const newAchievement: Achievement = {
      year: new Date().getFullYear().toString(),
      title: '',
      description: '',
      icon: 'Award',
      type: 'performance'
    }
    setAchievements([...achievements, newAchievement])
    markChanged()
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
    markChanged()
  }

  const moveAchievement = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === achievements.length - 1)
    ) {
      return
    }

    const newAchievements = [...achievements]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    const temp = newAchievements[index]
    newAchievements[index] = newAchievements[targetIndex]
    newAchievements[targetIndex] = temp
    
    setAchievements(newAchievements)
    markChanged()
  }

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(opt => opt.value === iconName)
    return icon ? icon.component : Award
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Réalisations</h3>
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
              placeholder="Achievements"
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
              placeholder="Les moments marquants de mon parcours"
            />
          </div>
        </div>

        {/* Réalisations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Réalisations ({achievements.length} élément{achievements.length > 1 ? 's' : ''})
            </label>
            <button
              onClick={addAchievement}
              className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Plus className="mr-1" size={14} />
              Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const IconComponent = getIconComponent(achievement.icon)
              
              return (
                <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <div className="flex items-start space-x-4">
                    {/* Contrôles de réorganisation */}
                    <div className="flex flex-col space-y-1 mt-2">
                      <button
                        onClick={() => moveAchievement(index, 'up')}
                        disabled={index === 0}
                        className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Déplacer vers le haut"
                      >
                        ↑
                      </button>
                      <GripVertical size={14} className="text-gray-500" />
                      <button
                        onClick={() => moveAchievement(index, 'down')}
                        disabled={index === achievements.length - 1}
                        className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Déplacer vers le bas"
                      >
                        ↓
                      </button>
                    </div>

                    {/* Aperçu de l'icône */}
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                      <IconComponent size={20} className="text-white" />
                    </div>

                    {/* Champs du formulaire */}
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">
                            Année
                          </label>
                          <input
                            type="text"
                            value={achievement.year}
                            onChange={(e) => updateAchievement(index, 'year', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="2024"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">
                            Icône
                          </label>
                          <select
                            value={achievement.icon}
                            onChange={(e) => updateAchievement(index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            {iconOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">
                            Type
                          </label>
                          <select
                            value={achievement.type}
                            onChange={(e) => updateAchievement(index, 'type', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            {typeOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Titre
                        </label>
                        <input
                          type="text"
                          value={achievement.title}
                          onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Titre de la réalisation"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Description
                        </label>
                        <textarea
                          value={achievement.description}
                          onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          placeholder="Description de la réalisation..."
                        />
                      </div>
                    </div>

                    {/* Bouton de suppression */}
                    <button
                      onClick={() => removeAchievement(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors flex-shrink-0 mt-2"
                      title="Supprimer cette réalisation"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h4 className="text-lg font-medium text-white mb-4">Prévisualisation</h4>
        <div className="bg-black rounded-lg p-6 border border-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {title || "Achievements"}
            </h2>
            <p className="text-gray-400">
              {subtitle || "Les moments marquants de mon parcours"}
            </p>
          </div>
          
          <div className="space-y-6">
            {achievements
              .filter(achievement => achievement.title.trim() !== '' && achievement.description.trim() !== '')
              .map((achievement, index) => {
                const IconComponent = getIconComponent(achievement.icon)
                
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent size={20} className="text-white" />
                    </div>
                    
                    <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-600/30">
                            {achievement.year}
                          </span>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                            {typeOptions.find(t => t.value === achievement.type)?.label || achievement.type}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {achievement.title || "Titre de la réalisation"}
                      </h3>
                      <p className="text-gray-400">
                        {achievement.description || "Description de la réalisation..."}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}