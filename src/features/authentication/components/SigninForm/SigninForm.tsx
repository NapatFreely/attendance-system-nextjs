'use client'
import { FC, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

import useStyles from './SigninForm.style'
import { SigninFormProps, SigninParams } from './SigninForm.type'
import schema from './SigninForm.schema'
import { Route } from '@/types/route.type'
import useSignIn from '@/features/authentication/hooks/useSignIn'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { RoleEnum } from '@/features/authentication/enum/role'
import { GetSignInRequest } from '@/features/authentication/types'
import { LocalStorageKey } from '@/types/local-storage'
import { setAuthCookie } from '@/utils/set-auth-cookie/set-auth-cookie'

const SigninForm: FC<SigninFormProps> = () => {
  const router = useRouter()
  const styles = useStyles()
  const signIn = useSignIn()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })

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
  }) => {
    setModalProgress({
      isOpen: true,
      status: ModalProgressStatus.LOADING,
    })
    const request: GetSignInRequest = {
      email: email,
      password: password,
    }
    signIn.mutate(request, {
      onSuccess: async (response) => {
        const accessToken = response?.accessToken
        const role = response?.role

        if (accessToken) {
          localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, accessToken)
          localStorage.setItem(
            LocalStorageKey.ROLE,
            role === 0 ? RoleEnum.STUDENT : RoleEnum.TEACHER
          )
          await setAuthCookie(accessToken)
        }
        setModalProgress({
          isOpen: false,
          status: ModalProgressStatus.SUCCESS,
        })
        router.push(Route.HOME)
      },
      onError: () => {
        setModalProgress({
          isOpen: true,
          status: ModalProgressStatus.ERROR,
        })
      },
    })
  }

  const progressModalContent = useMemo(() => {
    switch (modalProgress.status) {
      case ModalProgressStatus.LOADING:
        return {
          title: 'Creating...',
          description: 'Please do nothing while creating.',
        }
      case ModalProgressStatus.SUCCESS:
        return {
          title: 'Success to SignIn',
          description: <Box>Success</Box>,
        }
      case ModalProgressStatus.ERROR:
        return {
          title: 'Failed to SignIn',
          description: <Stack>{signIn.error?.message}</Stack>,
        }
      default:
        return {
          title: '',
          description: '',
        }
    }
  }, [modalProgress.status])

  const handleCloseModal = () => {
    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  const handleConfirmModal = () => {
    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Log in</Typography>
        <Divider />
        <TextField
          id="email"
          label="EMAIL"
          variant="filled"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="password"
          label="Password"
          variant="filled"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Stack>
      <ModalProgress
        open={modalProgress.isOpen}
        status={modalProgress.status}
        onClose={handleCloseModal}
        title={progressModalContent.title}
        description={progressModalContent.description}
        width="360px"
        button={{
          confirm: {
            text: 'OK',
            onClick: handleConfirmModal,
            disabled: signIn.isPending,
          },
        }}
      />
    </Box>
  )
}

export default SigninForm
