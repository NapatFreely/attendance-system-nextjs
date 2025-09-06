'use client'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

import { useIsRequireConfirmation } from '@/hooks'

// Since useRouter in app dir remove events need to workaround follow https://github.com/vercel/next.js/discussions/41934#discussioncomment-8996669

export const NavigationBlockerContext = createContext<
  [
    isRequireConfirmation: boolean,
    setIsBlocked: Dispatch<SetStateAction<boolean>>,
  ]
>([false, () => {}])

export const BlockBrowserNavigation = () => {
  const isRequireConfirmation = useIsRequireConfirmation()

  useEffect(() => {
    if (isRequireConfirmation) {
      const showModal = (event: BeforeUnloadEvent) => {
        event.preventDefault()
      }

      window.addEventListener('beforeunload', showModal)
      return () => {
        window.removeEventListener('beforeunload', showModal)
      }
    }
  }, [isRequireConfirmation])

  return null
}

const NavigationBlockerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isBlocked, setIsBlock] = useState(false)

  return (
    <NavigationBlockerContext.Provider value={[isBlocked, setIsBlock]}>
      {children}
    </NavigationBlockerContext.Provider>
  )
}

export default NavigationBlockerProvider
