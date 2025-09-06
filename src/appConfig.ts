import { z } from 'zod'

const envSchema = z.object({
  // public
  NEXT_PUBLIC_APP_BASE_URL: z.string().optional().default('').readonly(),
  NEXT_AUTH_URL: z.string().optional().default('').readonly(),
  NEXT_AUTH_SECRET: z.string().optional().default('').readonly(),
})

const appConfig = (() => {
  const env = typeof window === 'undefined' ? process.env : window.__ENV

  return envSchema.safeParse(env).data || ({} as EnvironmentType)
})()

export type EnvironmentType = z.infer<typeof envSchema>

export default appConfig
