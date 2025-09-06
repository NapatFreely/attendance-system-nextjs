'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { HistoryTable } from '@/features/history/components/HistoryTable'
import { HistorySidebar } from '@/features/history/components/HistorySidebar'
import { useState } from 'react'
import type { History } from '@/features/history/types'

const History = () => {
  const styles = useStyles()
  const [history, setHistory] = useState<History>()

  return (
    <Box sx={styles.container}>
      <HistorySidebar
        onSelect={(history) => {
          setHistory(history)
        }}
      ></HistorySidebar>
      <HistoryTable history={history}></HistoryTable>
    </Box>
  )
}

export default History
