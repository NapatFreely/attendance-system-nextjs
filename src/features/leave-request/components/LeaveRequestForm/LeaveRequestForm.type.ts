export interface LeaveRequestFormProps {
  onSubmit?: (params: LeaveRequestFormParams) => void
}

export interface LeaveRequestFormParams {
  studentId: string
  name: string
  courseId: string
  courseName: string
  sessionId: string
  reason: string
  attachmentFile: File
}
