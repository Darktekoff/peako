import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ContentType } from '@prisma/client'

// POST /api/about/init - Initialiser la page About avec le contenu par défaut
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Vérifier s'il y a déjà du contenu
    const existingContent = await prisma.aboutContent.findFirst()
    if (existingContent) {
      return NextResponse.json(
        { success: false, error: 'La page About contient déjà du contenu' },
        { status: 400 }
      )
    }

    // Contenu par défaut basé sur la page actuelle
    const defaultContent = [
      // Hero Section
      {
        section: 'hero',
        type: ContentType.HERO,
        content: {
          title: "L'histoire de Peak'O",
          subtitle: "Passionné de musique électronique depuis mon plus jeune âge, j'ai commencé mon parcours dans le Hardstyle il y a plus de 8 ans. Aujourd'hui, je partage ma passion à travers mes productions et mes performances sur les plus grandes scènes du monde.",
          profileImage: null // À remplacer par une vraie image
        },
        order: 0,
        visible: true
      },
      
      // Stats Section
      {
        section: 'hero',
        type: ContentType.STATS,
        content: {
          stats: [
            { label: "Années d'expérience", value: "8+" },
            { label: "Tracks produites", value: "50+" },
            { label: "Festivals joués", value: "25+" },
            { label: "Followers Spotify", value: "100K+" }
          ]
        },
        order: 1,
        visible: true
      },

      // Biography Section
      {
        section: 'biography',
        type: ContentType.TEXT,
        content: {
          title: "Mon parcours",
          paragraphs: [
            "Tout a commencé en 2016 quand j'ai découvert le Hardstyle lors de mon premier festival. L'énergie, la puissance des kicks et l'euphorie de la foule m'ont immédiatement captivé. J'ai su à ce moment-là que je voulais faire partie de cette communauté incroyable.",
            "J'ai commencé par apprendre les bases du DJing et de la production sur FL Studio. Mes premières productions étaient loin d'être parfaites, mais la passion était là. J'ai passé des nuits entières à perfectionner mes techniques, à analyser les tracks de mes artistes préférés et à développer mon propre style.",
            "Le tournant de ma carrière est arrivé en 2021 avec la sortie de \"Euphoria\", un titre qui m'a propulsé sur la scène internationale. Depuis, j'ai eu la chance de jouer aux côtés de mes idoles et de partager ma musique avec des milliers de fans à travers le monde.",
            "Aujourd'hui, mon objectif est de continuer à évoluer artistiquement tout en restant fidèle à l'essence du Hardstyle : l'émotion, la puissance et l'unité qu'elle apporte à notre communauté."
          ]
        },
        order: 0,
        visible: true
      },

      // Genres Section
      {
        section: 'biography',
        type: ContentType.LIST,
        content: {
          title: "Genres",
          items: ["Hardstyle", "Raw Hardstyle", "Euphoric Hardstyle", "Freestyle", "Hardcore"]
        },
        order: 1,
        visible: true
      },

      // Influences Section
      {
        section: 'biography',
        type: ContentType.LIST,
        content: {
          title: "Influences",
          items: [
            "Headhunterz", "Wildstylez", "Noisecontrollers", "Brennan Heart",
            "Code Black", "Da Tweekaz", "Sub Zero Project", "D-Block & S-te-Fan"
          ]
        },
        order: 2,
        visible: true
      },

      // Achievements Section
      {
        section: 'achievements',
        type: ContentType.ACHIEVEMENT,
        content: {
          title: "Achievements",
          subtitle: "Les moments marquants de mon parcours",
          achievements: [
            {
              year: "2024",
              title: "Première partie de Headhunterz",
              description: "Sélectionné pour assurer la première partie de Headhunterz au Ziggo Dome d'Amsterdam",
              icon: "Users",
              type: "performance"
            },
            {
              year: "2023",
              title: "Signature chez Scantraxx",
              description: "Signature d'un contrat exclusif avec le label légendaire Scantraxx Recordz",
              icon: "Award",
              type: "contract"
            },
            {
              year: "2023",
              title: "Single \"Euphoria\" #1",
              description: "Mon titre \"Euphoria\" atteint la première place du classement Hardstyle Beatport",
              icon: "Music",
              type: "release"
            },
            {
              year: "2022",
              title: "Première à Defqon.1",
              description: "Premier set sur la scène principale du plus grand festival Hardstyle au monde",
              icon: "Calendar",
              type: "festival"
            }
          ]
        },
        order: 0,
        visible: true
      },

      // Gallery Section
      {
        section: 'gallery',
        type: ContentType.GALLERY,
        content: {
          title: "Galerie",
          subtitle: "Quelques moments mémorables de mes performances",
          photos: [] // Array vide, à remplir par l'utilisateur
        },
        order: 0,
        visible: true
      }
    ]

    // Créer tous les éléments de contenu
    const createdContent = await prisma.aboutContent.createMany({
      data: defaultContent
    })

    return NextResponse.json({
      success: true,
      message: `${createdContent.count} éléments de contenu créés`,
      count: createdContent.count
    })
  } catch (error) {
    console.error('Error initializing about content:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'initialisation du contenu' },
      { status: 500 }
    )
  }
}