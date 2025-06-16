'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TrackForm from '@/components/admin/TrackForm'

export default function NewTrackPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        alert('Track créée avec succès!')
        router.push('/admin/music')
      } else {
        alert('Erreur: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating track:', error)
      alert('Erreur lors de la création de la track')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/music')
  }

  return (
    <div className="p-6">
      <TrackForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}