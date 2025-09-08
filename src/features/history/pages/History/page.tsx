'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { HistoryTable } from '@/features/history/components/HistoryTable'
import { HistorySidebar } from '@/features/history/components/HistorySidebar'
import { useState } from 'react'
import { GetAttendanceSessionResponse } from '@/features/attendance-session/types'

const History = () => {
  const styles = useStyles()
  const [history, setHistory] = useState<GetAttendanceSessionResponse>()

  return (
    <Box sx={styles.container}>
      <HistorySidebar
        onSelect={(history) => {
          setHistory(history)
        }}
      ></HistorySidebar>
      <HistoryTable key={history?.id} history={history}></HistoryTable>
    </Box>
  )
}

export default History
