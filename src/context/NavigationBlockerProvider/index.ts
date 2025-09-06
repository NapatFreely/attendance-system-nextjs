import dynamic from 'next/dynamic'

export const NavigationBlockerProvider = dynamic(
  () => import('./NavigationBlockerProvider')
)

export * from './NavigationBlockerProvider'
