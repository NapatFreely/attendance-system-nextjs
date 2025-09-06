import dynamic from 'next/dynamic'

export const HistoryPage = dynamic(() => import('./History'))
