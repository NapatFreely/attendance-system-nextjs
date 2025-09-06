'use client'
import { FC } from 'react'

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
  }) => {}

  const redirectToSignIn = () => {
    router.replace(Route.Signin)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Create new Account</Typography>
        <Typography variant="body1">
          Already Registered? <Link href={Route.Signin}>Login</Link>
        </Typography>
        <TextField id="role" select label="Role" variant="filled">
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="name" label="NAME" variant="filled" />
        <TextField id="email" label="EMAIL" variant="filled" />
        <TextField
          id="password"
          label="Password"
          variant="filled"
          type="password"
        />
        <Button variant="contained" type="submit" onClick={redirectToSignIn}>
          Signup
        </Button>
      </Stack>
    </Box>
  )
}

export default SignupForm
