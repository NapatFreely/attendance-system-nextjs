'use client'
import { FC, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import {
  GetUpdateAttendanceRecordRequest,
  Status,
} from '@/features/history/types'

import useStyles from './HistoryTable.style'
import { Route } from '@/types/route.type'
import { GetAttendanceSessionResponse } from '@/features/attendance-session/types'
import {
  useGetAttendanceRecordHistories,
  useUpdateAttendanceRecordHistory,
} from '../../hooks'
import { convertToCheckIn } from '@/utils/date-time'
import appConfig from '@/appConfig'
import { profile } from 'console'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'
import { RoleEnum } from '@/features/authentication/enum/role'

interface HistoryTableProps {
  history?: GetAttendanceSessionResponse
}

const statuses: Status[] = [
  {
    id: 0,
    text: 'มาเรียน',
  },
  {
    id: 1,
    text: 'มาสาย',
  },
  {
    id: 2,
    text: 'ลาป่วย',
  },
]

const HistoryTable: FC<HistoryTableProps> = ({ history }) => {
  const router = useRouter()
  const styles = useStyles()
  const [selectStatuses, setSelectStatuses] = useState<Record<number, number>>(
    {}
  )
  const { data } = useGetAttendanceRecordHistories(history?.id ?? 0)
  const updateAttendanceRecordHistory = useUpdateAttendanceRecordHistory()
  const { profile } = useProfile()

  useEffect(() => {
    if (data) {
      const initialStatuses = data.reduce<Record<number, number>>(
        (acc, record) => {
          acc[record.id] = record.status
          return acc
        },
        {}
      )

      setSelectStatuses(initialStatuses)
    }
  }, [data])

  const handleChange = (event: SelectChangeEvent, rowId: number) => {
    const newStatus = Number(event.target.value)
    setSelectStatuses((prev) => ({
      ...prev,
      [rowId]: newStatus,
    }))

    const request: GetUpdateAttendanceRecordRequest = {
      id: rowId,
      status: newStatus,
    }

    updateAttendanceRecordHistory.mutate(request)
  }

  const handleDownload = () => {}

  const redirectToHome = () => {
    router.replace(Route.HOME)
  }

  if (!history) {
    return <></>
  }

  return (
    <Box sx={styles.sidebar}>
      <Stack spacing={2}>
        <Typography variant="h2">
          {history.courseId} {history.courseName}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={handleDownload}>Download</Button>
          <Button onClick={redirectToHome}>Home</Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table aria-label="table history" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">รหัสนิสิต</TableCell>
                <TableCell align="center">ชื่อ-นามสกุล</TableCell>
                <TableCell align="center">วัน/เวลา</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">หมายเหตุ</TableCell>
                <TableCell align="center">เอกสาร</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.filter((item) => profile?.id === item.student.userId)
                ?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">
                      {item.student.studentCode}
                    </TableCell>
                    <TableCell align="center">{item.student.name}</TableCell>
                    <TableCell align="center">
                      {convertToCheckIn(item.checkInTime)}
                    </TableCell>
                    <TableCell align="center">
                      {Number(profile?.role ?? '1') === 1 ? (
                        <FormControl fullWidth>
                          <InputLabel id="status-label">สถานะ</InputLabel>
                          <Select
                            labelId="status-label"
                            id="status-select"
                            value={String(selectStatuses[item.id]) ?? ''}
                            label="สถานะ"
                            onChange={(e) => handleChange(e, item.id)}
                          >
                            {statuses.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        (statuses.find((status) => status.id === item.status)
                          ?.text ?? '-')
                      )}
                    </TableCell>
                    <TableCell align="center">{item.reason || '-'}</TableCell>
                    <TableCell align="center">
                      <a
                        href={`${appConfig.NEXT_PUBLIC_APP_BASE_URL}${item.attachmentUrl}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#1976d2',
                          textDecoration: 'underline',
                        }}
                      >
                        Download
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  )
}

export default HistoryTable
