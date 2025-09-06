import dynamic from 'next/dynamic'

export const AttendnaceSessionPage = dynamic(
  () => import('./AttendanceSession')
)
