'use client'
import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import useStyles from './OpenCameraForm.style'
import { Route } from '@/types/route.type'

const OpenCameraForm = () => {
  const router = useRouter()
  const styles = useStyles()

  return (
    <Stack spacing={2}>
      <Image
        src="/photo-camera.jpg"
        alt="camera"
        width={350}
        height={350}
        priority
      />
    </Stack>
  )
}

export default OpenCameraForm
