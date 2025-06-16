import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          Peak'O Music
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          DJ & Producteur Hardstyle
        </p>
        <Link 
          href="/music" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Découvrir ma musique
        </Link>
      </div>
    </div>
  )
}