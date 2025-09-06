import { CheckboxCircle24, Close24, ErrorWarning24 } from '@/assets/icons'
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  ModalProps,
  Stack,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'
import useStyles from './ModalProgress.style'

export interface ModalProgressState {
  isOpen: boolean
  status?: ModalProgressStatus
}

export enum ModalProgressStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ModalProgressProps extends Omit<ModalProps, 'children'> {
  width?: string
  title: string
  description: React.ReactNode
  status?: ModalProgressStatus
  onClose?: () => void
  button?: {
    confirm: {
      text: string
      onClick: () => void
      fullWidth?: boolean
      disabled?: boolean
    }
  }
}

const ModalProgress: FC<ModalProgressProps> = ({
  width,
  open,
  title,
  description,
  status,
  button,
  onClose,
  ...props
}) => {
  const styles = useStyles(width)

  const ContentIcon = () => {
    switch (status) {
      case ModalProgressStatus.LOADING:
        return <CircularProgress size={24} />
      case ModalProgressStatus.SUCCESS:
        return (
          <Box>
            <CheckboxCircle24 />
          </Box>
        )
      case ModalProgressStatus.ERROR:
        return (
          <Box>
            <ErrorWarning24 />
          </Box>
        )
      default:
        return null
    }
  }

  const isShowButton = button && status !== ModalProgressStatus.LOADING

  return (
    <Modal open={open} {...props}>
      <Box sx={styles.container}>
        <Stack sx={styles.header}>
          <Typography variant="h4">{title}</Typography>
          {onClose && (
            <Box sx={styles.closeIcon} onClick={onClose}>
              <Close24 />
            </Box>
          )}
        </Stack>
        <Stack sx={styles.content}>
          <ContentIcon />
          <Typography variant="body1">{description}</Typography>
        </Stack>
        {isShowButton && (
          <Box sx={styles.buttonGroup}>
            <Button sx={styles.buttonConfirm} onClick={button.confirm?.onClick}>
              {button.confirm?.text}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default ModalProgress
