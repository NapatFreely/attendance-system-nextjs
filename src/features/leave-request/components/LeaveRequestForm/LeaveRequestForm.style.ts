import { SxProps } from '@mui/system'

const useStyles = () => {
  const form: SxProps = {
    width: '650px',
    textAlign: 'center',
    background: 'white',
    padding: '24px',
    borderRadius: '8px',
  }

  const col: SxProps = {
    flex: 1,
  }

  return { form, col }
}

export default useStyles
