'use client'
import { FC, useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
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
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import {
  GetUpdateAttendanceRecordRequest,
  Status,
} from '@/features/history/types'
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import useStyles from './HistoryTable.style'
import { Route } from '@/types/route.type'
import { GetAttendanceSessionResponse } from '@/features/attendance-session/types'
import {
  useGetAttendanceRecordHistories,
  useUpdateAttendanceRecordHistory,
} from '../../hooks'
import { convertToCheckIn } from '@/utils/date-time'
import appConfig from '@/appConfig'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { createQrCode } from '@/features/create-qr-code/services'
import { useDeleteCourse } from '@/features/course/hooks'
import { DeleteCourseRequest } from '@/features/course/types'

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

const statusEng: Status[] = [
  {
    id: 0,
    text: 'present',
  },
  {
    id: 1,
    text: 'late',
  },
  {
    id: 2,
    text: 'sick leave',
  },
]

const HistoryTable: FC<HistoryTableProps> = ({ history }) => {
  const router = useRouter()
  const styles = useStyles()
  const [selectStatuses, setSelectStatuses] = useState<Record<number, number>>(
    {}
  )
  const [open, setOpen] = useState(false)
  const { data } = useGetAttendanceRecordHistories(history?.id ?? 0)
  const updateAttendanceRecordHistory = useUpdateAttendanceRecordHistory()
  const { profile } = useProfile()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })
  const deleteCourse = useDeleteCourse()

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

  const handleDownload = () => {
    const doc = new jsPDF()
    const tableColumn = [
      'Student Code',
      'Name',
      'Check-in datetime',
      'Status',
      'Reason',
    ]
    const tableRows: any[] = []

    data?.forEach((item) => {
      const rowData = [
        item.student.studentCode,
        item.student.name,
        convertToCheckIn(item.checkInTime),
        statusEng.find((status) => status.id === item.status)?.text ?? '-',
        item.reason || '-',
      ]
      tableRows.push(rowData)
    })

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    })

    doc.text(`${history?.courseId} ${history?.courseName}`, 14, 15)
    doc.save(`${history?.courseId}_${history?.courseName}.pdf`)
  }

  const redirectToHome = () => {
    router.replace(Route.HOME)
  }

  const redirectToScan = () => {
    const params = new URLSearchParams({
      courseId: history?.courseId ?? '',
      sessionId: String(history?.id ?? -1),
      sessionDate: String(history?.sessionDate ?? ''),
    })

    router.replace(`${Route.OPEN_CAMERA}?${params.toString()}`)
  }

  const progressModalContent = useMemo(() => {
    switch (modalProgress.status) {
      case ModalProgressStatus.LOADING:
        return {
          title: 'Creating...',
          description: 'Please do nothing while creating.',
        }
      case ModalProgressStatus.SUCCESS:
        return {
          title: 'Success',
          description: <Box>Success</Box>,
        }
      case ModalProgressStatus.ERROR:
        return {
          title: 'Failed',
          description: <Stack>{deleteCourse.error?.message}</Stack>,
        }
      default:
        return {
          title: '',
          description: '',
        }
    }
  }, [modalProgress.status])

  const handleCloseModal = () => {
    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  const handleConfirmModal = () => {
    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  const onDelete = () => {
    handleClose()
    setModalProgress({
      isOpen: true,
      status: ModalProgressStatus.LOADING,
    })
    const request: DeleteCourseRequest = {
      id: Number(history?.courseId ?? 0),
      sessionId: Number(history?.id ?? 0),
    }

    deleteCourse.mutate(request, {
      onSuccess: () => {
        setModalProgress({
          isOpen: false,
        })
        window.location.reload()
      },
      onError: () => {
        setModalProgress({
          isOpen: true,
          status: ModalProgressStatus.ERROR,
        })
      },
    })
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  if (!history) {
    return <></>
  }

  return (
    <Box sx={styles.sidebar}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Typography variant="h2">{history.courseName}</Typography>
          <Button
            sx={{ color: 'white', fontStyle: 'bold', background: 'red' }}
            variant="contained"
            onClick={handleOpen}
          >
            Delete
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          {Number(profile?.role ?? '1') === 1 && (
            <Button
              sx={{ color: 'white', fontStyle: 'bold' }}
              variant="contained"
              onClick={redirectToScan}
            >
              Scan
            </Button>
          )}
          {Number(profile?.role ?? '1') === 1 && (
            <Button
              sx={{ color: 'white', fontStyle: 'bold' }}
              variant="contained"
              onClick={handleDownload}
            >
              Download
            </Button>
          )}
          <Button
            sx={{ color: 'white', fontStyle: 'bold' }}
            variant="contained"
            onClick={redirectToHome}
          >
            Home
          </Button>
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
                ?.filter((item) =>
                  Number(profile?.role ?? 1) === 1
                    ? true
                    : profile?.id === item.student.userId
                )
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
      <ModalProgress
        open={modalProgress.isOpen}
        status={modalProgress.status}
        onClose={handleCloseModal}
        title={progressModalContent.title}
        description={progressModalContent.description}
        width="360px"
        button={{
          confirm: {
            text: 'OK',
            onClick: handleConfirmModal,
            disabled: deleteCourse.isPending,
          },
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Stack
          sx={{
            width: 400,
            background: 'white',
            padding: 2,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          gap={2}
        >
          <h2 id="parent-modal-title">Warning</h2>
          <p id="parent-modal-description">
            Do you want to delete this course?
          </p>
          <Stack direction="row" gap={2} alignItems="end" justifyContent="end">
            <Button
              sx={{ color: 'white', fontStyle: 'bold', background: 'red' }}
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: 'white', fontStyle: 'bold' }}
              variant="contained"
              onClick={onDelete}
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Box>
  )
}

export default HistoryTable
