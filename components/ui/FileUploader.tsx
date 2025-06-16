'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, FileText, Music, Check, AlertCircle } from 'lucide-react'

interface UploadedFile {
  name: string
  size: number
  type: string
  url: string
  thumbnailUrl?: string
  key: string
}

interface FileUploaderProps {
  category?: 'image' | 'audio' | 'document'
  folder?: string
  multiple?: boolean
  onUpload?: (files: UploadedFile[]) => void
  className?: string
  accept?: string
}

export default function FileUploader({
  category = 'image',
  folder = category,
  multiple = true,
  onUpload,
  className = '',
  accept
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Définir le type d'accept par défaut
  const defaultAccept = {
    image: 'image/*',
    audio: 'audio/*',
    document: '.pdf,.txt'
  }

  const acceptTypes = accept || defaultAccept[category]

  // Rendu conditionnel des icônes
  const renderIcon = (size: string = "w-6 h-6", color: string = "text-gray-600") => {
    if (category === 'image') return <ImageIcon className={`${size} ${color}`} />
    if (category === 'audio') return <Music className={`${size} ${color}`} />
    if (category === 'document') return <FileText className={`${size} ${color}`} />
    return <Upload className={`${size} ${color}`} />
  }

  // Gérer le drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (!multiple && droppedFiles.length > 1) {
      setErrors(['Un seul fichier autorisé'])
      return
    }
    
    setFiles(prev => multiple ? [...prev, ...droppedFiles] : droppedFiles)
    setErrors([])
  }, [multiple])

  // Gérer la sélection de fichiers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (!multiple && selectedFiles.length > 1) {
      setErrors(['Un seul fichier autorisé'])
      return
    }
    
    setFiles(prev => multiple ? [...prev, ...selectedFiles] : selectedFiles)
    setErrors([])
  }

  // Supprimer un fichier de la liste
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Formater la taille des fichiers
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Upload des fichiers
  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    setErrors([])
    const newUploadedFiles: UploadedFile[] = []

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', category)
        formData.append('folder', folder)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (result.success) {
          newUploadedFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            url: result.url,
            thumbnailUrl: result.thumbnailUrl,
            key: result.key,
          })
        } else {
          setErrors(prev => [...prev, `Erreur pour ${file.name}: ${result.error}`])
        }
      }

      setUploadedFiles(prev => [...prev, ...newUploadedFiles])
      setFiles([]) // Vider la liste des fichiers en attente
      
      // Callback avec les fichiers uploadés
      if (onUpload && newUploadedFiles.length > 0) {
        onUpload(newUploadedFiles)
      }

    } catch (error) {
      setErrors(['Erreur lors de l\'upload des fichiers'])
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone de drop */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptTypes}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {renderIcon("w-6 h-6", "text-gray-600")}
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              Glissez vos fichiers ici
            </p>
            <p className="text-gray-500">
              ou{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-orange-600 hover:text-red-700 font-medium"
              >
                cliquez pour parcourir
              </button>
            </p>
          </div>
          
          <p className="text-xs text-gray-400">
            {category === 'image' && 'Images: JPG, PNG, WebP, GIF (max 10MB)'}
            {category === 'audio' && 'Audio: MP3, WAV (max 10MB)'}
            {category === 'document' && 'Documents: PDF, TXT (max 10MB)'}
          </p>
        </div>
      </div>

      {/* Erreurs */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ))}
        </div>
      )}

      {/* Files en attente d'upload */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Fichiers à uploader:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {renderIcon("w-4 h-4", "text-gray-500")}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={uploadFiles}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Upload en cours...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Uploader {files.length} fichier{files.length > 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      )}

      {/* Files uploadés avec succès */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Fichiers uploadés:</h4>
          <div className="grid gap-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                {file.thumbnailUrl && category === 'image' ? (
                  <img 
                    src={file.thumbnailUrl} 
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  renderIcon("w-4 h-4", "text-green-600")
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 hover:text-green-700 font-medium"
                >
                  Voir
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}