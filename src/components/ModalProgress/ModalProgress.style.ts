import { SxProps } from '@mui/system'

import { ModalProgressProps } from './ModalProgress'

const useStyles = (width: ModalProgressProps['width']) => {
  const container: SxProps = {
    width: width ?? 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '16px',
    backgroundColor: '#FFF',
    boxShadow: '#000',
  }

  const header: SxProps = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '16px',
    paddingX: '16px',
  }

  const content: SxProps = {
    alignItems: 'center',
    textAlign: 'center',
    gap: '16px',
    padding: `16px 16px`,
    color: '#000',
  }

  const buttonGroup: SxProps = {
    display: 'flex',
    justifyContent: 'end',
    padding: '16px',
    gap: '8px',
  }

  const baseIcon: SxProps = {
    width: '24px',
    height: '24px',
  }

  const closeIcon: SxProps = {
    ...baseIcon,
    color: '#000',
    cursor: 'pointer',
  }

  const loadingIcon: SxProps = {
    color: '#000000',
  }

  const successIcon: SxProps = {
    ...baseIcon,
    color: '#009B01',
  }

  const errorIcon: SxProps = {
    ...baseIcon,
    color: 'red',
  }

  const buttonConfirm: SxProps = {
    width: '96px',
  }

  return {
    container,
    header,
    content,
    buttonGroup,
    loadingIcon,
    closeIcon,
    successIcon,
    errorIcon,
    buttonConfirm,
  }
}

export default useStyles
