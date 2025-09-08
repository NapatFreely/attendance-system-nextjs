export interface LeaveRequestFormProps {
  onSubmit?: (params: LeaveRequestFormParams) => void
}

export interface LeaveRequestFormParams {
  courseId: number
  sessionId: number
  reason: string
  attachmentFile?: File
}
