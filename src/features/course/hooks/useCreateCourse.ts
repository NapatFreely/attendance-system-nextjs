import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import { createCourse } from '../services'
import { GetCourseRequest, GetCourseResponse } from '../types'
import { CourseQueryKeys } from '../enums'

const useCreateCourse = () => {
  return useMutation<GetCourseResponse, BaseErrorResponse, GetCourseRequest>({
    mutationKey: [CourseQueryKeys.CREATE_COURSE],
    mutationFn: createCourse,
  })
}

export default useCreateCourse
