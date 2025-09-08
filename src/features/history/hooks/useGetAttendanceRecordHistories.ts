import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetAttendanceRecordResponse } from '../types'
import { HistoryQueryKeys } from '../enums'
import { getAttendanceRecordHistories } from '../services'

const useGetAttendanceRecordHistories = (
  id: number,
  options?: Omit<
    UseQueryOptions<GetAttendanceRecordResponse[], Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetAttendanceRecordResponse[], Error>({
    queryKey: [HistoryQueryKeys.GET_ATTENDANCE_RECORD_HISTORY],
    queryFn: () => getAttendanceRecordHistories(id),
    refetchOnMount: 'always',
    ...options,
  })
}

export default useGetAttendanceRecordHistories
