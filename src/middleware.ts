import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Route } from './types/route.type'
import { LocalStorageKey } from './types/local-storage'

export function middleware(req: NextRequest) {
  const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
  const token = req.cookies.get('accessToken')?.value

  if ((!token || !accessToken) && req.nextUrl.pathname !== Route.LOGIN) {
    return NextResponse.redirect(new URL(Route.LOGIN, req.url))
  }

  return NextResponse.next()
}
