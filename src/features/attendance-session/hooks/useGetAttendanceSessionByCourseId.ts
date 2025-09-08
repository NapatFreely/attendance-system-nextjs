import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetAttendanceSessionResponse } from '../types'
import { AttendanceSessionQueryKeys } from '../enums'
import { getAttendanceSessionByCourseId } from '../services'

const useGetAttendanceSessionByCourseId = (
  courseId: number,
  options?: Omit<
    UseQueryOptions<GetAttendanceSessionResponse[], Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetAttendanceSessionResponse[], Error>({
    queryKey: [
      AttendanceSessionQueryKeys.GET_ATTENDANCE_SESSION_BY_COURSE_ID,
      courseId,
    ],
    queryFn: () => getAttendanceSessionByCourseId(courseId),
    refetchOnMount: 'always',
    ...options,
  })
}

export default useGetAttendanceSessionByCourseId
