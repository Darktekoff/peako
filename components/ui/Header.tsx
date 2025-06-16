'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Menu, X, LogIn, User } from 'lucide-react'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { name: 'Musique', href: '/music' },
  { name: 'Événements', href: '/events' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdminPage = pathname.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAdminPage
            ? 'bg-black/95 backdrop-blur-md shadow-lg'
            : isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <img 
                src="/images/Sans titre (1024 x 800 px) (840 x 140 px).png" 
                alt="Peak'O Music"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`relative font-medium transition-colors duration-300 hover:text-orange-400 ${
                        isActive ? 'text-orange-400' : isScrolled ? 'text-white' : 'text-white'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* CTA Buttons Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {session ? (
                <Link 
                  href="/admin" 
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded-lg transition-colors"
                >
                  <User size={18} className="mr-2" />
                  Admin
                </Link>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                >
                  <LogIn size={18} className="mr-2" />
                  Connexion
                </Link>
              )}
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-colors"
              >
                Booking
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled ? "text-white hover:bg-gray-800" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gray-900 shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive 
                              ? 'bg-orange-600 text-white' 
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-8 space-y-3">
                  {session ? (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center font-medium border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded-lg transition-colors"
                    >
                      <User size={18} className="inline mr-2" />
                      Admin
                    </Link>
                  ) : (
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center font-medium border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg transition-colors"
                    >
                      <LogIn size={18} className="inline mr-2" />
                      Connexion
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center font-medium bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-colors"
                  >
                    Demande de booking
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}