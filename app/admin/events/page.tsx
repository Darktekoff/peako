'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Calendar, 
  MapPin,
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  Clock,
  Users
} from 'lucide-react'

interface Event {
  id: string
  name: string
  venue: string
  city: string
  country: string
  date: string
  time?: string
  description?: string
  ticketLink?: string
  coverImage?: string
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'POSTPONED'
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function EventsManager() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les événements depuis la DB
  const loadEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/events?all=true')
      const data = await response.json()
      
      if (data.success) {
        setEvents(data.events)
      } else {
        console.error('Error loading events:', data.error)
      }
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setLoading(false)
    }
  }

  // Toggle featured d'un événement
  const toggleFeatured = async (eventId: string) => {
    try {
      const event = events.find(e => e.id === eventId)
      if (!event) return

      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featured: !event.featured })
      })

      if (response.ok) {
        setEvents(prev => prev.map(event => 
          event.id === eventId 
            ? { ...event, featured: !event.featured }
            : event
        ))
      }
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  // Changer le statut d'un événement
  const changeStatus = async (eventId: string, newStatus: Event['status']) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setEvents(prev => prev.map(event => 
          event.id === eventId 
            ? { ...event, status: newStatus }
            : event
        ))
      }
    } catch (error) {
      console.error('Error changing status:', error)
    }
  }

  // Supprimer un événement
  const deleteEvent = async (eventId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setEvents(prev => prev.filter(event => event.id !== eventId))
        alert('Événement supprimé avec succès')
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Erreur lors de la suppression')
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      case 'POSTPONED': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Event['status']) => {
    switch (status) {
      case 'CONFIRMED': return 'Confirmé'
      case 'PENDING': return 'En attente'
      case 'CANCELLED': return 'Annulé'
      case 'POSTPONED': return 'Reporté'
      default: return status
    }
  }

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date() && e.status === 'CONFIRMED')
  const pastEvents = events.filter(e => new Date(e.date) < new Date())
  const pendingEvents = events.filter(e => e.status === 'PENDING')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des événements</h1>
          <p className="text-gray-600">
            Gérez vos concerts, festivals et événements
          </p>
        </div>
        
        <div>
          <button
            onClick={() => router.push('/admin/events/new')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvel événement
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Événements</p>
              <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">À venir</p>
              <p className="text-2xl font-semibold text-gray-900">{upcomingEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Mis en avant</p>
              <p className="text-2xl font-semibold text-gray-900">
                {events.filter(e => e.featured).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingEvents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des événements */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Mes événements</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Chargement des événements...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-500 mb-4">
              Ajoutez votre premier événement en cliquant sur "Nouvel événement"
            </p>
            <button
              onClick={() => router.push('/admin/events/new')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter mon premier événement
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {events.map((event) => (
              <div key={event.id} className="p-6">
                <div className="flex items-start gap-4">
                  {/* Cover Image */}
                  <div className="flex-shrink-0">
                    {event.coverImage ? (
                      <img 
                        src={event.coverImage} 
                        alt={event.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-orange-600" />
                      </div>
                    )}
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {event.name}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {getStatusLabel(event.status)}
                          </span>
                          {event.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(event.date)}
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                          <MapPin className="w-4 h-4" />
                          {event.venue}, {event.city}, {event.country}
                        </div>

                        {event.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {event.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleFeatured(event.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            event.featured 
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={event.featured ? 'Retirer des favoris' : 'Mettre en favori'}
                        >
                          {event.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                        </button>

                        <select
                          value={event.status}
                          onChange={(e) => changeStatus(event.id, e.target.value as Event['status'])}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="CONFIRMED">Confirmé</option>
                          <option value="PENDING">En attente</option>
                          <option value="POSTPONED">Reporté</option>
                          <option value="CANCELLED">Annulé</option>
                        </select>

                        <button
                          onClick={() => router.push(`/admin/events/edit/${event.id}`)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {event.ticketLink && (
                          <a
                            href={event.ticketLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            title="Voir les billets"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}