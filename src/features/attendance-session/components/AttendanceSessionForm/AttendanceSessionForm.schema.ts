import * as z from 'zod'
import { ZodType } from 'zod'
import { AttendanceSessionFormParams } from './AttendanceSessionForm.type'

const schema: ZodType<AttendanceSessionFormParams> = z.object({
  courseId: z.number().min(1, 'This is required'),
  sessionId: z.string().min(1, 'This is required'),
  sessionDate: z.string().min(1, 'This is required'),
  semester: z.string().min(1, 'This is required'),
})

export default schema
