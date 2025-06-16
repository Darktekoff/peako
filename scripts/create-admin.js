const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  const email = 'admin@peako-music.com'
  const password = 'Admin123!'
  const name = 'Peak\'O Admin'

  try {
    // Vérifier si l'admin existe déjà
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    })

    if (existingAdmin) {
      console.log('✅ L\'administrateur existe déjà avec l\'email:', email)
      return
    }

    // Hasher le mot de passe
    const hashedPassword = await hash(password, 12)

    // Créer l'utilisateur admin
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    })

    console.log('✅ Administrateur créé avec succès!')
    console.log('📧 Email:', email)
    console.log('🔑 Mot de passe:', password)
    console.log('⚠️  Changez ce mot de passe après la première connexion!')
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'administrateur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le script
createAdmin()