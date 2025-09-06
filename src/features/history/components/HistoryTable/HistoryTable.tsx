'use client'
import { FC, useState } from 'react'

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
import { History, Status } from '@/features/history/types'

import useStyles from './HistoryTable.style'
import { Route } from '@/types/route.type'

interface HistoryTableProps {
  history?: History
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
  const [status, setStatus] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value)
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
                <TableCell align="center">Status)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={'1'}>
                <TableCell align="center">68000</TableCell>
                <TableCell align="center">มะลิ</TableCell>
                <TableCell align="center">Mon 09:50</TableCell>
                <TableCell align="center">
                  <FormControl fullWidth>
                    <InputLabel id="status-label">สถานะ</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status-select"
                      value={status}
                      label="สถานะ"
                      onChange={handleChange}
                    >
                      {statuses.map((item) => (
                        <MenuItem value={item.id}>{item.text}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  )
}

export default HistoryTable
