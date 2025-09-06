import * as z from 'zod'
import { ZodType } from 'zod'
import { LeaveRequestFormParams } from './LeaveRequestForm.type'

const schema: ZodType<LeaveRequestFormParams> = z.object({
  studentId: z.string(),
  name: z.string(),
  courseId: z.string(),
  courseName: z.string(),
  sessionId: z.string(),
  reason: z.string(),
  attachmentFile: z.instanceof(File),
})

export default schema
