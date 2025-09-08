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

  const redirectToCreateQrCode = () => {
    setModalProgress({
      isOpen: true,
      status: ModalProgressStatus.LOADING,
    })
    const generatedAt = new Date()
    const expiredAt = new Date(generatedAt.getTime() + 60 * 60 * 1000) // +1 hour

    const request: GetQrCodeRequest = {
      studentId: profile?.id ?? -1,
      qrValue: `${profile?.id}:name:${profile?.name}:generatedA:;${generatedAt.toISOString()}:expiredAt:${expiredAt.toISOString()}`,
      generatedAt: generatedAt.toISOString(),
      expiredAt: expiredAt.toISOString(),
    }

    createQrCode.mutate(request, {
      onSuccess: (response) => {
        setModalProgress({
          isOpen: false,
          status: ModalProgressStatus.SUCCESS,
        })
        router.push(`${Route.CREATE_QR_CODE}/${response.qrValue}`)
      },
      onError: () => {
        setModalProgress({
          isOpen: true,
          status: ModalProgressStatus.ERROR,
        })
      },
    })
  }

  const redirectToLeaveRequest = () => {
    router.push(Route.LEAVE_REQUEST)
  }

  const redirectToHistory = () => {
    router.push(Route.HISTORY)
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
          description: <Stack>{createQrCode.error?.message}</Stack>,
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
    <Stack spacing={2} sx={styles.form}>
      <Button variant="contained" onClick={redirectToCreateQrCode}>
        สร้าง QR Code
      </Button>
      <Button variant="contained" onClick={redirectToHistory}>
        ประวัติการเช็ดชื่อ
      </Button>
      <Button variant="contained" onClick={redirectToLeaveRequest}>
        แจ้งลา
      </Button>
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
            disabled: createQrCode.isPending,
          },
        }}
      />
    </Stack>
  )
}

export default SigninForm
