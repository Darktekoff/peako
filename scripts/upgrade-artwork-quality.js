const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function upgradeArtworkQuality() {
  console.log('🎨 Mise à jour de la qualité des artworks...\n')

  try {
    // Récupérer toutes les tracks avec un artwork
    const tracks = await prisma.track.findMany({
      where: {
        coverArt: {
          not: null
        }
      }
    })

    console.log(`📊 ${tracks.length} tracks avec artwork trouvées\n`)

    let updated = 0

    for (const track of tracks) {
      if (track.coverArt && track.coverArt.includes('soundcloud.com')) {
        let newArtworkUrl = track.coverArt

        // Si l'URL ne contient pas déjà -t500x500, l'ajouter
        if (!newArtworkUrl.includes('-t500x500') && !newArtworkUrl.includes('-original')) {
          if (newArtworkUrl.includes('-large')) {
            newArtworkUrl = newArtworkUrl.replace('-large', '-t500x500')
          } else if (newArtworkUrl.includes('.jpg')) {
            newArtworkUrl = newArtworkUrl.replace('.jpg', '-t500x500.jpg')
          }
        }

        // Mettre à jour seulement si l'URL a changé
        if (newArtworkUrl !== track.coverArt) {
          await prisma.track.update({
            where: { id: track.id },
            data: { coverArt: newArtworkUrl }
          })
          
          console.log(`✅ ${track.title}: artwork mis à jour`)
          console.log(`   Avant: ${track.coverArt}`)
          console.log(`   Après: ${newArtworkUrl}\n`)
          
          updated++
        }
      }
    }

    console.log(`\n🎉 Terminé! ${updated} artworks mis à jour vers la haute qualité.`)

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le script
upgradeArtworkQuality()