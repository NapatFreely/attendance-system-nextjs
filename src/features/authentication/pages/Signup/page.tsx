'use client'

import { useState } from 'react'

import { Box, Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import useStyles from './page.style'
import { SignupForm } from '@/features/authentication/components/SignupForm'

const SignupPage = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <SignupForm></SignupForm>
    </Box>
  )
}

export default SignupPage
