import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { clsx } from 'clsx'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'

interface EventCardProps {
  event: {
    id: string
    title: string
    date: Date
    time?: string
    venue: string
    location: string
    description?: string
    ticketUrl?: string
    price?: string
    status: 'upcoming' | 'past' | 'cancelled'
    genre?: string[]
  }
  variant?: 'default' | 'compact'
  className?: string
}

export default function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const isUpcoming = event.status === 'upcoming'
  const isPast = event.status === 'past'
  const isCancelled = event.status === 'cancelled'
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  const formatShortDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }
  
  if (variant === 'compact') {
    return (
      <Card variant="default" className={clsx('hover:bg-gray-800 transition-colors', className)}>
        <div className="flex items-center space-x-4">
          {/* Date Badge */}
          <div className="flex-shrink-0 text-center">
            <div className={clsx(
              'px-3 py-2 rounded-lg font-bold text-sm',
              isUpcoming && 'bg-orange-600 text-white',
              isPast && 'bg-gray-700 text-gray-300',
              isCancelled && 'bg-red-900/50 text-red-400'
            )}>
              {formatShortDate(event.date)}
            </div>
          </div>
          
          {/* Event Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate">{event.title}</h3>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              <span className="truncate">{event.venue}, {event.location}</span>
            </div>
            {event.time && (
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <Clock size={14} className="mr-1" />
                <span>{event.time}</span>
              </div>
            )}
          </div>
          
          {/* Status */}
          <div className="flex-shrink-0">
            {isCancelled && <Badge variant="error" size="sm">Annulé</Badge>}
            {isPast && <Badge variant="default" size="sm">Passé</Badge>}
            {isUpcoming && event.ticketUrl && (
              <Button size="sm" variant="primary" asChild>
                <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                  Billets
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }
  
  return (
    <Card variant="elevated" className={clsx(className)}>
      {/* Status Badge */}
      <div className="mb-4">
        {isCancelled && <Badge variant="error">Événement annulé</Badge>}
        {isPast && <Badge variant="default">Événement passé</Badge>}
        {isUpcoming && <Badge variant="success">À venir</Badge>}
      </div>
      
      {/* Event Title */}
      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
      
      {/* Date & Time */}
      <div className="flex items-center text-gray-300 mb-3">
        <Calendar size={18} className="mr-2" />
        <span>{formatDate(event.date)}</span>
        {event.time && (
          <>
            <Clock size={18} className="ml-4 mr-2" />
            <span>{event.time}</span>
          </>
        )}
      </div>
      
      {/* Location */}
      <div className="flex items-center text-gray-300 mb-4">
        <MapPin size={18} className="mr-2" />
        <span>{event.venue}, {event.location}</span>
      </div>
      
      {/* Genre Tags */}
      {event.genre && event.genre.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {event.genre.map((g) => (
            <Badge key={g} variant="genre" size="sm">
              {g}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Description */}
      {event.description && (
        <p className="text-gray-400 mb-4 line-clamp-3">{event.description}</p>
      )}
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        {event.price && (
          <span className="text-red-400 font-semibold">{event.price}</span>
        )}
        {event.ticketUrl && isUpcoming && !isCancelled && (
          <Button variant="primary" size="sm" asChild>
            <a 
              href={event.ticketUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              Réserver
              <ExternalLink size={16} className="ml-2" />
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}