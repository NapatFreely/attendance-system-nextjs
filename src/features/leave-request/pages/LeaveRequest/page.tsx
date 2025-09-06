'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { LeaveRequestForm } from '@/features/leave-request/components/LeaveRequestForm'

const LeaveRequest = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <LeaveRequestForm></LeaveRequestForm>
    </Box>
  )
}

export default LeaveRequest
