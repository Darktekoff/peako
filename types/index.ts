// Import et re-export des types Prisma
import type {
  User as PrismaUser,
  Post,
  Event as PrismaEvent,
  Track,
  Gallery,
  ContactMessage,
  Photo,
  Role,
  EventStatus,
  ReleaseType,
  ContactType,
  MessageStatus,
} from '@prisma/client'

// Re-export avec alias si nécessaire
export type User = PrismaUser
export type Event = PrismaEvent
export type {
  Post,
  Track,
  Gallery,
  ContactMessage,
  Photo,
  Role,
  EventStatus,
  ReleaseType,
  ContactType,
  MessageStatus,
}

// Types utilitaires
export type SafeUser = Omit<User, 'password'>

export type PageParams = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Types pour les formulaires
export type ContactFormData = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  type: ContactType
  eventDate?: Date
  eventLocation?: string
  budget?: string
}

export type LoginFormData = {
  email: string
  password: string
}

// Types pour les filtres
export type EventFilter = {
  status?: EventStatus
  startDate?: Date
  endDate?: Date
  city?: string
  country?: string
}

export type TrackFilter = {
  releaseType?: ReleaseType
  genre?: string
  year?: number
  featured?: boolean
}

export type PostFilter = {
  category?: string
  tag?: string
  published?: boolean
}

// Types pour les statistiques
export type DashboardStats = {
  totalPosts: number
  totalEvents: number
  totalTracks: number
  totalMessages: number
  upcomingEvents: number
  newMessages: number
  recentViews: number
  totalPlayCount: number
}