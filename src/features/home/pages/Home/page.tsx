'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { TeacherMenu } from '@/features/home/components/HomeMenu/TeacherMenu'
import { StudentMenu } from '@/features/home/components/HomeMenu/StudentMenu'

const HomePage = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      {/* <TeacherMenu></TeacherMenu> */}
      <StudentMenu></StudentMenu>
    </Box>
  )
}

export default HomePage
