import { isAxiosError } from 'axios'

import axiosClient from '@/lib/axios'
import {
  GetAttendanceSessionRequest,
  GetAttendanceSessionResponse,
  GetFilePathResponse,
} from '../types'

export const createAttendanceSession = async (
  request: GetAttendanceSessionRequest
): Promise<GetAttendanceSessionResponse> => {
  try {
    const response = await axiosClient.post(`/attendanceSession`, request)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error post signup.')
  }
}

export const getAttendanceSession = async (): Promise<
  GetAttendanceSessionResponse[]
> => {
  try {
    const response = await axiosClient.get(`/attendanceSession`)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error get attendance session.')
  }
}

export const uploadFile = async (file: File): Promise<GetFilePathResponse> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axiosClient.post<GetFilePathResponse>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error upload.')
  }
}

export const getAttendanceSessionByCourseId = async (
  courseId: number
): Promise<GetAttendanceSessionResponse[]> => {
  try {
    const response = await axiosClient.get(
      `/attendanceSession/sessions/${courseId}`
    )

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error get attendance sessions.')
  }
}
