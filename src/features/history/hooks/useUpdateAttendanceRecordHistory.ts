import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import { HistoryQueryKeys } from '../enums'
import {
  GetUpdateAttendanceRecordRequest,
  GetAttendanceRecordResponse,
} from '../types'
import { updateAttendanceRecordHistory } from '../services'

const useUpdateAttendanceRecordHistory = () => {
  return useMutation<
    GetAttendanceRecordResponse,
    BaseErrorResponse,
    GetUpdateAttendanceRecordRequest
  >({
    mutationKey: [HistoryQueryKeys.UPDATTE_ATTENDANCE_RECORD_HISTORY],
    mutationFn: updateAttendanceRecordHistory,
  })
}

export default useUpdateAttendanceRecordHistory
