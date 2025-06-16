'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EventForm from '@/components/admin/EventForm'

export default function NewEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        alert('Événement créé avec succès!')
        router.push('/admin/events')
      } else {
        alert('Erreur: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Erreur lors de la création de l\'événement')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/events')
  }

  return (
    <div className="p-6">
      <EventForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}