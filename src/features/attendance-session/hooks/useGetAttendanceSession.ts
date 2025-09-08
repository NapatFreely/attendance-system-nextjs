import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetAttendanceSessionResponse } from '../types'
import { AttendanceSessionQueryKeys } from '../enums'
import { getAttendanceSession } from '../services'

const useGetAttendanceSession = (
  options?: Omit<
    UseQueryOptions<GetAttendanceSessionResponse[], Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetAttendanceSessionResponse[], Error>({
    queryKey: [AttendanceSessionQueryKeys.GET_ATTENDANCE_SESSION],
    queryFn: getAttendanceSession,
    refetchOnMount: 'always',
    ...options,
  })
}

export default useGetAttendanceSession
