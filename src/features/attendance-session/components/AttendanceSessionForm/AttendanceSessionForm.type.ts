export interface AttendanceSessionFormProps {
  onSubmit?: (params: AttendanceSessionFormParams) => void
}

export interface AttendanceSessionFormParams {
  courseCode?: string
  courseName?: string
  courseId?: number | unknown
  sessionId: string
  sessionDate: string
  semester: string
}
