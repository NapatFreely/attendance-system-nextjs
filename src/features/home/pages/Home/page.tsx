'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { TeacherMenu } from '@/features/home/components/HomeMenu/TeacherMenu'
import { StudentMenu } from '@/features/home/components/HomeMenu/StudentMenu'
import { useProfile } from '@/features/authentication/layout/ProfileProvider'
import { RoleEnum } from '@/features/authentication/enum/role'

const HomePage = () => {
  const styles = useStyles()
  const { profile } = useProfile()

  return (
    <Box sx={styles.container}>
      {parseInt(profile?.role ?? '0') === 1 ? (
        <TeacherMenu></TeacherMenu>
      ) : (
        <StudentMenu></StudentMenu>
      )}
    </Box>
  )
}

export default HomePage
