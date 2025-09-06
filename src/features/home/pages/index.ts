import dynamic from 'next/dynamic'

export const HomePage = dynamic(() => import('./Home'))
