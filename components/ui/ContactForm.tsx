'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle } from 'lucide-react'
import Input from './Input'
import Textarea from './Textarea'
import Button from './Button'
import Card from './Card'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  eventType: z.enum(['private', 'club', 'festival', 'corporate', 'other']),
  eventDate: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>
  className?: string
}

export default function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })
  
  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Default API call
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        
        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi du message')
        }
      }
      
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      // TODO: Show error toast
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isSubmitted) {
    return (
      <Card variant="glass" className={className}>
        <div className="text-center py-8">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Message envoyé !
          </h3>
          <p className="text-gray-400 mb-6">
            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
          >
            Envoyer un autre message
          </Button>
        </div>
      </Card>
    )
  }
  
  return (
    <Card variant="glass" className={className}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nom complet *"
            placeholder="Votre nom"
            error={errors.name?.message}
            {...register('name')}
          />
          
          <Input
            label="Email *"
            type="email"
            placeholder="votre@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        
        <Input
          label="Sujet *"
          placeholder="Objet de votre demande"
          error={errors.subject?.message}
          {...register('subject')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Type d'événement *
            </label>
            <select
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              {...register('eventType')}
            >
              <option value="">Sélectionner un type</option>
              <option value="private">Événement privé</option>
              <option value="club">Boîte de nuit</option>
              <option value="festival">Festival</option>
              <option value="corporate">Événement corporate</option>
              <option value="other">Autre</option>
            </select>
            {errors.eventType && (
              <p className="text-sm text-red-400">{errors.eventType.message}</p>
            )}
          </div>
          
          <Input
            label="Date d'événement"
            type="date"
            error={errors.eventDate?.message}
            {...register('eventDate')}
          />
        </div>
        
        <Input
          label="Budget approximatif"
          placeholder="ex: 1500€ - 3000€"
          error={errors.budget?.message}
          {...register('budget')}
        />
        
        <Textarea
          label="Message *"
          placeholder="Décrivez votre événement, vos attentes, le lieu, le nombre d'invités..."
          rows={5}
          error={errors.message?.message}
          {...register('message')}
        />
        
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h4 className="text-white font-medium mb-2">Informations utiles à inclure :</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Date et horaires de l'événement</li>
            <li>• Lieu et nombre d'invités attendus</li>
            <li>• Type de musique souhaité</li>
            <li>• Matériel disponible sur place</li>
            <li>• Budget et modalités de paiement</li>
          </ul>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          <Send size={20} className="mr-2" />
          Envoyer ma demande
        </Button>
        
        <p className="text-gray-500 text-sm text-center">
          * Champs obligatoires. Vos données sont traitées de manière confidentielle.
        </p>
      </form>
    </Card>
  )
}