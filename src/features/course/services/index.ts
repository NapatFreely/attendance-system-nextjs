import { isAxiosError } from 'axios'

import axiosClient from '@/lib/axios'
import {
  DeleteCourseRequest,
  GetCourseRequest,
  GetCourseResponse,
} from '../types'

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

export const getCoursesByTeacherId = async (
  id: number
): Promise<GetCourseResponse[]> => {
  try {
    const response = await axiosClient.get(`/course/${id}`)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error get course by teacher id.')
  }
}

export const deleteCourse = async (
  request: DeleteCourseRequest
): Promise<void> => {
  try {
    const response = await axiosClient.delete(
      `/course/${request.id}/${request.sessionId}`
    )

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error delete course.')
  }
}
