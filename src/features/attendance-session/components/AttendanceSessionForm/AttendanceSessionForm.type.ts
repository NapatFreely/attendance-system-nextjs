export interface AttendanceSessionFormProps {
  onSubmit?: (params: AttendanceSessionFormParams) => void
}

export interface AttendanceSessionFormParams {
  courseId: number
  sessionId: string
  sessionDate: string
  semester: string
}
