'use server'

import { cookies } from 'next/headers'

export async function setAuthCookie(token: string) {
  ;(await cookies()).set('accessToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  })
}
