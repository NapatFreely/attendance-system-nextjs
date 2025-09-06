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
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'

import useStyles from './SigninForm.style'
import { SigninFormProps, SigninParams } from './SigninForm.type'
import schema from './SigninForm.schema'
import { Route } from '@/types/route.type'

const SigninForm: FC<SigninFormProps> = () => {
  const router = useRouter()
  const styles = useStyles()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<SigninParams> = async ({
    email,
    password,
  }) => {}

  const redirectToHome = () => {
    router.replace(Route.HOME)
  }
  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Log in</Typography>
        <Divider />
        <TextField id="email" label="EMAIL" variant="filled" />
        <TextField
          id="password"
          label="Password"
          variant="filled"
          type="password"
        />
        <Button variant="contained" type="submit" onClick={redirectToHome}>
          Login
        </Button>
      </Stack>
    </Box>
  )
}

export default SigninForm
