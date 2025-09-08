import axiosClient from '@/lib/axios'
import { GetQrCodeRequest, GetQrCodeResponse } from '../types'
import { isAxiosError } from 'axios'

export const createQrCode = async (
  request: GetQrCodeRequest
): Promise<GetQrCodeResponse> => {
  try {
    const response = await axiosClient.post(`/qrCode`, request)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error create qr code.')
  }
}
