import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import {
  GetAttendanceSessionRequest,
  GetAttendanceSessionResponse,
} from '@/features/attendance-session/types'
import { AttendanceSessionQueryKeys } from '@/features/attendance-session/enums'
import { createAttendanceSession } from '@/features/attendance-session/services'

const useCreateAttendanceSession = () => {
  return useMutation<
    GetAttendanceSessionResponse,
    BaseErrorResponse,
    GetAttendanceSessionRequest
  >({
    mutationKey: [AttendanceSessionQueryKeys.CREATE_ATTENDANCE_SESSION],
    mutationFn: createAttendanceSession,
  })
}

export default useCreateAttendanceSession
