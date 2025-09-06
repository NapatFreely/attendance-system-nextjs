'use client'
import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
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
import { Route } from '@/types/route.type'

const AttendanceSessionForm: FC<AttendanceSessionFormProps> = () => {
  const router = useRouter()
  const styles = useStyles()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AttendanceSessionFormParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<AttendanceSessionFormParams> = async ({
    courseId,
    courseName,
    sessionId,
    sessionDate,
  }) => {}

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Attendance Session</Typography>
        <Divider />
        <TextField id="courseId" label="COURSE ID" variant="filled" />
        <TextField id="courseName" label="COURSE NAME" variant="filled" />
        <TextField id="sessionId" label="SESSION ID" variant="filled" />
        <TextField
          id="sessionDate"
          label="COURSE NAME"
          variant="filled"
          type="date"
        />
        <Button
          variant="contained"
          // type="submit"
          onClick={() => router.push(Route.OPEN_CAMERA)}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

export default AttendanceSessionForm
