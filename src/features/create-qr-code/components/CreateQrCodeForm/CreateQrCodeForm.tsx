'use client'
import { FC } from 'react'

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

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const generatedAt = searchParams.get('generatedAt')
  const expiredAt = searchParams.get('expiredAt')

  return (
    <Box component="form">
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">QR Code</Typography>
        <Divider />
        <QRCode
          style={{ alignSelf: 'center' }}
          value={String(
            `?id=${id}&name=${name}&generatedAt=${generatedAt}&expiredAt=${expiredAt}`
          )}
          size={200}
        />
      </Stack>
    </Box>
  )
}

export default CreateQrCodeForm
