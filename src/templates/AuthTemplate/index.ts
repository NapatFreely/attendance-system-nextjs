import dynamic from 'next/dynamic'

export const AuthTemplate = dynamic(() => import('./AuthTemplate'))
