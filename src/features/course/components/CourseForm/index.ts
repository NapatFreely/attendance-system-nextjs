import dynamic from 'next/dynamic'

export const AttendanceSessionForm = dynamic(
  () => import('./AttendanceSessionForm')
)
