import { isAxiosError } from 'axios'

import axios from '@/lib/axios'
import {
  GetAccessTokenResponse,
  GetSignInRequest,
  GetSignUpRequest,
  GetSignUpResponse,
} from '@/features/authentication/types'

export const postSignup = async (
  request: GetSignUpRequest
): Promise<GetSignUpResponse> => {
  try {
    const response = await axios.post(`/users`, request)

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
): Promise<GetAccessTokenResponse> => {
  try {
    const response = await axios.post(`/login`, request)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error post singin.')
  }
}
