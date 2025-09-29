'use client'

import { Box, Button, Stack } from '@mui/material'
import useStyles from './StudentMenu.style'
import { useRouter } from 'next/navigation'
import { Route } from '@/types/route.type'
import { useCreateQrCode } from '@/features/create-qr-code/hooks'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'
import { GetQrCodeRequest } from '@/features/create-qr-code/types'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { useMemo, useState } from 'react'

const SigninForm = () => {
  const router = useRouter()
  const styles = useStyles()
  const createQrCode = useCreateQrCode()
  const { profile } = useProfile()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })

  const redirectToSelectLocation = () => {
    router.push(Route.SELECT_LOCATION)
  }

  const redirectToLeaveRequest = () => {
    router.push(Route.LEAVE_REQUEST)
  }

  const redirectToHistory = () => {
    router.push(Route.HISTORY)
  }

  return (
    <Stack spacing={2} sx={styles.form}>
      <Button variant="contained" onClick={redirectToSelectLocation}>
        สร้าง QR Code
      </Button>
      <Button variant="contained" onClick={redirectToHistory}>
        ประวัติการเช็ดชื่อ
      </Button>
      <Button variant="contained" onClick={redirectToLeaveRequest}>
        แจ้งลา
      </Button>
    </Stack>
  )
}

export default SigninForm
