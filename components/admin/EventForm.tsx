'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  MapPin, 
  Clock,
  Loader2, 
  Save, 
  Star,
  StarOff,
  ExternalLink,
  Image as ImageIcon,
  Info
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import ImageUpload from '@/components/ui/ImageUpload'

interface EventFormData {
  name: string
  venue: string
  city: string
  country: string
  date: string
  time: string
  description: string
  ticketLink: string
  coverImage: string
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'POSTPONED'
  featured: boolean
}

interface EventFormProps {
  initialData?: Partial<EventFormData>
  onSubmit: (data: EventFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  mode: 'create' | 'edit'
}

const statusOptions = [
  { value: 'CONFIRMED', label: 'Confirmé', color: 'text-green-600' },
  { value: 'PENDING', label: 'En attente', color: 'text-yellow-600' },
  { value: 'POSTPONED', label: 'Reporté', color: 'text-orange-600' },
  { value: 'CANCELLED', label: 'Annulé', color: 'text-red-600' }
]

const countries = [
  'France', 'Belgique', 'Pays-Bas', 'Allemagne', 'Espagne', 'Italie', 
  'Suisse', 'Autriche', 'République Tchèque', 'Pologne', 'Croatie', 'Autre'
]

export default function EventForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode
}: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    venue: '',
    city: '',
    country: 'France',
    date: new Date().toISOString().split('T')[0],
    time: '',
    description: '',
    ticketLink: '',
    coverImage: '',
    status: 'CONFIRMED',
    featured: false,
    ...initialData
  })

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.venue.trim() || !formData.city.trim() || !formData.date) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    await onSubmit(formData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'create' ? 'Nouvel événement' : 'Modifier l\'événement'}
            </h1>
            <p className="text-gray-600">
              {mode === 'create' 
                ? 'Ajoutez un nouveau concert, festival ou événement à votre agenda'
                : 'Modifiez les informations de l\'événement'
              }
            </p>
          </div>

          {/* Featured Toggle */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                {formData.featured ? <Star className="w-4 h-4 mr-1 text-yellow-500" /> : <StarOff className="w-4 h-4 mr-1" />}
                Événement mis en avant (affiché en premier)
              </span>
            </label>
          </div>
        </div>

        {/* Informations principales */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Informations principales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'événement *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="ex: Defqon.1 Festival 2024"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu / Venue *
              </label>
              <Input
                value={formData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                placeholder="ex: Ziggo Dome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville *
              </label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="ex: Amsterdam"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Date et heure */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Date et heure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de l'événement *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heure (optionnel)
              </label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                placeholder="ex: 20:00"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Description</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description de l'événement
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Décrivez l'événement, le contexte, vos attentes..."
              rows={4}
            />
          </div>
        </div>

        {/* Liens et médias */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2" />
            Liens et médias
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lien billeterie
              </label>
              <Input
                value={formData.ticketLink}
                onChange={(e) => handleInputChange('ticketLink', e.target.value)}
                placeholder="https://..."
                type="url"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image de couverture
              </label>
              {/* TODO: Remplacer par un composant d'upload approprié */}
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="URL de l'image de couverture"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              {mode === 'create' 
                ? 'L\'événement sera visible sur le site après création'
                : 'Les modifications seront visibles immédiatement'
              }
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 sm:flex-initial">
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading} size="lg" className="flex-1 sm:flex-initial">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {mode === 'create' ? 'Créer l\'événement' : 'Sauvegarder les modifications'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}