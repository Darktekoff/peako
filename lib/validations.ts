import { z } from 'zod'

// Schéma de validation pour le formulaire de contact
export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  type: z.enum(['GENERAL', 'BOOKING', 'COLLABORATION', 'PRESS', 'OTHER']),
  eventDate: z.date().optional(),
  eventLocation: z.string().optional(),
  budget: z.string().optional(),
})

// Schéma de validation pour la connexion
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

// Schéma de validation pour un post
export const postSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10, 'Le contenu doit contenir au moins 10 caractères'),
  coverImage: z.string().url().optional().or(z.literal('')),
  published: z.boolean().default(false),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

// Schéma de validation pour un événement
export const eventSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  venue: z.string().min(2, 'Le lieu doit contenir au moins 2 caractères'),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  country: z.string().min(2, 'Le pays doit contenir au moins 2 caractères'),
  date: z.date(),
  time: z.string().optional(),
  description: z.string().optional(),
  ticketLink: z.string().url().optional().or(z.literal('')),
  coverImage: z.string().url().optional().or(z.literal('')),
  status: z.enum(['CONFIRMED', 'PENDING', 'CANCELLED', 'POSTPONED']).default('CONFIRMED'),
  featured: z.boolean().default(false),
})

// Schéma de validation pour un track
export const trackSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  artist: z.string().default("Peak'O"),
  featuring: z.string().optional(),
  releaseDate: z.date(),
  releaseType: z.enum(['SINGLE', 'EP', 'ALBUM', 'REMIX', 'BOOTLEG', 'COLLAB']),
  genre: z.string().default('Hardstyle'),
  duration: z.string().optional(),
  coverArt: z.string().url().optional().or(z.literal('')),
  audioFile: z.string().url().optional().or(z.literal('')),
  spotifyUrl: z.string().url().optional().or(z.literal('')),
  appleMusicUrl: z.string().url().optional().or(z.literal('')),
  soundcloudUrl: z.string().url().optional().or(z.literal('')),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  beatportUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
})

// Schéma de validation pour une galerie
export const gallerySchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  description: z.string().optional(),
  eventId: z.string().optional(),
  date: z.date(),
  coverPhoto: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
})

// Types inférés depuis les schémas
export type ContactFormData = z.infer<typeof contactSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type PostFormData = z.infer<typeof postSchema>
export type EventFormData = z.infer<typeof eventSchema>
export type TrackFormData = z.infer<typeof trackSchema>
export type GalleryFormData = z.infer<typeof gallerySchema>