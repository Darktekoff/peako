'use client'

import { useState, useMemo } from 'react'
import { Calendar, MapPin, Clock, Filter, Grid, List } from 'lucide-react'


// Mock data - À remplacer par des données dynamiques
const events = [
  {
    id: '1',
    title: 'Defqon.1 Festival',
    date: new Date('2024-06-29'),
    time: '20:00',
    venue: 'The Gathering',
    location: 'Biddinghuizen, Pays-Bas',
    description: 'Le plus grand festival Hardstyle au monde ! Une performance sur la scène principale avec plus de 65,000 festivaliers.',
    status: 'upcoming' as const,
    ticketUrl: 'https://www.q-dance.com/defqon1',
    price: '89€ - 299€',
    genre: ['Hardstyle', 'Hardcore']
  },
  {
    id: '2',
    title: 'X-Qlusive Peak\'O',
    date: new Date('2024-07-12'),
    time: '22:00',
    venue: 'Ziggo Dome',
    location: 'Amsterdam, Pays-Bas',
    description: 'Mon propre événement X-Qlusive ! Une soirée dédiée à mon univers musical avec des invités surprises.',
    status: 'upcoming' as const,
    ticketUrl: 'https://www.q-dance.com',
    price: '45€ - 125€',
    genre: ['Hardstyle']
  },
  {
    id: '3',
    title: 'Reverze 2024',
    date: new Date('2024-08-03'),
    time: '21:00',
    venue: 'Sportpaleis',
    location: 'Anvers, Belgique',
    description: 'Retour sur la scène principale de Reverze pour une performance exceptionnelle dans cette cathédrale du Hardstyle.',
    status: 'upcoming' as const,
    genre: ['Hardstyle', 'Raw Hardstyle']
  }
]

const locations = ['Toutes', 'Pays-Bas', 'Belgique', 'Allemagne', 'France', 'Espagne', 'Croatie']
const statuses = ['Tous', 'À venir', 'Passés']
const genres = ['Tous', 'Hardstyle', 'Raw Hardstyle', 'Euphoric', 'Hardcore', 'Freestyle']

export default function Events() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedLocation, setSelectedLocation] = useState('Toutes')
  const [selectedStatus, setSelectedStatus] = useState('Tous')
  const [selectedGenre, setSelectedGenre] = useState('Tous')
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesLocation = selectedLocation === 'Toutes' || 
                             event.location.includes(selectedLocation)
      
      const matchesStatus = selectedStatus === 'Tous' ||
                           (selectedStatus === 'À venir' && event.status === 'upcoming') ||
                           (selectedStatus === 'Passés' && event.status === 'past')
      
      const matchesGenre = selectedGenre === 'Tous' || 
                          event.genre?.includes(selectedGenre)
      
      return matchesLocation && matchesStatus && matchesGenre
    })
  }, [selectedLocation, selectedStatus, selectedGenre])

  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming')
  const pastEvents = filteredEvents.filter(e => e.status === 'past')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-32 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Mes <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">Événements</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Découvrez où me retrouver lors des plus grands festivals et événements Hardstyle. 
              Chaque performance est une expérience unique à partager ensemble.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">{upcomingEvents.length}</div>
                <div className="text-gray-400 text-sm">À venir</div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">{pastEvents.length}</div>
                <div className="text-gray-400 text-sm">Réalisés</div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">25+</div>
                <div className="text-gray-400 text-sm">Festivals</div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">8</div>
                <div className="text-gray-400 text-sm">Pays</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-600/30">
                        {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                      </span>
                      {event.genre?.map((g) => (
                        <span key={g} className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                          {g}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-300 mb-2">
                      <Calendar size={16} className="mr-2" />
                      <span>{event.date.toLocaleDateString('fr-FR', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      {event.time && (
                        <>
                          <Clock size={16} className="ml-4 mr-2" />
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-gray-300 mb-3">
                      <MapPin size={16} className="mr-2" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                    {event.description && (
                      <p className="text-gray-400 mb-4">{event.description}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {event.price && (
                      <span className="text-red-400 font-semibold">{event.price}</span>
                    )}
                    {event.ticketUrl && event.status === 'upcoming' && (
                      <a 
                        href={event.ticketUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        Réserver
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-900/20 to-red-600/20 border-t border-red-500/20 py-20">
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
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Calendar className="mr-2" size={20} />
                Demande de booking
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-lg font-medium border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition-colors"
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