import * as z from 'zod'
import { ZodType } from 'zod'
import { CourseFormParams } from './CourseForm.type'

const schema: ZodType<CourseFormParams> = z.object({
  courseCode: z.string().min(1, 'This is required'),
  courseName: z.string().min(1, 'This is required'),
})

export default schema
