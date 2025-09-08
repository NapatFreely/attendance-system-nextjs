import dynamic from 'next/dynamic'

export const CoursePage = dynamic(() => import('./Course'))
