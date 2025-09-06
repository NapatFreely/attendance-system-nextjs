import * as z from 'zod'
import { ZodType } from 'zod'
import { CreateQrCodeFormParams } from './CreateQrCodeForm.type'

const schema: ZodType<CreateQrCodeFormParams> = z.object({
  studentId: z.string(),
  name: z.string(),
})

export default schema
