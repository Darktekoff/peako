'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Play, Pause } from 'lucide-react'


// Mock data - À remplacer par des données dynamiques
const tracks = [
  {
    id: 'thunder-strikes',
    title: 'Thunder Strikes',
    artist: 'Peak\'O',
    album: 'Lightning EP',
    duration: 240,
    releaseDate: new Date('2024-06-10'),
    genre: ['Hardstyle', 'Euphoric'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
      { platform: 'YouTube', url: 'https://youtube.com' }
    ],
    audioUrl: '/audio/thunder-strikes.mp3',
    imageUrl: '/images/thunder-strikes-cover.jpg'
  },
  {
    id: 'euphoria',
    title: 'Euphoria',
    artist: 'Peak\'O',
    album: 'Single',
    duration: 258,
    releaseDate: new Date('2023-09-15'),
    genre: ['Hardstyle', 'Euphoric'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Beatport', url: 'https://beatport.com' }
    ],
    audioUrl: '/audio/euphoria.mp3',
    imageUrl: '/images/euphoria-cover.jpg'
  },
  {
    id: 'dark-energy',
    title: 'Dark Energy',
    artist: 'Peak\'O',
    album: 'Void EP',
    duration: 275,
    releaseDate: new Date('2023-05-20'),
    genre: ['Raw Hardstyle', 'Dark'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com' }
    ],
    audioUrl: '/audio/dark-energy.mp3',
    imageUrl: '/images/dark-energy-cover.jpg'
  },
  {
    id: 'rising-sun',
    title: 'Rising Sun',
    artist: 'Peak\'O ft. Emma Storm',
    album: 'Dawn EP',
    duration: 295,
    releaseDate: new Date('2023-03-12'),
    genre: ['Hardstyle', 'Vocal'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' }
    ],
    audioUrl: '/audio/rising-sun.mp3',
    imageUrl: '/images/rising-sun-cover.jpg'
  },
  {
    id: 'midnight-rush',
    title: 'Midnight Rush',
    artist: 'Peak\'O',
    album: 'Night Sessions Vol.1',
    duration: 312,
    releaseDate: new Date('2022-11-08'),
    genre: ['Raw Hardstyle', 'Hardcore'],
    streamingLinks: [
      { platform: 'Beatport', url: 'https://beatport.com' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com' }
    ],
    audioUrl: '/audio/midnight-rush.mp3',
    imageUrl: '/images/midnight-rush-cover.jpg'
  },
  {
    id: 'stellar-journey',
    title: 'Stellar Journey',
    artist: 'Peak\'O x Sub Zero Project',
    album: 'Collaboration Single',
    duration: 286,
    releaseDate: new Date('2022-08-25'),
    genre: ['Hardstyle', 'Freestyle'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Beatport', url: 'https://beatport.com' }
    ],
    audioUrl: '/audio/stellar-journey.mp3',
    imageUrl: '/images/stellar-journey-cover.jpg'
  }
]

const genres = ['Tous', 'Hardstyle', 'Raw Hardstyle', 'Euphoric', 'Hardcore', 'Freestyle', 'Vocal', 'Dark']
const years = ['Toutes', '2024', '2023', '2022', '2021']
const sortOptions = [
  { value: 'newest', label: 'Plus récent' },
  { value: 'oldest', label: 'Plus ancien' },
  { value: 'title', label: 'Titre A-Z' },
  { value: 'duration', label: 'Durée' }
]

export default function Music() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Tous')
  const [selectedYear, setSelectedYear] = useState('Toutes')
  const [sortBy, setSortBy] = useState('newest')
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedTracks = useMemo(() => {
    let filtered = tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          track.album.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesGenre = selectedGenre === 'Tous' || track.genre.includes(selectedGenre)
      
      const matchesYear = selectedYear === 'Toutes' || 
                         track.releaseDate.getFullYear().toString() === selectedYear
      
      return matchesSearch && matchesGenre && matchesYear
    })

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.releaseDate.getTime() - a.releaseDate.getTime()
        case 'oldest':
          return a.releaseDate.getTime() - b.releaseDate.getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'duration':
          return b.duration - a.duration
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedGenre, selectedYear, sortBy])

  const handlePlay = (trackId: string) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId)
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-32 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ma <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">Musique</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez ma discographie complète, des tracks Euphoric aux productions Raw Hardstyle. 
              Chaque titre raconte une histoire et transporte une émotion unique.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search Section */}
      <section className="bg-gray-900/50 border-b border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un titre, artiste ou album..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
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
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
              {filteredAndSortedTracks.map((track, index) => (
                <div key={track.id} className="rounded-lg border border-gray-800 bg-gray-900 hover:border-red-500/30 transition-colors">
                  {/* Album Art */}
                  <div className="relative aspect-square bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-t-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{track.title.charAt(0)}</span>
                        </div>
                        <p className="text-gray-400 text-sm">Cover Art</p>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <button
                      onClick={() => handlePlay(track.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity group"
                    >
                      <div className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
                        {currentlyPlaying === track.id ? (
                          <Pause size={24} className="text-white" />
                        ) : (
                          <Play size={24} className="text-white ml-1" />
                        )}
                      </div>
                    </button>
                  </div>
                  
                  {/* Track Info */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-1 truncate">{track.title}</h3>
                    {track.artist && (
                      <p className="text-gray-400 mb-2 truncate">{track.artist}</p>
                    )}
                    {track.album && (
                      <p className="text-gray-500 text-sm mb-3 truncate">{track.album}</p>
                    )}
                    
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                      <span>{formatDuration(track.duration)}</span>
                      <span>{track.releaseDate.getFullYear()}</span>
                    </div>
                    
                    {/* Genre Tags */}
                    {track.genre && track.genre.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {track.genre.slice(0, 2).map((genre) => (
                          <span key={genre} className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-600/30">
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Streaming Links */}
                    {track.streamingLinks && track.streamingLinks.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-gray-300 text-sm font-medium">Écouter sur :</p>
                        <div className="grid grid-cols-2 gap-2">
                          {track.streamingLinks.slice(0, 2).map((link) => (
                            <a
                              key={link.platform}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors"
                            >
                              {link.platform}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}