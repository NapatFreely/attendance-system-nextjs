import React, { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import { Route } from '@/types/route.type'
import { Box, Stack, Typography } from '@mui/material'
import { LocalStorageKey } from '@/types/local-storage'
import forceLogout from '@/utils/force-logout'

export const dynamic = 'force-dynamic'
const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'end',
          background: '#FF6600',
          padding: '16px',
          color: 'white',
        }}
      >
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Typography sx={{ minWidth: 100 }}>Logout</Typography>
      </Box>
      {children}
    </Stack>
  )
}

export default Layout
