import { useTheme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

const useStyles = () => {
  const container: SxProps = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '.MuiButton-root': {
      minWidth: 150,
    },
  }

  return { container }
}

export default useStyles
