'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import EventForm from '@/components/admin/EventForm'

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
}

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Charger les données de l'événement
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        const data = await response.json()

        if (data.success) {
          setEvent(data.event)
        } else {
          alert('Événement non trouvé')
          router.push('/admin/events')
        }
      } catch (error) {
        console.error('Error loading event:', error)
        alert('Erreur lors du chargement de l\'événement')
        router.push('/admin/events')
      } finally {
        setLoading(false)
      }
    }

    if (eventId) {
      loadEvent()
    }
  }, [eventId, router])

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        alert('Événement mis à jour avec succès!')
        router.push('/admin/events')
      } else {
        alert('Erreur: ' + result.error)
      }
    } catch (error) {
      console.error('Error updating event:', error)
      alert('Erreur lors de la mise à jour de l\'événement')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/events')
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-2 text-gray-600">Chargement de l'événement...</span>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Événement non trouvé</p>
      </div>
    )
  }

  // Formater les données pour le formulaire
  const initialData = {
    name: event.name,
    venue: event.venue,
    city: event.city,
    country: event.country,
    date: new Date(event.date).toISOString().split('T')[0],
    time: event.time || '',
    description: event.description || '',
    ticketLink: event.ticketLink || '',
    coverImage: event.coverImage || '',
    status: event.status,
    featured: event.featured
  }

  return (
    <div className="p-6">
      <EventForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </div>
  )
}