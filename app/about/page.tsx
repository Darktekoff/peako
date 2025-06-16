import { Award, Calendar, MapPin, Music, Users } from 'lucide-react'

export const metadata = {
  title: 'À propos | Peak\'O Music',
  description: 'Découvrez l\'histoire de Peak\'O, DJ et producteur Hardstyle passionné. Son parcours, ses influences et ses achievements dans la scène électronique.',
}

const achievements = [
  {
    year: '2024',
    title: 'Première partie de Headhunterz',
    description: 'Sélectionné pour assurer la première partie de Headhunterz au Ziggo Dome d\'Amsterdam',
    icon: Users,
    type: 'performance'
  },
  {
    year: '2023',
    title: 'Signature chez Scantraxx',
    description: 'Signature d\'un contrat exclusif avec le label légendaire Scantraxx Recordz',
    icon: Award,
    type: 'contract'
  },
  {
    year: '2023',
    title: 'Single "Euphoria" #1',
    description: 'Mon titre "Euphoria" atteint la première place du classement Hardstyle Beatport',
    icon: Music,
    type: 'release'
  },
  {
    year: '2022',
    title: 'Première à Defqon.1',
    description: 'Premier set sur la scène principale du plus grand festival Hardstyle au monde',
    icon: Calendar,
    type: 'festival'
  }
]

const influences = [
  'Headhunterz', 'Wildstylez', 'Noisecontrollers', 'Brennan Heart', 
  'Code Black', 'Da Tweekaz', 'Sub Zero Project', 'D-Block & S-te-Fan'
]

const genres = [
  'Hardstyle', 'Raw Hardstyle', 'Euphoric Hardstyle', 'Freestyle', 'Hardcore'
]

const stats = [
  { label: 'Années d\'expérience', value: '8+' },
  { label: 'Tracks produites', value: '50+' },
  { label: 'Festivals joués', value: '25+' },
  { label: 'Followers Spotify', value: '100K+' }
]

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-32 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                L'histoire de{' '}
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  Peak'O
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Passionné de musique électronique depuis mon plus jeune âge, 
                j'ai commencé mon parcours dans le Hardstyle il y a plus de 8 ans. 
                Aujourd'hui, je partage ma passion à travers mes productions et mes performances 
                sur les plus grandes scènes du monde.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-center">
                    <div className="text-2xl font-bold text-red-400 mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">P</span>
                    </div>
                    <p className="text-gray-400">Photo de profil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-white mb-8">Mon parcours</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Tout a commencé en 2016 quand j'ai découvert le Hardstyle lors de mon premier festival. 
                  L'énergie, la puissance des kicks et l'euphorie de la foule m'ont immédiatement captivé. 
                  J'ai su à ce moment-là que je voulais faire partie de cette communauté incroyable.
                </p>
                
                <p>
                  J'ai commencé par apprendre les bases du DJing et de la production sur FL Studio. 
                  Mes premières productions étaient loin d'être parfaites, mais la passion était là. 
                  J'ai passé des nuits entières à perfectionner mes techniques, à analyser les tracks 
                  de mes artistes préférés et à développer mon propre style.
                </p>
                
                <p>
                  Le tournant de ma carrière est arrivé en 2021 avec la sortie de "Euphoria", 
                  un titre qui m'a propulsé sur la scène internationale. Depuis, j'ai eu la chance 
                  de jouer aux côtés de mes idoles et de partager ma musique avec des milliers de fans 
                  à travers le monde.
                </p>
                
                <p>
                  Aujourd'hui, mon objectif est de continuer à évoluer artistiquement tout en 
                  restant fidèle à l'essence du Hardstyle : l'émotion, la puissance et l'unité 
                  qu'elle apporte à notre communauté.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 sticky top-8">
                <h3 className="text-xl font-bold text-white mb-6">Style musical</h3>
                
                <div className="mb-6">
                  <h4 className="text-gray-300 font-medium mb-3">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <span key={genre} className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-600/30">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gray-300 font-medium mb-3">Influences</h4>
                  <div className="space-y-2">
                    {influences.map((influence) => (
                      <div key={influence} className="text-gray-400 text-sm">
                        • {influence}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Achievements</h2>
            <p className="text-gray-400 text-lg">Les moments marquants de mon parcours</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-red-600 hidden md:block"></div>
            
            <div className="space-y-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div key={index} className="flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 bg-red-600 rounded-full border-4 border-black flex-shrink-0">
                      <Icon size={24} className="text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 rounded-lg border border-gray-800 bg-gray-900 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-600/30">
                              {achievement.year}
                            </span>
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                              {achievement.type}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                        </div>
                        <div className="md:hidden">
                          <Icon size={24} className="text-red-400" />
                        </div>
                      </div>
                      <p className="text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Galerie</h2>
            <p className="text-gray-400 text-lg">Quelques moments mémorables de mes performances</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-video bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30 flex items-center justify-center hover:border-red-400 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-red-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📸</span>
                  </div>
                  <p className="text-gray-400 text-sm">Photo {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}