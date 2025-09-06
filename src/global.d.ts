import { EnvironmentType } from './appConfig'

declare global {
  interface Window {
    __ENV: EnvironmentType
  }
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentType {
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}
