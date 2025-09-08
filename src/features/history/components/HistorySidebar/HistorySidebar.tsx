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
import useCompose from './HistorySidebar.compose'
import { GetAttendanceSessionResponse } from '@/features/attendance-session/types'
import { useGetAttendanceSession } from '@/features/attendance-session/hooks'
import { convertToFullDateTime } from '@/utils/date-time'

interface HistorySidebarProps {
  onSelect: (history: GetAttendanceSessionResponse) => void
}

type CardDetailProps = {
  history: GetAttendanceSessionResponse
}

const HistorySidebar: FC<HistorySidebarProps> = ({ onSelect }) => {
  const router = useRouter()
  const styles = useStyles()
  const compose = useCompose()
  const [id, setId] = useState<number>()
  const { data } = useGetAttendanceSession()

  const CardDetail = ({ history }: CardDetailProps) => {
    return (
      <>
        <CardContent>
          <Typography variant="body1">
            {history.course.courseCode} {history.course.courseName}
          </Typography>
          <Typography variant="body1">
            {convertToFullDateTime(history.sessionDate)}
          </Typography>
          <Typography variant="body1">
            SESSION ID: {history.sessionId}
          </Typography>
          <Typography variant="body1">SEMESTER: {history.semester}</Typography>
        </CardContent>
      </>
    )
  }

  return (
    <Box sx={styles.sidebar}>
      <Stack spacing={1}>
        {data?.map((item: GetAttendanceSessionResponse) => (
          <Card
            key={item.id}
            variant="outlined"
            sx={compose.card[id === item.id ? 'active' : 'inactive']}
            onClick={() => {
              onSelect(item)
              setId(item.id)
            }}
          >
            <CardDetail history={item} />
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default HistorySidebar
