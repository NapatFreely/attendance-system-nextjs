import { EnvironmentType } from '@/appConfig'

export const PUBLIC_ENV_KEY = '__ENV'
export const getPublicEnv = (env: EnvironmentType) => {
  const runtimeEnv = Object.keys(env)
    .filter((key) => key.startsWith('NEXT_PUBLIC_'))
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: env?.[key as keyof typeof env],
      }
    }, {}) as EnvironmentType

  return runtimeEnv
}

export default getPublicEnv
