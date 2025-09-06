import { EnvironmentType } from '@/appConfig'

import { PUBLIC_ENV_KEY } from './getPublicEnv'

type RuntimeEnvPropsType = {
  env: EnvironmentType
}

export const RuntimeEnv = ({ env }: RuntimeEnvPropsType) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window['${PUBLIC_ENV_KEY}']=${JSON.stringify(env)}`,
      }}
      id="runtime-env"
    />
  )
}

export default RuntimeEnv
