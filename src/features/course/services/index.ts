import { isAxiosError } from 'axios'

import axiosClient from '@/lib/axios'
import { GetCourseRequest, GetCourseResponse } from '../types'

export const createCourse = async (
  request: GetCourseRequest
): Promise<GetCourseResponse> => {
  try {
    const response = await axiosClient.post(`/course`, request)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error post course.')
  }
}

export const getCourses = async (): Promise<GetCourseResponse[]> => {
  try {
    const response = await axiosClient.get(`/course`)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error get course.')
  }
}
