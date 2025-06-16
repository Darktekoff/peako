'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function SignOut() {
  const router = useRouter()

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirect: false })
      router.push('/')
    }

    // Auto-signout après 2 secondes
    const timer = setTimeout(handleSignOut, 2000)
    
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
          <div className="mx-auto h-12 w-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <LogOut className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Déconnexion</h2>
          <p className="text-gray-400 mb-6">Vous êtes en train d'être déconnecté...</p>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => router.push('/')}
              className="text-red-400 hover:text-red-300 text-sm underline"
            >
              Retourner à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}