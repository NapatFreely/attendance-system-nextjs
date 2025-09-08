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

import useStyles from './CourseForm.style'
import ModalProgress, {
  ModalProgressState,
  ModalProgressStatus,
} from '@/components/ModalProgress/ModalProgress'
import { useCreateCourse } from '../../hooks'
import { Route } from '@/types/route.type'
import { CourseFormParams, CourseFormProps } from './CourseForm.type'
import { GetCourseRequest } from '../../types'
import schema from './CourseForm.schema'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'

const AttendanceSessionForm: FC<CourseFormProps> = () => {
  const router = useRouter()
  const styles = useStyles()
  const [modalProgress, setModalProgress] = useState<ModalProgressState>({
    isOpen: false,
    status: ModalProgressStatus.LOADING,
  })
  const createCourse = useCreateCourse()
  const { profile } = useProfile()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CourseFormParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<CourseFormParams> = async ({
    courseCode,
    courseName,
  }) => {
    setModalProgress({
      isOpen: true,
      status: ModalProgressStatus.LOADING,
    })
    const request: GetCourseRequest = {
      teacherId: profile?.id ?? 0,
      courseCode: courseCode,
      courseName: courseName,
    }

    createCourse.mutate(request, {
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
          description: <Stack>{createCourse.error?.message}</Stack>,
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
    if (createCourse.isSuccess) {
      router.replace(Route.HOME)
    }

    setModalProgress({ isOpen: false, status: ModalProgressStatus.LOADING })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">COURSE</Typography>
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
            disabled: createCourse.isPending,
          },
        }}
      />
    </Box>
  )
}

export default AttendanceSessionForm
