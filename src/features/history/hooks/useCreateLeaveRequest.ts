import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import { HistoryQueryKeys } from '../enums'
import {
  GetAttendanceRecordRequest,
  GetAttendanceRecordResponse,
} from '../types'
import { createLeaveRequest } from '../services'

const useCreateLeaveRequest = () => {
  return useMutation<
    GetAttendanceRecordResponse,
    BaseErrorResponse,
    GetAttendanceRecordRequest
  >({
    mutationKey: [HistoryQueryKeys.CREATE_LEAVE_REQUEST],
    mutationFn: createLeaveRequest,
  })
}

export default useCreateLeaveRequest
