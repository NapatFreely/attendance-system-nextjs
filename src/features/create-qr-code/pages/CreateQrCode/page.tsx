'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { CreateQrCodeForm } from '@/features/create-qr-code/components/CreateQrCodeForm'

const CreateQrCode = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <CreateQrCodeForm></CreateQrCodeForm>
    </Box>
  )
}

export default CreateQrCode
