'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { SigninForm } from '@/features/authentication/components/SigninForm'

const SigninPage = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <SigninForm></SigninForm>
    </Box>
  )
}

export default SigninPage
