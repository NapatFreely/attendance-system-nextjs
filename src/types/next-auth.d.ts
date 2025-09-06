import { DefaultSession } from 'next-auth'

import { Permission } from './permission.type'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Oauth access token */
      accessToken?: accessToken
      permissions: Permission[]
      roles: string[]
    } & DefaultSession['user']
    error?: string
  }

  interface Profile {
    roles: string[]
    groups: string[]
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name: string
    email: string
    sub: string
    name: string
    email: string
    sub: string
    accessToken: string
    refreshToken: string
    accessTokenExpired: number
    refreshTokenExpired: number
    user: User
    error: string
  }
}
