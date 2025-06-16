const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3')
require('dotenv').config()

console.log('🧪 Test de connexion Cloudflare R2...\n')

// Configuration du client R2
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

const bucketName = process.env.R2_BUCKET_NAME
const testFileName = 'test-file.txt'
const testContent = `Test file created at ${new Date().toISOString()}\nCloudflare R2 connection successful! 🚀`

async function testR2Connection() {
  try {
    console.log('📋 Configuration:')
    console.log(`   Account ID: ${process.env.R2_ACCOUNT_ID}`)
    console.log(`   Bucket: ${bucketName}`)
    console.log(`   Endpoint: https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`)
    console.log('')

    // Test 1: Lister les objets du bucket
    console.log('1️⃣ Test: Lister les objets du bucket...')
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 5
    })
    
    const listResult = await r2Client.send(listCommand)
    console.log(`   ✅ Connexion OK! Objets trouvés: ${listResult.KeyCount || 0}`)
    
    if (listResult.Contents && listResult.Contents.length > 0) {
      console.log('   📁 Fichiers existants:')
      listResult.Contents.forEach(obj => {
        console.log(`      - ${obj.Key} (${obj.Size} bytes)`)
      })
    }
    console.log('')

    // Test 2: Upload d'un fichier de test
    console.log('2️⃣ Test: Upload d\'un fichier de test...')
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: testFileName,
      Body: testContent,
      ContentType: 'text/plain',
    })
    
    await r2Client.send(putCommand)
    console.log(`   ✅ Upload réussi: ${testFileName}`)
    console.log('')

    // Test 3: Lecture du fichier uploadé
    console.log('3️⃣ Test: Lecture du fichier uploadé...')
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: testFileName,
    })
    
    const getResult = await r2Client.send(getCommand)
    const fileContent = await getResult.Body.transformToString()
    console.log(`   ✅ Lecture réussie! Contenu:`)
    console.log(`   "${fileContent.substring(0, 50)}..."`)
    console.log('')

    // Test 4: Suppression du fichier de test
    console.log('4️⃣ Test: Suppression du fichier de test...')
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: testFileName,
    })
    
    await r2Client.send(deleteCommand)
    console.log(`   ✅ Suppression réussie: ${testFileName}`)
    console.log('')

    // Résumé final
    console.log('🎉 TOUS LES TESTS RÉUSSIS!')
    console.log('✅ Cloudflare R2 est correctement configuré')
    console.log('✅ Upload/Download/Delete fonctionnent')
    console.log('✅ Prêt pour l\'interface d\'administration')
    console.log('')
    console.log('🔗 Vérifiez votre dashboard Cloudflare R2:')
    console.log(`   https://dash.cloudflare.com/${process.env.R2_ACCOUNT_ID}/r2/overview`)

  } catch (error) {
    console.log('❌ ERREUR lors du test R2:')
    console.error('   Détails:', error.message)
    console.log('')
    console.log('🔧 Vérifications à faire:')
    console.log('   - Account ID correct?')
    console.log('   - Access Key ID et Secret corrects?')
    console.log('   - Bucket "peako" existe?')
    console.log('   - Permissions du token R2 suffisantes?')
    
    process.exit(1)
  }
}

// Vérifier les variables d'environnement
const requiredVars = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME']
const missingVars = requiredVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.log('❌ Variables d\'environnement manquantes:')
  missingVars.forEach(varName => console.log(`   - ${varName}`))
  console.log('\n🔧 Vérifiez votre fichier .env')
  process.exit(1)
}

// Lancer le test
testR2Connection()