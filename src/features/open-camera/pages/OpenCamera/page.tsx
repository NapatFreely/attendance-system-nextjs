'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { OpenCameraForm } from '@/features/open-camera/components/OpenCameraForm'

const OpenCameraPage = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <OpenCameraForm></OpenCameraForm>
    </Box>
  )
}

export default OpenCameraPage
