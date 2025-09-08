'use client'

import { Button, Stack } from '@mui/material'
import useStyles from './TeacherMenu.style'
import { useRouter } from 'next/navigation'
import { Route } from '@/types/route.type'

const TeacherMenu = () => {
  const router = useRouter()
  const styles = useStyles()

  const redirectToAttendanceSession = () => {
    router.push(Route.ATTENDANCE_SESSION)
  }

  const redirectToHistory = () => {
    router.push(Route.HISTORY)
  }

  const redirectToCourse = () => {
    router.push(Route.COURSE)
  }

  return (
    <Stack spacing={2} sx={styles.form}>
      <Button variant="contained" onClick={redirectToCourse}>
        สร้างคอร์ส
      </Button>
      <Button variant="contained" onClick={redirectToAttendanceSession}>
        สร้างรายชื่อรายวิชาที่สอน
      </Button>
      <Button variant="contained" onClick={redirectToHistory}>
        ประวัติการเช็ดชื่อ
      </Button>
    </Stack>
  )
}

export default TeacherMenu
