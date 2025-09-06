'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { AttendanceSessionForm } from '@/features/attendance-session/components/AttendanceSessionForm'

const AttendnaceSession = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <AttendanceSessionForm></AttendanceSessionForm>
    </Box>
  )
}

export default AttendnaceSession
