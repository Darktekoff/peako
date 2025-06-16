'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')

  if (isAdminPage) {
    // Pages admin : pas de header/footer
    return <>{children}</>
  }

  // Pages publiques : avec header/footer
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}