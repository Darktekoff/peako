import { Play, Pause, Download, ExternalLink, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import { useState } from 'react'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'

interface StreamingLink {
  platform: string
  url: string
  icon?: string
}

interface TrackCardProps {
  track: {
    id: string
    title: string
    artist?: string
    album?: string
    duration?: number
    releaseDate?: Date
    genre?: string[]
    streamingLinks?: StreamingLink[]
    audioUrl?: string
    downloadUrl?: string
    imageUrl?: string
  }
  variant?: 'default' | 'compact'
  onPlay?: (trackId: string) => void
  isPlaying?: boolean
  className?: string
}

export default function TrackCard({ 
  track, 
  variant = 'default', 
  onPlay, 
  isPlaying = false,
  className 
}: TrackCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  const formatReleaseDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short'
    }).format(date)
  }
  
  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(track.id)
    }
  }
  
  if (variant === 'compact') {
    return (
      <Card variant="default" className={clsx('hover:bg-gray-800 transition-colors', className)}>
        <div className="flex items-center space-x-4">
          {/* Album Art */}
          <div className="relative flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
            {track.imageUrl ? (
              <img
                src={track.imageUrl}
                alt={track.title}
                className={clsx(
                  'w-full h-full object-cover transition-opacity duration-200',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 text-xs font-bold">
                  {track.title.charAt(0)}
                </span>
              </div>
            )}
            
            {/* Play Button Overlay */}
            {track.audioUrl && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
              >
                {isPlaying ? (
                  <Pause size={16} className="text-white" />
                ) : (
                  <Play size={16} className="text-white" />
                )}
              </button>
            )}
          </div>
          
          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{track.title}</h3>
            <div className="flex items-center text-gray-400 text-sm space-x-2">
              {track.artist && <span className="truncate">{track.artist}</span>}
              {track.duration && (
                <>
                  <span>•</span>
                  <span>{formatDuration(track.duration)}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Genres */}
          {track.genre && track.genre.length > 0 && (
            <div className="flex-shrink-0">
              <Badge variant="genre" size="sm">
                {track.genre[0]}
              </Badge>
            </div>
          )}
        </div>
      </Card>
    )
  }
  
  return (
    <Card variant="elevated" className={clsx(className)}>
      {/* Album Art */}
      <div className="relative mb-4 aspect-square bg-gray-800 rounded-lg overflow-hidden">
        {track.imageUrl ? (
          <img
            src={track.imageUrl}
            alt={track.title}
            className={clsx(
              'w-full h-full object-cover transition-opacity duration-200',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500 text-4xl font-bold">
              {track.title.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Play Button Overlay */}
        {track.audioUrl && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity group"
          >
            <div className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
              {isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white ml-1" />
              )}
            </div>
          </button>
        )}
      </div>
      
      {/* Track Info */}
      <div className="mb-4">
        <h3 className="text-white font-bold text-lg mb-1">{track.title}</h3>
        {track.artist && (
          <p className="text-gray-400 mb-2">{track.artist}</p>
        )}
        {track.album && (
          <p className="text-gray-500 text-sm">{track.album}</p>
        )}
      </div>
      
      {/* Metadata */}
      <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
        <div className="flex items-center space-x-4">
          {track.duration && (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{formatDuration(track.duration)}</span>
            </div>
          )}
          {track.releaseDate && (
            <span>{formatReleaseDate(track.releaseDate)}</span>
          )}
        </div>
      </div>
      
      {/* Genre Tags */}
      {track.genre && track.genre.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {track.genre.map((genre) => (
            <Badge key={genre} variant="genre" size="sm">
              {genre}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Actions */}
      <div className="space-y-3">
        {/* Streaming Links */}
        {track.streamingLinks && track.streamingLinks.length > 0 && (
          <div className="space-y-2">
            <p className="text-gray-300 text-sm font-medium">Écouter sur :</p>
            <div className="grid grid-cols-2 gap-2">
              {track.streamingLinks.map((link) => (
                <Button
                  key={link.platform}
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    {link.platform}
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Download */}
        {track.downloadUrl && (
          <Button variant="secondary" size="sm" asChild>
            <a
              href={track.downloadUrl}
              download
              className="inline-flex items-center justify-center w-full"
            >
              <Download size={16} className="mr-2" />
              Télécharger
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}