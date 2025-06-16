import { Award, Calendar, MapPin, Music, Users, Play } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import GallerySection from '@/components/GallerySection'

export const metadata = {
  title: 'À propos | Peak\'O Music',
  description: 'Découvrez l\'histoire de Peak\'O, DJ et producteur Hardstyle passionné. Son parcours, ses influences et ses achievements dans la scène électronique.',
}

// Récupérer le contenu About depuis la base de données
async function getAboutContent() {
  try {
    const content = await prisma.aboutContent.findMany({
      where: { visible: true },
      orderBy: [
        { section: 'asc' },
        { order: 'asc' }
      ]
    })


    // Organiser le contenu par sections
    const organizedContent = content.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    }, {} as Record<string, any[]>)

    return organizedContent
  } catch (error) {
    console.error('Error fetching about content:', error)
    return {}
  }
}

// Composant pour rendre les icônes
function renderIcon(iconName: string, size: number = 24) {
  const iconMap: Record<string, any> = {
    Award,
    Calendar,
    MapPin,
    Music,
    Users
  }
  
  const IconComponent = iconMap[iconName] || Award
  return <IconComponent size={size} />
}

// Composant pour rendre une section Hero
function HeroSection({ items }: { items: any[] }) {
  const heroItem = items.find(item => item.type === 'HERO')
  const statsItem = items.find(item => item.type === 'STATS')
  
  if (!heroItem) return null

  const { title, subtitle, profileImage } = heroItem.content
  const stats = statsItem?.content?.stats || []

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 pt-32 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {title || "L'histoire de Peak'O"}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {subtitle || "Passionné de musique électronique..."}
            </p>
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat: any, index: number) => (
                  <div key={index} className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">P</span>
                    </div>
                    <p className="text-gray-400">Photo de profil</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Composant pour rendre la section biographie
function BiographySection({ items }: { items: any[] }) {
  const textItem = items.find(item => item.type === 'TEXT')
  const listItems = items.filter(item => item.type === 'LIST')
  
  if (!textItem && listItems.length === 0) return null

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {textItem && (
              <>
                <h2 className="text-4xl font-bold text-white mb-8">
                  {textItem.content.title}
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  {textItem.content.paragraphs.map((paragraph: string, index: number) => (
                    <p key={index} className="text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {listItems.length > 0 && (
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 sticky top-8">
                <h3 className="text-xl font-bold text-white mb-6">Style musical</h3>
                
                {listItems.map((listItem, index) => (
                  <div key={index} className={index > 0 ? 'mt-6' : ''}>
                    <h4 className="text-gray-300 font-medium mb-3">
                      {listItem.content.title}
                    </h4>
                    
                    {listItem.content.title.toLowerCase().includes('genre') ? (
                      // Affichage en badges pour les genres
                      <div className="flex flex-wrap gap-2">
                        {listItem.content.items.map((item: string, itemIndex: number) => (
                          <span key={itemIndex} className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-600/30">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      // Affichage en liste pour les influences
                      <div className="space-y-2">
                        {listItem.content.items.map((item: string, itemIndex: number) => (
                          <div key={itemIndex} className="text-gray-400 text-sm">
                            • {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Composant pour rendre la section achievements
function AchievementsSection({ items }: { items: any[] }) {
  const achievementItem = items.find(item => item.type === 'ACHIEVEMENT')
  
  if (!achievementItem) return null

  const { title, subtitle, achievements } = achievementItem.content

  return (
    <section className="bg-gray-900/50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-orange-600 hidden md:block"></div>
          
          <div className="space-y-8">
            {achievements.map((achievement: any, index: number) => (
              <div key={index} className="flex items-start space-x-6">
                {/* Timeline dot */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full border-4 border-black flex-shrink-0">
                  {renderIcon(achievement.icon, 24)}
                </div>
                
                {/* Content */}
                <div className="flex-1 rounded-lg border border-gray-800 bg-gray-900 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-600/30">
                          {achievement.year}
                        </span>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                          {achievement.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                    </div>
                    <div className="md:hidden">
                      {renderIcon(achievement.icon, 24)}
                    </div>
                  </div>
                  <p className="text-gray-400">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


export default async function About() {
  const content = await getAboutContent()
  
  // Si aucun contenu n'est trouvé, afficher un message d'aide
  const hasContent = Object.keys(content).length > 0

  if (!hasContent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-4xl font-bold text-white mb-4">Page About</h1>
          <p className="text-gray-400 mb-6">
            La page About n'a pas encore été configurée. 
          </p>
          <p className="text-gray-400 mb-8">
            Connectez-vous en tant qu'administrateur et allez dans la section "À propos" pour créer le contenu.
          </p>
          <a 
            href="/admin/about" 
            className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            Configurer la page About
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      {content.hero && <HeroSection items={content.hero} />}
      
      {/* Biography Section */}
      {content.biography && <BiographySection items={content.biography} />}
      
      {/* Achievements Section */}
      {content.achievements && <AchievementsSection items={content.achievements} />}
      
      {/* Gallery Section */}
      {content.gallery && (() => {
        const galleryItem = content.gallery.find((item: any) => item.type === 'GALLERY')
        if (!galleryItem) return null
        const { title, subtitle, photos } = galleryItem.content
        return <GallerySection title={title} subtitle={subtitle} photos={photos} />
      })()}
    </div>
  )
}