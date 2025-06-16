'use client'

import { useState } from 'react'
import { Save, Plus, Trash2, TrendingUp } from 'lucide-react'

interface Stat {
  label: string
  value: string
}

interface StatsContent {
  stats: Stat[]
}

interface EditableStatsProps {
  content: StatsContent
  onSave: (content: StatsContent) => void
}

export default function EditableStats({ content, onSave }: EditableStatsProps) {
  const [stats, setStats] = useState<Stat[]>(content.stats || [
    { label: "Années d'expérience", value: "8+" },
    { label: "Tracks produites", value: "50+" },
    { label: "Festivals joués", value: "25+" },
    { label: "Followers Spotify", value: "100K+" }
  ])
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    onSave({
      stats: stats.filter(stat => stat.label.trim() !== '' && stat.value.trim() !== '')
    })
    setHasChanges(false)
  }

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true)
  }

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...stats]
    newStats[index][field] = value
    setStats(newStats)
    markChanged()
  }

  const addStat = () => {
    setStats([...stats, { label: '', value: '' }])
    markChanged()
  }

  const removeStat = (index: number) => {
    if (stats.length > 1) {
      setStats(stats.filter((_, i) => i !== index))
      markChanged()
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Statistiques</h3>
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
        {/* Gestion des statistiques */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Statistiques ({stats.length} élément{stats.length > 1 ? 's' : ''})
            </label>
            <button
              onClick={addStat}
              className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Plus className="mr-1" size={14} />
              Ajouter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp size={16} className="text-orange-400" />
                  {stats.length > 1 && (
                    <button
                      onClick={() => removeStat(index)}
                      className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                      title="Supprimer cette statistique"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Valeur
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg font-bold"
                      placeholder="8+"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Libellé
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="Années d'expérience"
                    />
                  </div>
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
          <div className="grid grid-cols-2 gap-4">
            {stats
              .filter(stat => stat.label.trim() !== '' && stat.value.trim() !== '')
              .map((stat, index) => (
                <div key={index} className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    {stat.value || "--"}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label || "Libellé"}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}