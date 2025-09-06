'use client'

import { Button, Stack } from '@mui/material'
import useStyles from './StudentMenu.style'
import { useRouter } from 'next/navigation'
import { Route } from '@/types/route.type'

const SigninForm = () => {
  const router = useRouter()
  const styles = useStyles()

  const redirectToCreateQrCode = () => {
    router.push(Route.CREATE_QR_CODE)
  }

  const redirectToLeaveRequest = () => {
    router.push(Route.LEAVE_REQUEST)
  }

  return (
    <Stack spacing={2} sx={styles.form}>
      <Button variant="contained" onClick={redirectToCreateQrCode}>
        สร้าง QR Code
      </Button>
      <Button variant="contained">ประวัติการเช็ดชื่อ</Button>
      <Button variant="contained" onClick={redirectToLeaveRequest}>
        แจ้งลา
      </Button>
    </Stack>
  )
}

export default SigninForm
