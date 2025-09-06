export interface AttendanceSessionFormProps {
  onSubmit?: (params: AttendanceSessionFormParams) => void
}

export interface AttendanceSessionFormParams {
  courseId: string
  courseName: string
  sessionId: string
  sessionDate: string
}
