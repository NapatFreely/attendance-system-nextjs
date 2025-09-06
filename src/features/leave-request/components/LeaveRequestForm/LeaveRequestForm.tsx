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

import useStyles from './LeaveRequestForm.style'
import { Route } from '@/types/route.type'
import { SubmitHandler, useForm } from 'react-hook-form'
import schema from './LeaveRequestForm.schema'
import { LeaveRequestFormParams } from './LeaveRequestForm.type'

const LeaveRequestForm = () => {
  const router = useRouter()
  const styles = useStyles()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeaveRequestFormParams>({
    resolver: zodResolver(schema),
  })

  const handleOnSubmit: SubmitHandler<LeaveRequestFormParams> = async ({
    studentId,
    name,
  }) => {}

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2} sx={styles.form}>
        <Typography variant="h2">Leave Request</Typography>
        <Divider />
        <Stack direction="row" spacing={2}>
          <Stack spacing={2} sx={styles.col}>
            <TextField id="studentId" label="STUDENT ID" variant="filled" />
            <TextField id="name" label="NAME" variant="filled" />
            <TextField id="courseId" label="COURSE ID" variant="filled" />
            <TextField id="courseName" label="COURSE NAME" variant="filled" />
          </Stack>
          <Stack spacing={2} sx={styles.col}>
            <TextField id="sessionId" label="SESSION ID" variant="filled" />
            <TextField
              id="REASON"
              label="REASON"
              variant="filled"
              multiline
              rows={4}
            />{' '}
            <TextField
              id="attachmentFile"
              label="Attachment File"
              variant="filled"
              type="file"
            />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          // type="submit"
          onClick={() => router.push(Route.HISTORY)}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

export default LeaveRequestForm
