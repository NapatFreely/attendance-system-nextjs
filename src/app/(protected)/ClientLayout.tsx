// app/(protected)/ClientLayout.tsx
'use client'

import React, { ReactNode } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import {
  ProfileProvider,
  useProfile,
} from '@/features/authentication/layout/ProfileProvider'
import { LocalStorageKey } from '@/types/local-storage'
import { redirect } from 'next/navigation'
import { Route } from '@/types/route.type'

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProfileProvider>
      <ProtectedContent>{children}</ProtectedContent>
    </ProfileProvider>
  )
}

const ProtectedContent = ({ children }: { children: ReactNode }) => {
  const { profile } = useProfile()

  const handleLogout = () => {
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
    redirect(Route.LOGIN)
  }

  const redirectToHome = () => {
    redirect(Route.HOME)
  }

  if (!profile) return <div>Loading...</div>

  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          background: '#FF6600',
          padding: '16px',
          color: 'white',
          gap: '16px',
        }}
      >
        <Typography sx={{ minWidth: 100 }}>
          {profile.name}
          {profile.studentCode && ` : (${profile.studentCode})`}
        </Typography>
        <Button
          sx={{ minWidth: 100 }}
          variant="contained"
          onClick={redirectToHome}
        >
          Home
        </Button>
        <Button
          sx={{ minWidth: 100 }}
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      {children}
    </Stack>
  )
}

export default ClientLayout
