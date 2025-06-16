import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/oswald/400.css'
import '@fontsource/oswald/500.css'
import '@fontsource/oswald/600.css'
import '@fontsource/oswald/700.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Providers from '@/components/providers/SessionProvider'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://peako-music.com'),
  title: {
    default: "Peak'O Music - DJ & Producteur Hardstyle",
    template: "%s | Peak'O Music",
  },
  description: 'Site officiel de Peak\'O Music - DJ et producteur de musique électronique Hardstyle. Découvrez mes dernières productions, dates de concerts et actualités.',
  keywords: [
    'Peak\'O',
    'Peak\'O Music',
    'DJ Hardstyle',
    'Producteur Hardstyle',
    'Musique électronique',
    'Hard dance',
    'Festival',
    'Concert',
    'Booking DJ',
  ],
  authors: [{ name: 'Peak\'O Music' }],
  creator: 'Peak\'O',
  openGraph: {
    title: "Peak'O Music - DJ & Producteur Hardstyle",
    description: 'Site officiel de Peak\'O Music - DJ et producteur de musique électronique Hardstyle',
    url: '/',
    siteName: "Peak'O Music",
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Peak'O Music - DJ & Producteur Hardstyle",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Peak'O Music - DJ & Producteur Hardstyle",
    description: 'Découvrez mes dernières productions et dates de concerts',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  
  return (
    <html lang="fr" className="scrollbar-custom" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#DC2626" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <Providers session={session}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}