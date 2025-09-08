import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import { GetFilePathResponse } from '@/features/attendance-session/types'
import { AttendanceSessionQueryKeys } from '@/features/attendance-session/enums'
import { uploadFile } from '../services'

const useUploadFile = () => {
  return useMutation<GetFilePathResponse, BaseErrorResponse, File>({
    mutationKey: [AttendanceSessionQueryKeys.UPLOAD_FILE],
    mutationFn: uploadFile,
  })
}

export default useUploadFile
