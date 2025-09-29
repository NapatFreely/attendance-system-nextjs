'use client'

import { Box } from '@mui/material'

import useStyles from './page.style'
import { SelectLocationForm } from '@/features/create-qr-code/components/SelectLocationForm'

const SelectLocation = () => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <SelectLocationForm></SelectLocationForm>
    </Box>
  )
}

export default SelectLocation
