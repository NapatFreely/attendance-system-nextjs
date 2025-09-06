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

import useStyles from './CreateQrCodeForm.style'
import { Route } from '@/types/route.type'
import { SubmitHandler, useForm } from 'react-hook-form'
import schema from './CreateQrCodeForm.schema'
import { CreateQrCodeFormParams } from './CreateQrCodeForm.type'

const CreateQrCodeForm = () => {
  const router = useRouter()
  const styles = useStyles()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateQrCodeFormParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<CreateQrCodeFormParams> = async ({
    studentId,
    name,
  }) => {}

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">QR Code</Typography>
        <Divider />
        <TextField id="studentId" label="STUDENT ID" variant="filled" />
        <TextField id="name" label="NAME" variant="filled" />
        <Button
          variant="contained"
          // type="submit"
          onClick={() => router.push(Route.OPEN_CAMERA)}
        >
          Submit Qr Code
        </Button>
      </Stack>
    </Box>
  )
}

export default CreateQrCodeForm
