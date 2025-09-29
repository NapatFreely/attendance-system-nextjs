import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import { deleteCourse } from '../services'
import { CourseQueryKeys } from '../enums'
import { DeleteCourseRequest } from '../types'

const useDeleteCourse = () => {
  return useMutation<void, BaseErrorResponse, DeleteCourseRequest>({
    mutationKey: [CourseQueryKeys.DELETE_COURSE],
    mutationFn: deleteCourse,
  })
}

export default useDeleteCourse
