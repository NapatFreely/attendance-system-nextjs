'use client'

import { FC, PropsWithChildren, useEffect } from 'react'

import { Box } from '@mui/material'

import { LocalStorageKey } from '@/types/local-storage'

import useStyles from './AuthTemplate.style'

const AuthTemplate: FC<PropsWithChildren> = ({ children }) => {
  const styles = useStyles()

  return <Box sx={styles.container}>{children}</Box>
}

export default AuthTemplate
