'use client'

import { useState } from 'react'

import { Box, Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import { LocalStorageKey } from '@/types/local-storage'

import useStyles from './page.style'
import { useRouter } from 'next/navigation'
import { Route } from '@/types/route.type'

const LOGO_IMG_URL = '/logo-web-app.png'

const LoginPage = () => {
  const styles = useStyles()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const handleKeycloakLogin = async () => {
    try {
      setIsLoading(true)
      localStorage.setItem(LocalStorageKey.SIGN_IN_SUCCESS, 'true')
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const redirectToSignin = () => {
    router.push(Route.Signin)
  }

  const redirectToSignup = () => {
    router.replace(Route.Signup)
  }

  return (
    <Box sx={styles.container}>
      <Stack direction="row" spacing={2}>
        <Stack spacing={2}>
          <Typography variant="h1">
            Smart
            <br />
            Attendance
            <br />
            System
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={redirectToSignup}>
              Sign-up
            </Button>
            <Button variant="outlined" onClick={redirectToSignin}>
              Login
            </Button>
          </Stack>
        </Stack>

        <Image
          src={LOGO_IMG_URL}
          alt="Logo"
          width={350}
          height={350}
          priority
        />
      </Stack>
    </Box>
  )
}

export default LoginPage
