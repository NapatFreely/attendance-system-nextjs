export interface CourseFormProps {
  onSubmit?: (params: CourseFormParams) => void
}

export interface CourseFormParams {
  courseCode: string
  courseName: string
}
