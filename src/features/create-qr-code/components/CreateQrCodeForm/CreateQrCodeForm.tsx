'use client'
import { FC, useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import QRCode from 'react-qr-code'

import useStyles from './CreateQrCodeForm.style'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'
import { useCreateQrCode } from '../../hooks'
import { GetQrCodeRequest } from '../../types'
import { useRouter } from 'next/navigation'
import { Route } from '@/types/route.type'

const CreateQrCodeForm = () => {
  const searchParams = useSearchParams()
  const styles = useStyles()
  const router = useRouter()
  const createQrCode = useCreateQrCode()
  const { profile } = useProfile()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })
  const [timeLeft, setTimeLeft] = useState('')
  const [isExpired, setIsExpired] = useState(false)

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const generatedAt = searchParams.get('generatedAt')
  const expiredAt = searchParams.get('expiredAt')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  useEffect(() => {
    if (!expiredAt) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = new Date(expiredAt).getTime() - now

      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft('Expired')
        setIsExpired(true) // mark expired
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeLeft(`${minutes}:${seconds}`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiredAt])

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

  const generateQRCode = () => {
    setModalProgress({
      isOpen: true,
      status: ModalProgressStatus.LOADING,
    })
    const generatedAt = new Date()
    const expiredAt = new Date(generatedAt.getTime() + 15 * 60 * 1000)

    const params = new URLSearchParams({
      id: profile?.id?.toString() ?? '',
      name: profile?.name ?? '',
      generatedAt: generatedAt.toISOString(),
      expiredAt: expiredAt.toISOString(),
      lat: `${lat}`,
      lon: `${lon}`,
    })

    const request: GetQrCodeRequest = {
      studentId: profile?.id ?? -1,
      qrValue: `?${params.toString()}`,
      generatedAt: generatedAt.toISOString(),
      expiredAt: expiredAt.toISOString(),
    }

    createQrCode.mutate(request, {
      onSuccess: (response) => {
        setModalProgress({
          isOpen: false,
          status: ModalProgressStatus.SUCCESS,
        })
        setTimeLeft('')
        setIsExpired(false)
        router.replace(`${Route.CREATE_QR_CODE}${response.qrValue}`)
      },
      onError: () => {
        setModalProgress({
          isOpen: true,
          status: ModalProgressStatus.ERROR,
        })
      },
    })
  }

  return (
    <Box component="form">
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">QR Code</Typography>
        <Divider />
        <QRCode
          style={{ alignSelf: 'center' }}
          value={String(
            `?id=${id}&name=${name}&generatedAt=${generatedAt}&expiredAt=${expiredAt}&lat=${lat}&lon=${lon}`
          )}
          size={200}
        />
        {!isExpired && (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {timeLeft}
          </Typography>
        )}
        {isExpired && (
          <Button
            variant="contained"
            color="primary"
            onClick={generateQRCode}
            sx={{ alignSelf: 'center' }}
          >
            Generate New QR Code
          </Button>
        )}
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
            disabled: createQrCode.isPending,
          },
        }}
      />
    </Box>
  )
}

export default CreateQrCodeForm
