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
import { useParams } from 'next/navigation'
import QRCode from 'react-qr-code'

import useStyles from './CreateQrCodeForm.style'

const CreateQrCodeForm = () => {
  const { qrCode } = useParams()
  const styles = useStyles()

  return (
    <Box component="form">
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">QR Code</Typography>
        <Divider />
        <QRCode
          style={{ alignSelf: 'center' }}
          value={String(qrCode)}
          size={200}
        />
      </Stack>
    </Box>
  )
}

export default CreateQrCodeForm
