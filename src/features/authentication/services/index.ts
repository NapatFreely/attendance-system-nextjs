import { isAxiosError } from 'axios'

import {
  GetSignInResponse,
  GetSignInRequest,
  GetSignUpRequest,
  GetSignUpResponse,
} from '@/features/authentication/types'
import axiosClient from '@/lib/axios'

export const postSignup = async (
  request: GetSignUpRequest
): Promise<GetSignUpResponse> => {
  try {
    const response = await axiosClient.post(`/users`, request)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error post signup.')
  }
}

export const postSignin = async (
  request: GetSignInRequest
): Promise<GetSignInResponse> => {
  try {
    const response = await axiosClient.post(`/auth/login`, request, {
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error singin.')
  }
}
