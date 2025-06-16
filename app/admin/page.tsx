'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { 
  FileText, 
  Calendar, 
  Music, 
  MessageSquare, 
  Users,
  TrendingUp,
  Clock,
  Plus
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  postsCount: number
  eventsCount: number
  tracksCount: number
  messagesCount: number
  recentMessages: Array<{
    id: string
    name: string
    email: string
    subject: string
    createdAt: string
    status: string
  }>
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    postsCount: 0,
    eventsCount: 0,
    tracksCount: 0,
    messagesCount: 0,
    recentMessages: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Pour l'instant, utilisons des données factices
    // Plus tard, on fera des appels API réels
    setTimeout(() => {
      setStats({
        postsCount: 12,
        eventsCount: 8,
        tracksCount: 24,
        messagesCount: 5,
        recentMessages: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Demande de booking pour festival',
            createdAt: new Date().toISOString(),
            status: 'NEW'
          },
          {
            id: '2',
            name: 'Sarah Smith',
            email: 'sarah@club.com',
            subject: 'Collaboration musique',
            createdAt: new Date().toISOString(),
            status: 'READ'
          }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [])

  const statsCards = [
    {
      name: 'Articles',
      value: stats.postsCount,
      icon: FileText,
      href: '/admin/posts',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Événements',
      value: stats.eventsCount,
      icon: Calendar,
      href: '/admin/events',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      name: 'Tracks',
      value: stats.tracksCount,
      icon: Music,
      href: '/admin/music',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      name: 'Messages',
      value: stats.messagesCount,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ]

  const quickActions = [
    {
      name: 'Nouvel article',
      href: '/admin/posts/new',
      icon: FileText,
      description: 'Créer un nouvel article ou actualité'
    },
    {
      name: 'Nouvel événement',
      href: '/admin/events/new',
      icon: Calendar,
      description: 'Ajouter un nouvel événement ou concert'
    },
    {
      name: 'Nouvelle track',
      href: '/admin/music/new',
      icon: Music,
      description: 'Ajouter une nouvelle track à la discographie'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Bienvenue {session?.user?.name}, voici un aperçu de votre site.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-white px-4 py-5 shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <action.icon className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {action.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Plus className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Messages récents</h2>
            <Link
              href="/admin/messages"
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Voir tous
            </Link>
          </div>
          <div className="bg-white rounded-lg border border-gray-200">
            {stats.recentMessages.length === 0 ? (
              <div className="p-6 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucun message
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Les nouveaux messages apparaîtront ici.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {stats.recentMessages.map((message) => (
                  <li key={message.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {message.subject}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          message.status === 'NEW' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.status === 'NEW' ? 'Nouveau' : 'Lu'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Il y a 2h
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Vue d'ensemble</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-600">
              Votre site fonctionne parfaitement. Tous les services sont opérationnels.
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2.1s</div>
              <div className="text-xs text-gray-500">Temps de chargement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95</div>
              <div className="text-xs text-gray-500">Score SEO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}