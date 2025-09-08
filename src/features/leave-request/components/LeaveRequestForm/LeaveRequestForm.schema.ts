import * as z from 'zod'
import { ZodType } from 'zod'
import { LeaveRequestFormParams } from './LeaveRequestForm.type'

const schema: ZodType<LeaveRequestFormParams> = z.object({
  courseId: z.number().min(1, 'This is required'),
  sessionId: z.number().min(1, 'This is required'),
  reason: z.string().min(1, 'This is required'),
  attachmentFile: z.instanceof(File).optional(),
})

export default schema
