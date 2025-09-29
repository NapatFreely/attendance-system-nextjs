'use client'

import { Button, Stack } from '@mui/material'
import useStyles from './TeacherMenu.style'
import { useRouter } from 'next/navigation'
import { Route } from '@/types/route.type'
import { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const TeacherMenu = () => {
  const router = useRouter()
  const styles = useStyles()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAqyETt9iu7l5QioWz5iwEbzrallQrpzLs',
  })

  const redirectToAttendanceSession = () => {
    router.push(Route.ATTENDANCE_SESSION)
  }

  const redirectToHistory = () => {
    router.push(Route.HISTORY)
  }

  return (
    <Stack spacing={2} sx={styles.form}>
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
