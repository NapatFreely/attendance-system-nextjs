'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import CourseForm from '../../components/CourseForm/CourseForm'

const Course = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <CourseForm></CourseForm>
    </Box>
  )
}

export default Course
