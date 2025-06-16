'use client'

import { Calendar, MapPin, Clock } from 'lucide-react'

interface Event {
  id: string
  name: string
  venue: string
  city: string
  country: string
  date: string
  time?: string | null
  description?: string | null
  ticketLink?: string | null
  coverImage?: string | null
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'POSTPONED'
  featured: boolean
}

interface EventsClientProps {
  events: Event[]
}

export default function EventsClient({ events }: EventsClientProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date())
  const pastEvents = events.filter(e => new Date(e.date) < new Date())

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-32 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Mes <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">Événements</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Découvrez où me retrouver lors des plus grands festivals et événements Hardstyle. 
              Chaque performance est une expérience unique à partager ensemble.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">{upcomingEvents.length}</div>
                <div className="text-gray-400 text-sm">À venir</div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">{pastEvents.length}</div>
                <div className="text-gray-400 text-sm">Réalisés</div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">{events.filter(e => e.featured).length}</div>
                <div className="text-gray-400 text-sm">Mis en avant</div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">{new Set(events.map(e => e.country)).size}</div>
                <div className="text-gray-400 text-sm">Pays</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun événement programmé</h3>
              <p className="text-gray-400">Consultez régulièrement cette page pour découvrir mes prochaines performances !</p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Event Image */}
                    {event.coverImage && (
                      <div className="flex-shrink-0 md:w-48 md:h-32">
                        <img
                          src={event.coverImage}
                          alt={event.name}
                          className="w-full h-32 md:h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-600/30">
                          {new Date(event.date) >= new Date() ? 'À venir' : 'Passé'}
                        </span>
                        {event.featured && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                      
                      <div className="flex items-center text-gray-300 mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(event.date)}</span>
                        {event.time && (
                          <>
                            <Clock size={16} className="ml-4 mr-2" />
                            <span>{event.time}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center text-gray-300 mb-3">
                        <MapPin size={16} className="mr-2" />
                        <span>{event.venue}, {event.city}, {event.country}</span>
                      </div>
                      
                      {event.description && (
                        <p className="text-gray-400 mb-4">{event.description}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {event.ticketLink && new Date(event.date) >= new Date() && (
                        <a 
                          href={event.ticketLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                        >
                          Réserver
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-900/20 to-orange-600/20 border-t border-orange-500/20 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Organisez votre événement</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Vous organisez un festival, une soirée club ou un événement privé ? 
              Contactez-moi pour discuter de votre projet et créer une expérience inoubliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-lg font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors"
              >
                <Calendar className="mr-2" size={20} />
                Demande de booking
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-lg font-medium border-2 border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
              >
                <MapPin className="mr-2" size={20} />
                Voir les disponibilités
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}