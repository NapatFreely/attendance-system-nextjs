'use client'
import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import useStyles from './HistorySidebar.style'
import { Route } from '@/types/route.type'
import { GetHistoryResponse, History } from '@/features/history/types'
import useCompose from './HistorySidebar.compose'

interface HistorySidebarProps {
  onSelect: (history: History) => void
}

const mockData: GetHistoryResponse = {
  data: [
    {
      id: 1,
      courseId: 'Test',
      courseName: 'Test',
      sessionId: 'Test',
      sessionDate: 'Test',
    },
    {
      id: 2,
      courseId: 'Test1',
      courseName: 'Test1',
      sessionId: 'Test1',
      sessionDate: 'Test1',
    },
    {
      id: 3,
      courseId: 'Test3',
      courseName: 'Test3',
      sessionId: 'Test3',
      sessionDate: 'Test3',
    },
    {
      id: 4,
      courseId: 'Test4',
      courseName: 'Test4',
      sessionId: 'Test4',
      sessionDate: 'Test4',
    },
    {
      id: 5,
      courseId: 'Test5',
      courseName: 'Test5',
      sessionId: 'Test5',
      sessionDate: 'Test5',
    },
    {
      id: 6,
      courseId: 'Test6',
      courseName: 'Test6',
      sessionId: 'Test6',
      sessionDate: 'Test6',
    },
    {
      id: 7,
      courseId: 'Test7',
      courseName: 'Test7',
      sessionId: 'Test7',
      sessionDate: 'Test7',
    },
  ] as History[],
}

const HistorySidebar: FC<HistorySidebarProps> = ({ onSelect }) => {
  const router = useRouter()
  const styles = useStyles()
  const compose = useCompose()
  const [id, setId] = useState<number>()

  const CardDetail = (history: History) => {
    return (
      <>
        <CardContent>
          <Typography variant="body1">
            {history.courseId} {history.courseName}
          </Typography>
          <Typography variant="body1">{history.sessionDate}</Typography>
          <Typography variant="body1">
            SESSION ID: {history.sessionId}
          </Typography>
        </CardContent>
      </>
    )
  }

  return (
    <Box sx={styles.sidebar}>
      <Stack spacing={1}>
        {mockData.data.map((item: History) => (
          <Card
            key={item.id}
            variant="outlined"
            sx={compose.card[id === item.id ? 'active' : 'inactive']}
            onClick={() => {
              onSelect(item)
              setId(item.id)
            }}
          >
            <CardDetail
              id={item.id}
              courseId={item.courseId}
              courseName={item.courseName}
              sessionId={item.sessionId}
              sessionDate={item.sessionDate}
            />
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default HistorySidebar
