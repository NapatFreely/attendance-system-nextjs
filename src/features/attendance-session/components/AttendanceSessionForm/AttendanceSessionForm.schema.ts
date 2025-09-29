import * as z from 'zod'
import { ZodType } from 'zod'
import { AttendanceSessionFormParams } from './AttendanceSessionForm.type'

const schema: ZodType<AttendanceSessionFormParams> = z
  .object({
    courseCode: z.string().optional(),
    courseName: z.string().optional(),
    courseId: z.string().optional(),
    sessionId: z.string().min(1, 'This is required'),
    sessionDate: z.string().min(1, 'This is required'),
    semester: z.string().min(1, 'This is required'),
  })
  .superRefine(async (data, ctx) => {
    const codeFilled = data.courseCode && data.courseCode.trim() !== ''
    const nameFilled = data.courseName && data.courseName.trim() !== ''
    const idFilled = data.courseId && data.courseId.trim() !== ''

    if (codeFilled && nameFilled && idFilled) {
      ctx.addIssue({
        path: ['courseId'],
        message: 'Cannot fill courseId, courseCode and courseName',
        code: 'custom',
      })
      ctx.addIssue({
        path: ['courseCode'],
        message: 'Cannot fill courseId, courseCode and courseName',
        code: 'custom',
      })
      ctx.addIssue({
        path: ['courseName'],
        message: 'Cannot fill courseId, courseCode and courseName',
        code: 'custom',
      })
      return
    }

    if (idFilled) return

    // Case 1: ไม่มีข้อมูลใด ๆ → error
    if (!codeFilled && !nameFilled && !idFilled) {
      ctx.addIssue({
        path: ['courseId'],
        message: 'Either fill courseId or both courseCode and courseName',
        code: 'custom',
      })
      ctx.addIssue({
        path: ['courseCode'],
        message: 'Either fill courseId or both courseCode and courseName',
        code: 'custom',
      })
      ctx.addIssue({
        path: ['courseName'],
        message: 'Either fill courseId or both courseCode and courseName',
        code: 'custom',
      })
      return
    }

    // Case 2: courseCode หรือ courseName ถูกกรอก → ทั้งคู่ต้องกรอก
    if (!codeFilled || !nameFilled) {
      if (!codeFilled) {
        ctx.addIssue({
          path: ['courseCode'],
          message: 'This is required',
          code: 'custom',
        })
      }
      if (!nameFilled) {
        ctx.addIssue({
          path: ['courseName'],
          message: 'This is required',
          code: 'custom',
        })
      }
    }
  })

export default schema
