'use client'
import { FC, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

import useStyles from './SignupForm.style'
import { SignupFormProps, SignupParams } from './SignupForm.type'
import schema from './SignupForm.schema'
import { RoleEnum } from '@/features/authentication/enum/role'
import Link from 'next/link'
import { Route } from '@/types/route.type'
import { useSignUp } from '@/features/authentication/hooks'
import { GetSignUpRequest } from '../../types'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'

const roles = [
  {
    value: RoleEnum.STUDENT,
    label: 'Student',
  },
  {
    value: RoleEnum.TEACHER,
    label: 'Teacher',
  },
]

const SignupForm: FC<SignupFormProps> = () => {
  const router = useRouter()
  const styles = useStyles()
  const [role, setRole] = useState<RoleEnum>()
  const signUp = useSignUp()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<SignupParams> = async ({
    email,
    password,
    name,
    role,
    department,
    studentCode,
  }) => {
    setModalProgress({
      isOpen: true,
      status: ModalProgressStatus.LOADING,
    })
    const request: GetSignUpRequest = {
      name: name,
      email: email,
      role: role === RoleEnum.STUDENT ? 0 : 1,
      password: password,
      studentCode: studentCode,
      department: department,
    }
    signUp.mutate(request, {
      onSuccess: () => {
        setModalProgress({
          isOpen: true,
          status: ModalProgressStatus.SUCCESS,
        })
      },
      onError: () => {
        setModalProgress({
          isOpen: true,
          status: ModalProgressStatus.ERROR,
        })
      },
    })
  }

  const StudentForm = () => {
    return (
      <>
        <TextField
          id="studentCode"
          label="STUDENT CODE"
          variant="filled"
          {...register('studentCode')}
          error={!!errors.studentCode}
          helperText={errors.studentCode?.message}
        />
        <TextField
          id="department"
          label="DEPARTMENT"
          variant="filled"
          {...register('department')}
          error={!!errors.department}
          helperText={errors.department?.message}
        />
      </>
    )
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
          title: 'Success to Signup',
          description: <Box>Success</Box>,
        }
      case ModalProgressStatus.ERROR:
        return {
          title: 'Failed to SignUp',
          description: <Stack>{signUp.error?.message}</Stack>,
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
    if (signUp.isSuccess) {
      router.push(Route.Signin)
    }

    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Create new Account</Typography>
        <Typography variant="body1">
          Already Registered? <Link href={Route.Signin}>Login</Link>
        </Typography>
        <TextField
          id="role"
          select
          label="Role"
          value={role}
          variant="filled"
          {...register('role')}
          error={!!errors.role}
          helperText={errors.role?.message}
          onChange={(e) => setRole(e.target.value as RoleEnum)}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="name"
          label="NAME"
          variant="filled"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        {role === RoleEnum.STUDENT && <StudentForm />}
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
          Signup
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
            disabled: signUp.isPending,
          },
        }}
      />
    </Box>
  )
}

export default SignupForm
