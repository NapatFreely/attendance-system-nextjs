import { SxProps } from '@mui/system'

const useStyles = () => {
  const sidebar: SxProps = {
    gridColumn: 'span 2',
    padding: '8px',
    overflowY: 'auto',
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome, Safari, Edge
    },
    background: 'linear-gradient(180deg, #FF6600 0%, #FF9920 100%)',
  }

  return {
    sidebar,
  }
}

export default useStyles
