'use client'

import { Eye, EyeOff } from 'lucide-react'

interface SectionToggleProps {
  title: string
  isVisible: boolean
  itemCount: number
  onToggle: (visible: boolean) => void
}

export default function SectionToggle({ title, isVisible, itemCount, onToggle }: SectionToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
      <div>
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-gray-400 text-sm">{itemCount} élément{itemCount > 1 ? 's' : ''}</p>
      </div>
      
      <button
        onClick={() => onToggle(!isVisible)}
        className={`p-2 rounded-lg transition-colors ${
          isVisible 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
        }`}
        title={isVisible ? 'Masquer la section' : 'Afficher la section'}
      >
        {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  )
}