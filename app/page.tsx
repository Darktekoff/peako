import Link from 'next/link'
import { Calendar, MapPin, Play, Music, ExternalLink } from 'lucide-react'
import { prisma } from '@/lib/prisma'

// Récupérer la track featured la plus récente
async function getFeaturedTrack() {
  try {
    const track = await prisma.track.findFirst({
      where: {
        featured: true,
        visible: true
      },
      orderBy: [
        { order: 'asc' },
        { releaseDate: 'desc' }
      ]
    })
    
    if (!track) return null
    
    return {
      ...track,
      releaseDate: track.releaseDate.toISOString()
    }
  } catch (error) {
    console.error('Error fetching featured track:', error)
    return null
  }
}

// Récupérer les prochains événements
async function getUpcomingEvents() {
  try {
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date()
        },
        status: 'CONFIRMED'
      },
      orderBy: {
        date: 'asc'
      },
      take: 3
    })
    
    return events.map(event => ({
      ...event,
      date: event.date.toISOString()
    }))
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export default async function Home() {
  const featuredTrack = await getFeaturedTrack()
  const upcomingEvents = await getUpcomingEvents()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-gray-900/20" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-6">
            <img 
              src="/images/Sans titre (1024 x 800 px) (2).png" 
              alt="Peak'O Music Logo"
              className="mx-auto max-w-md md:max-w-lg lg:max-w-xl w-full h-auto"
            />
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            DJ & Producteur Hardstyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/music" 
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg transition-colors text-lg font-semibold"
            >
              <Music className="mr-2" size={20} />
              Découvrir ma musique
            </Link>
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-lg transition-colors text-lg font-semibold"
            >
              <Calendar className="mr-2" size={20} />
              Voir mes dates
            </Link>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        </div>
      </section>

      {/* Featured Track Section */}
      {featuredTrack && (
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Track mise en avant
              </span>
            </h2>
            
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Cover Art */}
                <div className="relative aspect-square bg-gradient-to-br from-red-500/20 to-red-600/20">
                  {featuredTrack.coverArt ? (
                    <img
                      src={featuredTrack.coverArt}
                      alt={featuredTrack.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-5xl font-bold text-white">
                            {featuredTrack.title.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Track Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full mb-4">
                      FEATURED
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">{featuredTrack.title}</h3>
                    <p className="text-xl text-gray-400">
                      {featuredTrack.artist}
                      {featuredTrack.featuring && ` ft. ${featuredTrack.featuring}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-gray-400 mb-6">
                    <span>{featuredTrack.genre}</span>
                    <span>{featuredTrack.duration || '—'}</span>
                    <span>{new Date(featuredTrack.releaseDate).getFullYear()}</span>
                  </div>
                  
                  {/* SoundCloud Player */}
                  {featuredTrack.soundcloudUrl && (
                    <div className="mb-6">
                      <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(featuredTrack.soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`}
                      />
                    </div>
                  )}
                  
                  {/* Streaming Links */}
                  <div className="flex flex-wrap gap-3">
                    {featuredTrack.soundcloudUrl && (
                      <a
                        href={featuredTrack.soundcloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-black rounded-full overflow-hidden hover:scale-110 transition-transform flex items-center justify-center"
                        title="SoundCloud"
                      >
                        <img 
                          src="/icons/soundcloud-svgrepo-com.svg" 
                          alt="SoundCloud" 
                          className="w-full h-full object-contain"
                        />
                      </a>
                    )}
                    {featuredTrack.spotifyUrl && (
                      <a
                        href={featuredTrack.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform"
                        title="Spotify"
                      >
                        <img src="/icons/Spotify_icon.svg" alt="Spotify" className="w-full h-full object-cover" />
                      </a>
                    )}
                    {featuredTrack.appleMusicUrl && (
                      <a
                        href={featuredTrack.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform"
                        title="Apple Music"
                      >
                        <img src="/icons/apple_icon.svg" alt="Apple Music" className="w-full h-full object-cover" />
                      </a>
                    )}
                    {featuredTrack.youtubeUrl && (
                      <a
                        href={featuredTrack.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform"
                        title="YouTube"
                      >
                        <img src="/icons/Youtube_icon.svg" alt="YouTube" className="w-full h-full object-cover" />
                      </a>
                    )}
                    {featuredTrack.beatportUrl && (
                      <a
                        href={featuredTrack.beatportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform"
                        title="Beatport"
                      >
                        <img src="/icons/beatport-svgrepo-com.svg" alt="Beatport" className="w-full h-full object-cover" />
                      </a>
                    )}
                    {featuredTrack.deezerUrl && (
                      <a
                        href={featuredTrack.deezerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform"
                        title="Deezer"
                      >
                        <img src="/icons/deezer_icon.svg" alt="Deezer" className="w-full h-full object-cover" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/music"
                className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
              >
                Voir toute ma discographie
                <ExternalLink className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Prochains événements
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:border-red-500/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                      <p className="text-gray-400">{event.venue}</p>
                    </div>
                    {event.featured && (
                      <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded">
                        HOT
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="mr-2" size={16} />
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2" size={16} />
                      {event.city}, {event.country}
                    </div>
                  </div>
                  
                  {event.ticketLink && (
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                    >
                      Réserver
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/events"
                className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
              >
                Voir tous les événements
                <ExternalLink className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à faire vibrer votre événement ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactez-moi pour vos bookings et collaborations
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg transition-colors text-lg font-semibold"
          >
            Me contacter
          </Link>
        </div>
      </section>
    </div>
  )
}