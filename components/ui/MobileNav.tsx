'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Youtube, Music2, Disc3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navigation: Array<{ name: string; href: string }>
}

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { name: 'SoundCloud', href: 'https://soundcloud.com', icon: Music2 },
  { name: 'Spotify', href: 'https://spotify.com', icon: Disc3 },
]

export default function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  const pathname = usePathname()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b">
                <h2 className="text-2xl font-display font-bold">
                  <span className="text-primary">Peak'</span>O
                </h2>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6">
                <ul className="space-y-4">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'block py-3 text-lg font-medium transition-colors',
                            isActive
                              ? 'text-primary'
                              : 'text-foreground hover:text-primary'
                          )}
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="btn-primary w-full text-center"
                  >
                    Booking
                  </Link>
                </motion.div>
              </nav>

              {/* Social Links */}
              <div className="p-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">Suivez-moi</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}