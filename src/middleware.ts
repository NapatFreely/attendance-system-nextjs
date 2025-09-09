import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Route } from './types/route.type'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value

  if (
    !token &&
    req.nextUrl.pathname !== Route.LOGIN &&
    req.nextUrl.pathname !== Route.Signin &&
    req.nextUrl.pathname !== Route.Signup &&
    req.nextUrl.pathname !== '/qr-scan'
  ) {
    return NextResponse.redirect(new URL(Route.LOGIN, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protect all routes except these
    '/((?!api|login|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
