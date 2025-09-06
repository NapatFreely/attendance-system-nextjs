'use client'
import { FC, PropsWithChildren } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    components: {},
    palette: {
      primary: {
        main: '#FF6600',
        contrastText: '#FFFFFF',
      },
    },
  })
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeContextProvider
