'use client'
import { FC, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

import useStyles from './AttendanceSessionForm.style'
import {
  AttendanceSessionFormProps,
  AttendanceSessionFormParams,
} from './AttendanceSessionForm.type'
import schema from './AttendanceSessionForm.schema'
import { GetAttendanceSessionRequest, Semester } from '../../types'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { useCreateAttendanceSession } from '../../hooks'
import { useGetCoursesByTeacherId } from '@/features/course/hooks'
import { Route } from '@/types/route.type'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'

const semesters: Semester[] = [
  {
    id: 0,
    val: '1',
  },
  {
    id: 1,
    val: '2',
  },
  {
    id: 2,
    val: 'Summar',
  },
]

const AttendanceSessionForm: FC<AttendanceSessionFormProps> = () => {
  const router = useRouter()
  const styles = useStyles()
  const [semester, setSemester] = useState<string>()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })
  const [courseId, setCourseId] = useState<string>()

  const createAttendanceSession = useCreateAttendanceSession()
  const { profile } = useProfile()

  const { data } = useGetCoursesByTeacherId(profile?.id ?? 0)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AttendanceSessionFormParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<AttendanceSessionFormParams> = async ({
    courseCode,
    courseName,
    courseId,
    sessionId,
    sessionDate,
    semester,
  }) => {
    const date = new Date(sessionDate)
    const year = date.getFullYear()

    setModalProgress({
      isOpen: true,
      status: ModalProgressStatus.LOADING,
    })
    const request: GetAttendanceSessionRequest = {
      teacherId: profile?.id ?? 0,
      courseId: Number(courseId ?? 0),
      courseName:
        (courseName ||
          data?.find((item) => item.id === courseId)?.courseName) ??
        '',
      courseCode: courseCode || '',
      academicYear: year,
      sessionId: sessionId,
      sessionDate: sessionDate,
      semester: semester,
    }

    createAttendanceSession.mutate(request, {
      onSuccess: () => {
        setModalProgress({
          isOpen: false,
          status: ModalProgressStatus.SUCCESS,
        })
        router.replace(Route.HOME)
      },
      onError: () => {
        setModalProgress({
          isOpen: true,
          status: ModalProgressStatus.ERROR,
        })
      },
    })
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
          title: 'Success to Signup',
          description: <Box>Success</Box>,
        }
      case ModalProgressStatus.ERROR:
        return {
          title: 'Failed to SignUp',
          description: <Stack>{createAttendanceSession.error?.message}</Stack>,
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
    if (createAttendanceSession.isSuccess) {
    }

    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Attendance Session</Typography>
        <Divider />
        <TextField
          id="courseCode"
          label="COURSE CODE"
          variant="filled"
          {...register('courseCode')}
          error={!!errors.courseCode}
          helperText={errors.courseCode?.message}
        />
        <TextField
          id="courseName"
          label="COURSE NAME"
          variant="filled"
          {...register('courseName')}
          error={!!errors.courseName}
          helperText={errors.courseName?.message}
        />
        or
        <TextField
          id="courseId"
          select
          label="COURSE NAME"
          value={courseId || ''}
          variant="filled"
          {...register('courseId')}
          error={!!errors.courseId}
          helperText={errors.courseId?.message}
          onChange={(e) => setCourseId(e.target.value || '')}
        >
          {data?.map((option) => (
            <MenuItem key={option.id} value={String(option.id)}>
              {`(${option.courseCode}) ${option.courseName}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="sessionId"
          label="SESSION ID"
          variant="filled"
          {...register('sessionId')}
          error={!!errors.sessionId}
          helperText={errors.sessionId?.message}
        />
        <TextField
          id="sessionDate"
          label="SESSION DATE"
          variant="filled"
          type="datetime-local"
          {...register('sessionDate')}
          error={!!errors.sessionDate}
          helperText={errors.sessionDate?.message}
        />
        <TextField
          id="semester"
          select
          label="Semester"
          value={semester}
          variant="filled"
          {...register('semester')}
          error={!!errors.semester}
          helperText={errors.semester?.message}
          onChange={(e) => setSemester(e.target.value as string)}
        >
          {semesters.map((option) => (
            <MenuItem key={option.id} value={option.val}>
              {option.val}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" type="submit">
          Submit
        </Button>
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
            disabled: createAttendanceSession.isPending,
          },
        }}
      />
    </Box>
  )
}

export default AttendanceSessionForm
