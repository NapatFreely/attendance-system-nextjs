'use client'

import { Button, IconButton, Snackbar, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useZxing } from 'react-zxing'
import { Close24 } from '@/assets/icons'
import { useSearchParams } from 'next/navigation'
import { useCreateAttendanceRecord } from '@/features/history/hooks'
import { GetAttendanceRecordRequest } from '@/features/history/types'

const OpenCameraForm = () => {
  const searchParams = useSearchParams()
  const [deviceId, setDeviceId] = useState<string>()
  const [hasCamera, setHasCamera] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const createAttendanceRecord = useCreateAttendanceRecord()

  const courseId = searchParams.get('courseId')
  const sessionId = searchParams.get('sessionId')

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  const { ref } = useZxing({
    deviceId,
    timeBetweenDecodingAttempts: 600,
    paused: !deviceId,
    onDecodeResult(result) {
      console.log('QR Code:', result)
      const searchParams = new URLSearchParams(
        result.getText().startsWith('?')
          ? result.getText().slice(1)
          : result.getText()
      )

      const id = searchParams.get('id')
      const name = searchParams.get('name')
      const expiredAt = searchParams.get('expiredAt')

      if (!expiredAt) return

      const _expiredAt = new Date(expiredAt)
      const now = new Date()

      // Or convert to an object
      const request: GetAttendanceRecordRequest = {
        sessionId: Number(sessionId ?? '-1'),
        courseId: Number(courseId ?? '-1'),
        studentId: Number(id ?? '-1'),
        status: now > _expiredAt ? 1 : 0,
        checkInTime: new Date().toISOString(),
        reason: '',
        requestedAt: new Date().toISOString(),
        attachmentUrl: '',
      }
      createAttendanceRecord.mutate(request, {
        onSuccess: () => {
          setMessage(`${id} ${name} Check-in`)
          setOpen(true)
        },
        onError: (error) => {
          setMessage(error.message)
          setOpen(true)
        },
      })
    },
    onError(error) {
      console.error('ZXing error:', error)
    },
  })

  // Only run on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Detect available video devices and pick camera
  useEffect(() => {
    if (!isClient) return

    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((d) => d.kind === 'videoinput')
        setHasCamera(videoDevices.length > 0)

        if (videoDevices.length === 0) return

        let selected: string

        if (isMobile) {
          // Pick back camera
          const backCamera = videoDevices.find((d) =>
            /back|rear|environment/i.test(d.label)
          )
          selected = backCamera?.deviceId ?? videoDevices[0].deviceId
        } else {
          // Pick front camera
          const frontCamera = videoDevices.find((d) =>
            /front|user/i.test(d.label)
          )
          selected = frontCamera?.deviceId ?? videoDevices[0].deviceId
        }

        setDeviceId(selected)
        console.log('Selected camera:', selected)
        console.log('All video devices:', videoDevices)
      })
      .catch((err) => {
        setHasCamera(false)
        console.error('Camera enumeration error:', err)
      })
  }, [isClient, isMobile])

  if (!isClient) return null

  const handleClose = () => {
    setOpen(false)
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close24 fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <Stack spacing={2} className="camera-container">
      {hasCamera ? (
        <video
          ref={ref}
          className="camera"
          autoPlay
          playsInline
          muted
          style={{ width: '100vw', height: '100vh', borderRadius: 12 }}
        />
      ) : (
        <Typography color="error">
          No camera found or access denied. Please check your browser
          permissions.
        </Typography>
      )}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </Stack>
  )
}

export default OpenCameraForm
