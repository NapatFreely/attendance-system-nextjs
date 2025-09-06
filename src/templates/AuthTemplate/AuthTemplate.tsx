'use client'

import { FC, PropsWithChildren, useEffect } from 'react'

import { Box } from '@mui/material'

import { LocalStorageKey } from '@/types/local-storage'

import useStyles from './AuthTemplate.style'

const AuthTemplate: FC<PropsWithChildren> = ({ children }) => {
  const styles = useStyles()


  // useEffect(() => {
    // when signed in or signed out next auth will reload the page
    // so we need to handle state from local storage
   // if (localStorage.getItem(LocalStorageKey.SIGN_OUT_SUCCESS)) {
     // toast.show({
  //      variant: 'success',
  //      title: 'Sign out successfully.',
  //    })
  //    localStorage.removeItem(LocalStorageKey.SIGN_OUT_SUCCESS)
 //   }
 // })

  return <Box sx={styles.container}>{children}</Box>
}

export default AuthTemplate
