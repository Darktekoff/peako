'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface Media {
  url: string
  caption?: string
  type?: 'image' | 'video'
  thumbnailUrl?: string
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  media: Media[]
  initialIndex: number
}

export default function GalleryModal({ isOpen, onClose, media, initialIndex }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])
  
  if (!isOpen || !media.length) return null
  
  const currentMedia = media[currentIndex]
  const isVideo = currentMedia?.type === 'video'
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1))
    setIsVideoPlaying(false)
  }
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0))
    setIsVideoPlaying(false)
  }
  
  const handleVideoToggle = () => {
    const video = document.getElementById('gallery-video') as HTMLVideoElement
    if (video) {
      if (isVideoPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }
  
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-white">
          <span className="text-sm text-gray-300">
            {currentIndex + 1} / {media.length}
          </span>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>
      </div>
      
      {/* Navigation gauche */}
      {media.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:bg-white/20 rounded-full transition-colors"
          aria-label="Média précédent"
        >
          <ChevronLeft size={32} />
        </button>
      )}
      
      {/* Navigation droite */}
      {media.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:bg-white/20 rounded-full transition-colors"
          aria-label="Média suivant"
        >
          <ChevronRight size={32} />
        </button>
      )}
      
      {/* Contenu principal */}
      <div className="flex items-center justify-center h-full p-16">
        <div className="relative max-w-full max-h-full">
          {isVideo ? (
            <div className="relative">
              <video
                id="gallery-video"
                src={currentMedia.url}
                className="max-w-full max-h-full rounded-lg"
                controls
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                poster={currentMedia.thumbnailUrl}
              />
            </div>
          ) : (
            <img
              src={currentMedia.url}
              alt={currentMedia.caption || `Média ${currentIndex + 1}`}
              className="max-w-full max-h-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>
      
      {/* Légende */}
      {currentMedia.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-white text-center text-lg">
            {currentMedia.caption}
          </p>
        </div>
      )}
      
      {/* Miniatures */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto p-2">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsVideoPlaying(false)
              }}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-orange-500 scale-110'
                  : 'border-white/30 hover:border-white/60'
              }`}
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnailUrl || item.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="text-white" size={12} />
                  </div>
                </div>
              ) : (
                <img
                  src={item.thumbnailUrl || item.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
      
      {/* Clic sur l'arrière-plan pour fermer */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>,
    document.body
  )
}