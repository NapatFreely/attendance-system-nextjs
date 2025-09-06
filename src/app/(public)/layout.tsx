import React from 'react'

import { AuthTemplate } from '@/templates'
import { LocalStorageKey } from '@/types/local-storage'
import forceLogout from '@/utils/force-logout'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <AuthTemplate>{children}</AuthTemplate>
}

export default Layout
