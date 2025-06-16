'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Video, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  onUpload: (result: { url: string; thumbnailUrl?: string; type?: 'image' | 'video' }) => void
  acceptVideo?: boolean
  category?: string
  folder?: string
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}

export default function ImageUpload({ 
  onUpload, 
  acceptVideo = false,
  category = 'image',
  folder = 'images',
  className = '',
  disabled = false,
  children
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file || disabled) return

    // Validation côté client
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    
    if (!isImage && (!acceptVideo || !isVideo)) {
      alert(acceptVideo ? 'Veuillez sélectionner une image ou une vidéo' : 'Veuillez sélectionner une image')
      return
    }

    // Taille limite plus élevée pour les vidéos
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024 // 50MB pour vidéo, 5MB pour image
    if (file.size > maxSize) {
      alert(isVideo ? 'La vidéo ne doit pas dépasser 50MB' : 'L\'image ne doit pas dépasser 5MB')
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      formData.append('category', isVideo ? 'video' : 'image')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        onUpload({
          ...data,
          type: isVideo ? 'video' : 'image'
        })
      } else {
        alert('Erreur lors de l\'upload: ' + (data.error || 'Erreur inconnue'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Erreur lors de l\'upload de l\'image')
    } finally {
      setUploading(false)
    }
  }

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  return (
    <>
      {/* Bouton cliquable avec children */}
      <button
        onClick={handleButtonClick}
        disabled={disabled || uploading}
        className={className}
        type="button"
      >
        {uploading ? (
          <div className="flex items-center">
            <Loader2 className="animate-spin mr-2" size={16} />
            Upload...
          </div>
        ) : (
          children || (
            <>
              <Upload className="mr-2" size={16} />
              Upload Image
            </>
          )
        )}
      </button>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptVideo ? "image/*,video/*" : "image/*"}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
}