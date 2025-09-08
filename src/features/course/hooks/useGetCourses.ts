import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { GetCourseResponse } from '../types'
import { getCourses } from '../services'
import { CourseQueryKeys } from '../enums'

const useGetCourses = (
  options?: Omit<
    UseQueryOptions<GetCourseResponse[], Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetCourseResponse[], Error>({
    queryKey: [CourseQueryKeys.GET_COURSES],
    queryFn: getCourses,
    refetchOnMount: 'always',
    ...options,
  })
}

export default useGetCourses
