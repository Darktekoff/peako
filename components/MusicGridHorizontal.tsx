'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Play, Pause, ExternalLink, Calendar, Clock, Music } from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  featuring?: string | null
  releaseDate: string
  releaseType: string
  genre: string
  duration?: string | null
  coverArt?: string | null
  soundcloudUrl?: string | null
  spotifyUrl?: string | null
  appleMusicUrl?: string | null
  youtubeUrl?: string | null
  beatportUrl?: string | null
  deezerUrl?: string | null
  visible: boolean
  featured: boolean
  order: number
}

interface MusicGridProps {
  tracks: Track[]
}

const sortOptions = [
  { value: 'newest', label: 'Plus récent' },
  { value: 'oldest', label: 'Plus ancien' },
  { value: 'title', label: 'Titre A-Z' },
  { value: 'featured', label: 'Mis en avant' }
]

export default function MusicGridHorizontal({ tracks }: MusicGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Tous')
  const [selectedYear, setSelectedYear] = useState('Toutes')
  const [sortBy, setSortBy] = useState('featured')
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Extraire les genres uniques et les années
  const genres = useMemo(() => {
    const uniqueGenres = ['Tous', ...new Set(tracks.map(t => t.genre))]
    return uniqueGenres
  }, [tracks])

  const years = useMemo(() => {
    const uniqueYears = ['Toutes', ...new Set(tracks.map(t => new Date(t.releaseDate).getFullYear().toString()))]
    return uniqueYears.sort((a, b) => {
      if (a === 'Toutes') return -1
      if (b === 'Toutes') return 1
      return parseInt(b) - parseInt(a)
    })
  }, [tracks])

  const filteredAndSortedTracks = useMemo(() => {
    let filtered = tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (track.featuring && track.featuring.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesGenre = selectedGenre === 'Tous' || track.genre === selectedGenre
      
      const matchesYear = selectedYear === 'Toutes' || 
                         new Date(track.releaseDate).getFullYear().toString() === selectedYear
      
      return matchesSearch && matchesGenre && matchesYear && track.visible
    })

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case 'oldest':
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          if (a.featured && b.featured) return a.order - b.order
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [tracks, searchTerm, selectedGenre, selectedYear, sortBy])

  const handlePlay = (trackId: string) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId)
  }

  const formatReleaseDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short'
    }).format(new Date(dateString))
  }

  // Fonction pour obtenir les liens streaming
  const getStreamingLinks = (track: Track) => {
    const links = []
    if (track.soundcloudUrl) links.push({ platform: 'SoundCloud', url: track.soundcloudUrl, bgColor: 'bg-black', icon: '/icons/soundcloud-svgrepo-com.svg' })
    if (track.spotifyUrl) links.push({ platform: 'Spotify', url: track.spotifyUrl, bgColor: '', icon: '/icons/Spotify_icon.svg' })
    if (track.appleMusicUrl) links.push({ platform: 'Apple Music', url: track.appleMusicUrl, bgColor: '', icon: '/icons/apple_icon.svg' })
    if (track.youtubeUrl) links.push({ platform: 'YouTube', url: track.youtubeUrl, bgColor: '', icon: '/icons/Youtube_icon.svg' })
    if (track.beatportUrl) links.push({ platform: 'Beatport', url: track.beatportUrl, bgColor: '', icon: '/icons/beatport-svgrepo-com.svg' })
    if (track.deezerUrl) links.push({ platform: 'Deezer', url: track.deezerUrl, bgColor: '', icon: '/icons/deezer_icon.svg' })
    return links
  }

  return (
    <>
      {/* Filters & Search Section */}
      <section className="bg-gray-900/50 border-b border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un titre, artiste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border-2 border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
              >
                <Filter size={16} className="mr-2" />
                Filtres {showFilters ? '↑' : '↓'}
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Genre Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Année</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Trier par</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Results Count */}
                  <div className="flex items-end">
                    <div className="text-center w-full">
                      <div className="text-2xl font-bold text-orange-400">{filteredAndSortedTracks.length}</div>
                      <div className="text-gray-400 text-sm">Résultats</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tracks List - Horizontal Cards */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedTracks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedTracks.map((track) => {
                const streamingLinks = getStreamingLinks(track)
                const displayArtist = track.featuring 
                  ? `${track.artist} ft. ${track.featuring}`
                  : track.artist
                const isPlaying = currentlyPlaying === track.id

                return (
                  <div 
                    key={track.id} 
                    className={`bg-gray-900 rounded-xl border ${isPlaying ? 'border-orange-500' : 'border-gray-800'} overflow-hidden transition-all duration-300 hover:border-orange-500/50`}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left side: Cover + Info */}
                      <div className="flex flex-col sm:flex-row lg:w-1/2">
                        {/* Cover Art */}
                        <div className="relative w-full sm:w-48 h-48 flex-shrink-0 bg-gray-800">
                          {track.coverArt ? (
                            <img
                              src={track.coverArt}
                              alt={track.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                // Si l'image ne charge pas, essayer une version alternative ou masquer
                                const img = e.target as HTMLImageElement
                                if (img.src.includes('-t500x500')) {
                                  // Essayer avec -large
                                  img.src = img.src.replace('-t500x500', '-large')
                                } else if (img.src.includes('-large')) {
                                  // Essayer avec l'URL de base
                                  img.src = img.src.replace('-large', '')
                                } else {
                                  // Masquer l'image et afficher le placeholder
                                  img.style.display = 'none'
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                              <Music size={48} className="text-gray-600" />
                            </div>
                          )}
                          
                          {/* Featured Badge */}
                          {track.featured && (
                            <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                              FEATURED
                            </div>
                          )}
                          
                          {/* Play Button Overlay */}
                          {track.soundcloudUrl && (
                            <button
                              onClick={() => handlePlay(track.id)}
                              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                            >
                              <div className="w-16 h-16 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors">
                                {isPlaying ? (
                                  <Pause size={24} className="text-white" />
                                ) : (
                                  <Play size={24} className="text-white ml-1" />
                                )}
                              </div>
                            </button>
                          )}
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-bold text-white mb-1">{track.title}</h3>
                          <p className="text-gray-400 mb-3">{displayArtist}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="inline-flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {formatReleaseDate(track.releaseDate)}
                            </span>
                            {track.duration && (
                              <span className="inline-flex items-center">
                                <Clock size={14} className="mr-1" />
                                {track.duration}
                              </span>
                            )}
                            <span className="inline-block px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-600/30 rounded-full text-xs">
                              {track.genre}
                            </span>
                            <span className="text-gray-600">{track.releaseType}</span>
                          </div>

                          {/* Streaming Links for Mobile */}
                          <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
                            {streamingLinks.map((link) => (
                              <a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-10 h-10 rounded-full overflow-hidden hover:scale-110 transition-transform flex items-center justify-center ${link.bgColor}`}
                                title={link.platform}
                              >
                                <img 
                                  src={link.icon} 
                                  alt={link.platform} 
                                  className={link.platform === 'SoundCloud' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right side: Player + Links */}
                      <div className="lg:w-1/2 p-6 bg-black/20">
                        {/* SoundCloud Player */}
                        {track.soundcloudUrl && (
                          <div className={`transition-all duration-300 ${isPlaying ? 'block' : 'hidden lg:block'}`}>
                            <iframe
                              width="100%"
                              height="120"
                              scrolling="no"
                              frameBorder="no"
                              allow="autoplay"
                              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.soundcloudUrl)}&color=%23ff5500&auto_play=${isPlaying}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
                            />
                          </div>
                        )}

                        {/* Streaming Links for Desktop */}
                        <div className="hidden lg:flex flex-wrap gap-3 mt-4">
                          {streamingLinks.map((link) => (
                            <a
                              key={link.platform}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform flex items-center justify-center ${link.bgColor}`}
                              title={link.platform}
                            >
                              <img 
                                src={link.icon} 
                                alt={link.platform} 
                                className={link.platform === 'SoundCloud' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}
                              />
                            </a>
                          ))}
                        </div>

                        {/* Message if no SoundCloud URL */}
                        {!track.soundcloudUrl && (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                              <Music size={32} className="mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Lecteur non disponible</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}