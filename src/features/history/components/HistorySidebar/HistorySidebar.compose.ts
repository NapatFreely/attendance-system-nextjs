import { SxProps, Theme } from '@mui/system'

const useCompose = () => {
  const card: Record<'active' | 'inactive', SxProps<Theme>> = {
    inactive: {
      opacity: 0.5,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
    },
    active: {
      opacity: 1,
      backgroundColor: '#E56925',
      color: '#fff',
    },
  }

  return {
    card,
  }
}

export default useCompose
