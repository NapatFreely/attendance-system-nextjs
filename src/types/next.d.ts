import { Session } from 'next-auth'

declare module 'next/server' {
  interface NextRequest {
    user?: Session['user']
  }
}
