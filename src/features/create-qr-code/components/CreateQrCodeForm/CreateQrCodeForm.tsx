'use client'
import { FC, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useParams, useSearchParams } from 'next/navigation'
import QRCode from 'react-qr-code'

import useStyles from './CreateQrCodeForm.style'

const CreateQrCodeForm = () => {
  const searchParams = useSearchParams()
  const styles = useStyles()
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const generatedAt = searchParams.get('generatedAt')
  const expiredAt = searchParams.get('expiredAt')

  // useEffect(() => {
  //   if (!('geolocation' in navigator)) {
  //     setError('Geolocation is not supported by your browser.')
  //     return
  //   }

  //   // function to fetch location
  //   const getLocation = () => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation({
  //           lat: position.coords.latitude,
  //           lon: position.coords.longitude,
  //         })
  //       },
  //       (err) => {
  //         setError(err.message)
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 10000,
  //         maximumAge: 0,
  //       }
  //     )
  //   }

  //   // get location immediately
  //   getLocation()

  //   // repeat every 5 seconds
  //   const interval = setInterval(getLocation, 5000)

  //   // cleanup
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
        setError(null)
      },
      (err) => {
        setError(err.message) // e.g., kCLErrorLocationUnknown
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return (
    <Box component="form">
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">QR Code</Typography>
        <Divider />
        <QRCode
          style={{ alignSelf: 'center' }}
          value={String(
            `?id=${id}&name=${name}&generatedAt=${generatedAt}&expiredAt=${expiredAt}&lat=${location?.lat}&lon=${location?.lon}`
          )}
          size={200}
        />
      </Stack>
    </Box>
  )
}

export default CreateQrCodeForm
