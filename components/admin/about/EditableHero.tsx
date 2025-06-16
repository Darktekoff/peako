'use client'

import { useState } from 'react'
import { Save, Upload, Image as ImageIcon } from 'lucide-react'
import ImageUpload from '@/components/ui/ImageUpload'

interface HeroContent {
  title: string
  subtitle: string
  profileImage?: string | null
}

interface EditableHeroProps {
  content: HeroContent
  onSave: (content: HeroContent) => void
}

export default function EditableHero({ content, onSave }: EditableHeroProps) {
  const [title, setTitle] = useState(content.title || '')
  const [subtitle, setSubtitle] = useState(content.subtitle || '')
  const [profileImage, setProfileImage] = useState(content.profileImage || '')
  const [hasChanges, setHasChanges] = useState(false)

  const handleSave = () => {
    onSave({
      title,
      subtitle,
      profileImage: profileImage || null
    })
    setHasChanges(false)
  }

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true)
  }

  const handleImageUpload = (result: any) => {
    setProfileImage(result.url)
    markChanged()
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Section Hero</h3>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contenu textuel */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titre principal
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                markChanged()
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="L'histoire de Peak'O"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sous-titre / Description
            </label>
            <textarea
              value={subtitle}
              onChange={(e) => {
                setSubtitle(e.target.value)
                markChanged()
              }}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Description de votre parcours..."
            />
          </div>
        </div>

        {/* Image de profil */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Photo de profil
          </label>
          
          {profileImage ? (
            <div className="relative group">
              <img
                src={profileImage}
                alt="Photo de profil"
                className="w-full aspect-square object-cover rounded-lg border border-gray-700"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <ImageUpload
                  onUpload={handleImageUpload}
                  category="image"
                  folder="about"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  <Upload className="mr-2" size={16} />
                  Changer
                </ImageUpload>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
              <ImageIcon className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-400 mb-4">Aucune photo de profil</p>
              <ImageUpload
                onUpload={handleImageUpload}
                category="image"
                folder="about"
                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                <Upload className="mr-2" size={16} />
                Ajouter une photo
              </ImageUpload>
            </div>
          )}
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h4 className="text-lg font-medium text-white mb-4">Prévisualisation</h4>
        <div className="bg-black rounded-lg p-6 border border-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title || "L'histoire de Peak'O"}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            {subtitle || "Description de votre parcours..."}
          </p>
        </div>
      </div>
    </div>
  )
}