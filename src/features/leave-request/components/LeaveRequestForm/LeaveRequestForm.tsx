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

import useStyles from './LeaveRequestForm.style'
import { Route } from '@/types/route.type'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import schema from './LeaveRequestForm.schema'
import { LeaveRequestFormParams } from './LeaveRequestForm.type'
import { useGetCourses } from '@/features/course/hooks'
import {
  useGetAttendanceSessionByCourseId,
  useUploadFile,
} from '@/features/attendance-session/hooks'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { useCreateLeaveRequest } from '@/features/history/hooks'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'
import { GetAttendanceRecordRequest } from '@/features/history/types'

type AttendanceRecordRequest = {
  courseId: number
  sessionId: number
  reason: string
  attachmentUrl?: string
}

const LeaveRequestForm = () => {
  const router = useRouter()
  const styles = useStyles()
  const [courseId, setCourseId] = useState<number>()
  const [sessionId, setSessionId] = useState<number>()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })
  const { data: sessions } = useGetAttendanceSessionByCourseId(courseId ?? 0)
  const { data } = useGetCourses()
  const uploadFile = useUploadFile()
  const createLeaveRequest = useCreateLeaveRequest()
  const { profile } = useProfile()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeaveRequestFormParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<LeaveRequestFormParams> = async ({
    courseId,
    sessionId,
    reason,
    attachmentFile,
  }) => {
    if (attachmentFile) {
      uploadFile.mutate(attachmentFile, {
        onSuccess: (response) => {
          handleCreateLeaveRequest({
            courseId: courseId,
            sessionId: sessionId,
            reason: reason,
            attachmentUrl: response.filePath,
          })
        },
        onError: () => {
          setModalProgress({
            isOpen: true,
            status: ModalProgressStatus.ERROR,
          })
        },
      })
    } else {
      handleCreateLeaveRequest({
        courseId,
        sessionId,
        reason,
      })
    }
  }

  const handleCreateLeaveRequest = ({
    courseId,
    sessionId,
    reason,
    attachmentUrl,
  }: AttendanceRecordRequest) => {
    const request: GetAttendanceRecordRequest = {
      sessionId: sessionId,
      courseId: courseId,
      studentId: profile?.id ?? 0,
      status: 2,
      checkInTime: new Date().toISOString(),
      reason: reason,
      requestedAt: new Date().toISOString(),
      attachmentUrl: attachmentUrl ?? '',
    }
    createLeaveRequest.mutate(request, {
      onSuccess: () => {
        setModalProgress({
          isOpen: false,
          status: ModalProgressStatus.ERROR,
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
          description: (
            <Stack>
              {uploadFile.error?.message ?? createLeaveRequest.error?.message}
            </Stack>
          ),
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
    if (createLeaveRequest.isSuccess) {
      router.replace(Route.HOME)
    }
    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Leave Request</Typography>
        <Divider />
        <TextField
          id="courseName"
          select
          label="COURSE NAME"
          value={courseId}
          variant="filled"
          {...register('courseId')}
          error={!!errors.courseId}
          helperText={errors.courseId?.message}
          onChange={(e) => setCourseId(parseInt(e.target.value))}
        >
          {data?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {`(${option.courseCode}) ${option.courseName}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="sessionId"
          select
          label="SESSION ID"
          value={sessionId}
          variant="filled"
          {...register('sessionId')}
          error={!!errors.sessionId}
          helperText={errors.sessionId?.message}
          onChange={(e) => setSessionId(parseInt(e.target.value))}
        >
          {sessions?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.sessionId}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="REASON"
          label="REASON"
          variant="filled"
          multiline
          rows={4}
          {...register('reason')}
          error={!!errors.reason}
          helperText={errors.reason?.message}
        />
        <Controller
          name="attachmentFile"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              type="file"
              label="Attachment File"
              variant="filled"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                const target = e.target as HTMLInputElement
                const file = target.files?.[0] || null
                field.onChange(file)
              }}
            />
          )}
        />
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
            disabled: uploadFile.isPending || createLeaveRequest.isPending,
          },
        }}
      />
    </Box>
  )
}

export default LeaveRequestForm
