'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Button, Divider, Stack, Typography } from '@mui/material'

import useStyles from './SelectLocationForm.style'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { useRouter } from 'next/navigation'
import { Route } from '@/types/route.type'
import { GetQrCodeRequest } from '../../types'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'
import { useCreateQrCode } from '../../hooks'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const CreateQrCodeForm = () => {
  const styles = useStyles()
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  )
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const createQrCode = useCreateQrCode()
  const { profile } = useProfile()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAqyETt9iu7l5QioWz5iwEbzrallQrpzLs',
  })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log('Checking Locaiton')

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
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 10000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  const redirectToSelectLocation = () => {
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
      lat: `${location?.lat ?? 0}`,
      lon: `${location?.lon ?? 0}`,
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
        })
        router.push(`${Route.CREATE_QR_CODE}${response.qrValue}`)
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
          title: 'Success',
          description: <Box>Success</Box>,
        }
      case ModalProgressStatus.ERROR:
        return {
          title: 'Failed',
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

  const onLoad = (map: google.maps.Map) => {
    console.log(location)

    const bounds = new window.google.maps.LatLngBounds({
      lat: location?.lat ?? 0,
      lng: location?.lon ?? 0,
    })
    map.fitBounds(bounds)
    setMap(map)
  }

  const onUnmount = (map: google.maps.Map) => {
    setMap(null)
  }

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setLocation({
        lat: event.latLng.lat(),
        lon: event.latLng.lng(),
      })
    }
  }, [])

  return (
    <Box component="form">
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Select Location</Typography>
        <Divider />
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{
              width: 750,
              height: 600,
            }}
            center={{
              lat: location?.lat ?? 0,
              lng: location?.lon ?? 0,
            }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
          >
            {location && (
              <Marker
                position={{
                  lat: location?.lat ?? 0,
                  lng: location?.lon ?? 0,
                }}
                title="You are here"
              />
            )}
          </GoogleMap>
        ) : (
          <></>
        )}
        <Button variant="contained" onClick={redirectToSelectLocation}>
          Confirm
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
            disabled: createQrCode.isPending,
          },
        }}
      />
    </Box>
  )
}

export default CreateQrCodeForm
