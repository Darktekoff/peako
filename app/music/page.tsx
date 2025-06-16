import { prisma } from '@/lib/prisma'
import MusicGridHorizontal from '@/components/MusicGridHorizontal'

async function getTracks() {
  try {
    const tracks = await prisma.track.findMany({
      where: {
        visible: true
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { releaseDate: 'desc' }
      ]
    })
    
    // Convertir les dates en strings pour la sérialisation
    return tracks.map(track => ({
      ...track,
      releaseDate: track.releaseDate.toISOString(),
      createdAt: track.createdAt.toISOString(),
      updatedAt: track.updatedAt.toISOString(),
      // lastSyncAt n'existe pas dans le schéma Track
    }))
  } catch (error) {
    console.error('Error fetching tracks:', error)
    return []
  }
}

export default async function Music() {
  const tracks = await getTracks()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-32 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ma <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">Musique</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez ma discographie complète, des tracks Euphoric aux productions Raw Hardstyle. 
              Chaque titre raconte une histoire et transporte une émotion unique.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{tracks.length}</div>
              <div className="text-gray-400 text-sm">Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">
                {tracks.filter(t => t.featured).length}
              </div>
              <div className="text-gray-400 text-sm">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">
                {new Set(tracks.map(t => t.genre)).size}
              </div>
              <div className="text-gray-400 text-sm">Genres</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">
                {new Set(tracks.map(t => new Date(t.releaseDate).getFullYear())).size}
              </div>
              <div className="text-gray-400 text-sm">Années</div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Grid Component */}
      <MusicGridHorizontal tracks={tracks} />
    </div>
  )
}