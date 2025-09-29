import { format } from 'date-fns'

export const convertToFullDateTime = (dateTime: string): string => {
  if (!dateTime) return ''
  try {
    return format(new Date(dateTime), 'EEE, dd/MM/yyyy HH:mm')
  } catch (error) {
    console.error('Invalid date:', dateTime, error)
    return dateTime // fallback
  }
}

export const convertToFullDate = (dateTime: string): string => {
  if (!dateTime) return ''
  try {
    return format(new Date(dateTime), 'EEE, dd/MM/yyyy')
  } catch (error) {
    console.error('Invalid date:', dateTime, error)
    return dateTime // fallback
  }
}

export const convertToCheckIn = (dateTime: string): string => {
  if (!dateTime) return ''
  try {
    return format(new Date(dateTime), 'EEE, HH:mm')
  } catch (error) {
    console.error('Invalid date:', dateTime, error)
    return dateTime // fallback
  }
}
