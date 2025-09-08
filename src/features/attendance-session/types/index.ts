export interface Semester {
  id: number
  val: string
}

export interface GetAttendanceSessionRequest {
  courseId: number
  courseName: string
  academicYear: number
  sessionId: string
  sessionDate: string
  semester: string
}

export interface Course {
  id: number
  teacherId: number
  courseCode: string
  courseName: string
}

export interface GetAttendanceSessionResponse {
  id: number
  courseName: string
  courseId: string
  academicYear: number
  sessionId: string
  sessionDate: string
  semester: string
  course: Course
}

export interface GetFilePathResponse {
  filePath: string
}
