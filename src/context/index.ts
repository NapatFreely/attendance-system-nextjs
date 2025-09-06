import dynamic from 'next/dynamic'

export const NextAuthProvider = dynamic(() => import('./NextAuthProvider'))
