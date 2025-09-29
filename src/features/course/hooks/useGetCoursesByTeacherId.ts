import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { GetCourseResponse } from '../types'
import { getCoursesByTeacherId } from '../services'
import { CourseQueryKeys } from '../enums'

const useGetCoursesByTeacherId = (
  id: number,
  options?: Omit<
    UseQueryOptions<GetCourseResponse[], Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetCourseResponse[], Error>({
    queryKey: [CourseQueryKeys.GET_COURSES_BY_TEACHER_ID],
    queryFn: () => getCoursesByTeacherId(id),
    refetchOnMount: 'always',
    ...options,
  })
}

export default useGetCoursesByTeacherId
