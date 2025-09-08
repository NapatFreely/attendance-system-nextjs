import axiosClient from '@/lib/axios'
import {
  GetAttendanceRecordRequest,
  GetAttendanceRecordResponse,
  GetUpdateAttendanceRecordRequest,
} from '../types'
import { isAxiosError } from 'axios'

export const createLeaveRequest = async (
  request: GetAttendanceRecordRequest
): Promise<GetAttendanceRecordResponse> => {
  try {
    const response = await axiosClient.post(`/attendanceRecord`, request)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error create leave request.')
  }
}

export const getAttendanceRecordHistories = async (
  id: number
): Promise<GetAttendanceRecordResponse[]> => {
  try {
    const response = await axiosClient.get(`/attendanceRecord/${id}`)

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error get attendance record history.')
  }
}

export const updateAttendanceRecordHistory = async (
  request: GetUpdateAttendanceRecordRequest
): Promise<GetAttendanceRecordResponse> => {
  try {
    const response = await axiosClient.put(
      `/attendanceRecord/${request.id}`,
      request
    )

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw new Error('Error update attendance record history.')
  }
}
