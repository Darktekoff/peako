import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

interface SoundCloudMetadata {
  title: string
  artist: string
  description: string
  duration: string
  artwork_url: string
  permalink_url: string
  created_at: string
  genre: string
  tag_list: string
  playback_count: number
  soundcloud_id: string
}

// Extraire les métadonnées depuis une URL SoundCloud
async function extractSoundCloudMetadata(url: string): Promise<SoundCloudMetadata | null> {
  try {
    console.log(`🔍 Analyzing SoundCloud URL: ${url}`)
    
    // Vérifier que c'est bien une URL SoundCloud
    if (!url.includes('soundcloud.com')) {
      throw new Error('URL invalide : doit être un lien SoundCloud')
    }

    // Fetch de la page SoundCloud
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive'
      }
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    console.log(`📄 Page fetched successfully (${html.length} characters)`)

    // Chercher les données JSON dans le HTML
    const jsonMatch = html.match(/<script[^>]*>window\.__sc_hydration\s*=\s*(\[.*?\]);<\/script>/s)
    
    if (!jsonMatch) {
      console.log('⚠️ No JSON data found, trying alternative extraction methods...')
      return extractFromMeta(html, url)
    }

    try {
      const jsonData = JSON.parse(jsonMatch[1])
      console.log(`📦 JSON data parsed successfully`)
      
      // Parcourir les données pour trouver les infos de la track
      for (const item of jsonData) {
        if (item && item.hydratable === 'sound' && item.data) {
          const track = item.data
          
          // Formater la durée
          const duration = track.duration ? formatDuration(track.duration) : ''
          
          // Extraire l'ID SoundCloud
          const soundcloud_id = track.id ? String(track.id) : ''
          
          // Obtenir l'artwork en haute qualité
          let artwork_url = track.artwork_url || ''
          if (artwork_url) {
            // SoundCloud artwork URLs: remplacer -large par -t500x500 pour la haute qualité
            artwork_url = artwork_url.replace('-large', '-t500x500')
          }
          // Fallback sur l'avatar de l'utilisateur en haute qualité
          if (!artwork_url && track.user?.avatar_url) {
            artwork_url = track.user.avatar_url.replace('-large', '-t500x500')
          }
          
          const metadata: SoundCloudMetadata = {
            title: track.title || '',
            artist: track.user?.username || "Peak'O",
            description: track.description || '',
            duration,
            artwork_url,
            permalink_url: track.permalink_url || url,
            created_at: track.created_at || new Date().toISOString(),
            genre: track.genre || 'Hardstyle',
            tag_list: track.tag_list || '',
            playback_count: track.playback_count || 0,
            soundcloud_id
          }
          
          console.log('✅ Metadata extracted successfully:', metadata.title)
          return metadata
        }
      }
    } catch (parseError) {
      console.log('⚠️ Failed to parse JSON data, trying alternative methods...')
      return extractFromMeta(html, url)
    }

    // Si aucune donnée trouvée dans le JSON, essayer les meta tags
    return extractFromMeta(html, url)

  } catch (error) {
    console.error('❌ Error extracting SoundCloud metadata:', error)
    throw error
  }
}

// Méthode alternative : extraire depuis les meta tags
function extractFromMeta(html: string, url: string): SoundCloudMetadata {
  console.log('🔍 Extracting from meta tags...')
  
  // Regex pour extraire les meta tags
  const getMetaContent = (property: string) => {
    const regex = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
    const match = html.match(regex)
    return match ? match[1] : ''
  }

  // Extraire le titre depuis la page
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const pageTitle = titleMatch ? titleMatch[1] : ''
  
  // Nettoyer le titre (enlever "| Free Listening on SoundCloud")
  const cleanTitle = pageTitle.replace(/\s*\|\s*Free Listening on SoundCloud.*$/i, '').trim()
  
  // Extraire l'ID depuis l'URL ou les scripts
  const idMatch = html.match(/"id":(\d+)/) || url.match(/\/(\d+)(?:\?|$)/)
  const soundcloud_id = idMatch ? idMatch[1] : ''

  // Obtenir l'artwork en haute qualité depuis les meta tags
  let artwork_url = getMetaContent('og:image') || getMetaContent('twitter:image') || ''
  if (artwork_url && artwork_url.includes('soundcloud.com')) {
    // Remplacer t500x500 par original si présent, sinon ajouter -t500x500
    if (!artwork_url.includes('-t500x500') && !artwork_url.includes('-original')) {
      artwork_url = artwork_url.replace('.jpg', '-t500x500.jpg')
    }
  }

  const metadata: SoundCloudMetadata = {
    title: getMetaContent('og:title') || getMetaContent('twitter:title') || cleanTitle || '',
    artist: getMetaContent('og:site_name') || "Peak'O",
    description: getMetaContent('og:description') || getMetaContent('description') || '',
    duration: '', // Difficile à extraire sans API
    artwork_url,
    permalink_url: getMetaContent('og:url') || url,
    created_at: new Date().toISOString(),
    genre: 'Hardstyle',
    tag_list: '',
    playback_count: 0,
    soundcloud_id
  }

  console.log('✅ Metadata extracted from meta tags:', metadata.title)
  return metadata
}

// Formater la durée depuis millisecondes vers MM:SS
function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL SoundCloud requise' },
        { status: 400 }
      )
    }

    // Analyser l'URL SoundCloud
    const metadata = await extractSoundCloudMetadata(url)

    if (!metadata) {
      return NextResponse.json(
        { error: 'Impossible d\'extraire les métadonnées de cette URL' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      metadata,
      message: 'Métadonnées extraites avec succès'
    })

  } catch (error) {
    console.error('SoundCloud analysis failed:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'analyse SoundCloud',
        message: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}