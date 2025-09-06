import React, { ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'

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
