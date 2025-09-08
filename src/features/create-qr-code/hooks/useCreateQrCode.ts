import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import { createQrCode } from '../services'
import { GetQrCodeRequest, GetQrCodeResponse } from '../types'
import { QrCodeQueryKeys } from '../enums'

const useCreateQrCode = () => {
  return useMutation<GetQrCodeResponse, BaseErrorResponse, GetQrCodeRequest>({
    mutationKey: [QrCodeQueryKeys.CREATE_QR_CODE],
    mutationFn: createQrCode,
  })
}

export default useCreateQrCode
