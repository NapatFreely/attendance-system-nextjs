import { LocalStorageKey } from '@/types/local-storage'

const forceLogout = () => {
  localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
}

export default forceLogout
