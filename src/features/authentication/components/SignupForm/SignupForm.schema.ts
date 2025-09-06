import * as z from 'zod'
import { ZodType } from 'zod'
import { SignupParams } from './SignupForm.type'

const schema: ZodType<SignupParams> = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  name: z.string(),
  role: z.string(),
})

export default schema
