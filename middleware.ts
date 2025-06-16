import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const { pathname } = req.nextUrl
  
  // Protéger les routes admin
  if (pathname.startsWith('/admin')) {
    if (!req.auth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Protéger toutes les routes admin
    '/admin/:path*',
    // Inclure les routes auth pour la gestion des sessions
    '/api/admin/:path*',
  ]
}