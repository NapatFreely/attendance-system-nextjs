import { useTheme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

const useStyles = () => {
  const container: SxProps = {
    width: '100%',
    height: '100vh',
    display: 'grid',
    gap: 1,
    gridTemplateColumns: 'repeat(12, 1fr)',
  }

  return { container }
}

export default useStyles
