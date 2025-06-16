import Link from 'next/link'
import { Instagram, Youtube, Music2, Disc3, Mail, MapPin, Phone } from 'lucide-react'

const navigation = {
  main: [
    { name: 'À propos', href: '/about' },
    { name: 'Musique', href: '/music' },
    { name: 'Événements', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
  ],
}

const social = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { name: 'SoundCloud', href: 'https://soundcloud.com', icon: Music2 },
  { name: 'Spotify', href: 'https://spotify.com', icon: Disc3 },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-border/10">
      <div className="container-section py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-display font-bold">
                <span className="text-primary">Peak'</span>
                <span className="text-white">O</span>
              </h3>
            </Link>
            <p className="text-gray-400 text-sm">
              DJ & Producteur Hardstyle. Créateur d'émotions intenses et de moments inoubliables sur scène.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact@peako-music.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  contact@peako-music.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="mt-0.5" />
                <span>France</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Suivez-moi</h4>
            <div className="flex gap-3">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all hover:scale-110"
                  aria-label={item.name}
                >
                  <item.icon size={20} />
                </a>
              ))}
            </div>
            <Link
              href="/contact"
              className="btn-primary mt-6 inline-block"
            >
              Booking
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Peak'O Music. Tous droits réservés.
            </p>
            <ul className="flex gap-6 text-sm">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}