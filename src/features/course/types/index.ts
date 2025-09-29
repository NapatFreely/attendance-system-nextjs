export interface GetCourseRequest {
  teacherId: number
  courseCode: string
  courseName: string
}

export interface GetCourseResponse {
  id: number
  courseCode: string
  courseName: string
}

export interface DeleteCourseRequest {
  id: number
  sessionId?: number
}
