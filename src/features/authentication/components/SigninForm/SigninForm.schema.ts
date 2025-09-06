import * as z from 'zod'
import { ZodType } from 'zod'
import { SigninParams } from './SigninForm.type'

const schema: ZodType<SigninParams> = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

export default schema
