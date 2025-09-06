export interface History {
  id: number
  courseId: string
  courseName: string
  sessionId: string
  sessionDate: string
}

export interface GetHistoryResponse {
  data: History[]
}

export interface Status {
  id: number
  text: string
}
