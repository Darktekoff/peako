'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Play, Pause, ExternalLink } from 'lucide-react'

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

export default function MusicGrid({ tracks }: MusicGridProps) {
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
          // Featured first, then by order, then by date
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
    if (track.soundcloudUrl) links.push({ platform: 'SoundCloud', url: track.soundcloudUrl, color: 'bg-orange-600' })
    if (track.spotifyUrl) links.push({ platform: 'Spotify', url: track.spotifyUrl, color: 'bg-green-600' })
    if (track.appleMusicUrl) links.push({ platform: 'Apple Music', url: track.appleMusicUrl, color: 'bg-gray-800' })
    if (track.youtubeUrl) links.push({ platform: 'YouTube', url: track.youtubeUrl, color: 'bg-orange-600' })
    if (track.beatportUrl) links.push({ platform: 'Beatport', url: track.beatportUrl, color: 'bg-yellow-600' })
    if (track.deezerUrl) links.push({ platform: 'Deezer', url: track.deezerUrl, color: 'bg-purple-600' })
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
                className="inline-flex items-center px-4 py-2 border-2 border-red-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
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
                      <div className="text-2xl font-bold text-red-400">{filteredAndSortedTracks.length}</div>
                      <div className="text-gray-400 text-sm">Résultats</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tracks Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedTracks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedTracks.map((track) => {
                const streamingLinks = getStreamingLinks(track)
                const displayArtist = track.featuring 
                  ? `${track.artist} ft. ${track.featuring}`
                  : track.artist

                return (
                  <div key={track.id} className="rounded-lg border border-gray-800 bg-gray-900 hover:border-red-500/30 transition-colors">
                    {/* Album Art */}
                    <div className="relative aspect-square bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-t-lg overflow-hidden">
                      {track.coverArt ? (
                        <img
                          src={track.coverArt}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                              <span className="text-2xl font-bold text-white">{track.title.charAt(0)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      {track.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                      
                      {/* Play Button Overlay - with SoundCloud embed */}
                      {track.soundcloudUrl && (
                        <button
                          onClick={() => handlePlay(track.id)}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity group"
                        >
                          <div className="w-16 h-16 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors">
                            {currentlyPlaying === track.id ? (
                              <Pause size={24} className="text-white" />
                            ) : (
                              <Play size={24} className="text-white ml-1" />
                            )}
                          </div>
                        </button>
                      )}
                    </div>
                    
                    {/* SoundCloud Player (hidden but functional) */}
                    {currentlyPlaying === track.id && track.soundcloudUrl && (
                      <div className="px-2">
                        <iframe
                          width="100%"
                          height="80"
                          scrolling="no"
                          frameBorder="no"
                          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.soundcloudUrl)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=false`}
                          className="mt-2"
                        />
                      </div>
                    )}
                    
                    {/* Track Info */}
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-1 truncate">{track.title}</h3>
                      <p className="text-gray-400 mb-2 truncate">{displayArtist}</p>
                      <p className="text-gray-500 text-sm mb-3">{track.releaseType}</p>
                      
                      {/* Metadata */}
                      <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                        <span>{track.duration || '—'}</span>
                        <span>{formatReleaseDate(track.releaseDate)}</span>
                      </div>
                      
                      {/* Genre */}
                      <div className="mb-4">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-orange-500/10 text-red-400 border border-orange-600/30">
                          {track.genre}
                        </span>
                      </div>
                      
                      {/* Streaming Links */}
                      {streamingLinks.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-gray-300 text-xs font-medium">Écouter sur :</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {streamingLinks.slice(0, 4).map((link) => (
                              <a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded transition-colors"
                              >
                                {link.platform === 'SoundCloud' && '☁️'}
                                {link.platform === 'Spotify' && '🎵'}
                                {link.platform === 'Apple Music' && '🍎'}
                                {link.platform === 'YouTube' && '▶️'}
                                {link.platform === 'Beatport' && '🎧'}
                                {link.platform === 'Deezer' && '🎶'}
                                <span className="ml-1 truncate">{link.platform}</span>
                              </a>
                            ))}
                          </div>
                          {streamingLinks.length > 4 && (
                            <p className="text-xs text-gray-500 text-center">+{streamingLinks.length - 4} autres</p>
                          )}
                        </div>
                      )}
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