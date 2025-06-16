'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import GalleryModal from '@/components/ui/GalleryModal'

interface Media {
  url: string
  caption?: string
  type?: 'image' | 'video'
  thumbnailUrl?: string
}

interface GallerySectionProps {
  title: string
  subtitle: string
  photos: Media[]
}

export default function GallerySection({ title, subtitle, photos }: GallerySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)


  const openModal = (index: number) => {
    setSelectedIndex(index)
    setIsModalOpen(true)
  }

  if (!photos || photos.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 text-lg">{subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-video bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30 flex items-center justify-center hover:border-orange-400 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-orange-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📸</span>
                  </div>
                  <p className="text-gray-400 text-sm">Média {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 text-lg">{subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo: Media, index: number) => (
              <div 
                key={index} 
                className="relative aspect-video bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30 overflow-hidden hover:border-orange-400 transition-colors cursor-pointer group"
                onClick={() => openModal(index)}
              >
                {photo.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      src={photo.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      preload="metadata"
                      poster={photo.thumbnailUrl}
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 group-hover:opacity-75 transition-opacity">
                      <Play className="text-white" size={48} />
                    </div>
                  </div>
                ) : (
                  <img
                    src={photo.thumbnailUrl || photo.url}
                    alt={photo.caption || `Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                {/* Overlay d'agrandissement */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modale de galerie */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={photos}
        initialIndex={selectedIndex}
      />
    </>
  )
}