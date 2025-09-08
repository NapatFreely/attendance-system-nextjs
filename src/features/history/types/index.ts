import { GetUserResponse } from '@/features/authentication/types'

export interface Status {
  id: number
  text: string
}

export interface GetAttendanceRecordRequest {
  sessionId: number
  courseId: number
  studentId: number
  status: number
  checkInTime: string
  reason: string
  requestedAt: string
  attachmentUrl: string
}

export interface GetUpdateAttendanceRecordRequest {
  id: number
  status: number
}

export interface GetAttendanceRecordResponse {
  id: number
  sessionId: number
  studentId: number
  status: number
  checkInTime: string
  reason: string
  requestedAt: string
  attachmentUrl: string
  student: GetUserResponse
}
