import { useContext } from 'react'

import { NavigationBlockerContext } from '@/context/NavigationBlockerProvider'

const useIsRequireConfirmation = () => {
  const [isRequireConfirmation] = useContext(NavigationBlockerContext)

  return isRequireConfirmation
}

export default useIsRequireConfirmation
