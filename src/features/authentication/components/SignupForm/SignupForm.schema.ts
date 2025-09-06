import * as z from 'zod'
import { ZodType } from 'zod'
import { SignupParams } from './SignupForm.type'
import { RoleEnum } from '../../enum/role'

const schema: ZodType<SignupParams> = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    name: z.string().min(1, 'This is required'),
    role: z.string().min(1, 'This is required'),
    department: z.string().optional(),
    studentCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === RoleEnum.STUDENT) {
      if (!data.department) {
        ctx.addIssue({
          path: ['department'],
          message: 'Department is required for students',
          code: 'custom',
        })
      }
      if (!data.studentCode) {
        ctx.addIssue({
          path: ['studentCode'],
          message: 'Student code is required for students',
          code: 'custom',
        })
      }
    }
  })

export default schema
