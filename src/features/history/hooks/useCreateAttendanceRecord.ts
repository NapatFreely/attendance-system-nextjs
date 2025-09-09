import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import { HistoryQueryKeys } from '../enums'
import {
  GetAttendanceRecordRequest,
  GetAttendanceRecordResponse,
} from '../types'
import { createLeaveRequest } from '../services'

const useCreateAttendanceRecord = () => {
  return useMutation<
    GetAttendanceRecordResponse,
    BaseErrorResponse,
    GetAttendanceRecordRequest
  >({
    mutationKey: [HistoryQueryKeys.CREATE_ATTENDANCE_RECORD],
    mutationFn: createLeaveRequest,
  })
}

export default useCreateAttendanceRecord
