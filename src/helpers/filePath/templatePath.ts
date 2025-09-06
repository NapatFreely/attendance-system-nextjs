import appConfig from '@/appConfig'
import { joinString } from '@/helpers/joinString'

import { removeTrailingSlash } from './imageFilePath'

interface TemplatePathProps {
  directory: string
  fileName: string
}

export const templatePath = ({ directory, fileName }: TemplatePathProps) => {
  const url = joinString('/')(
    removeTrailingSlash(`${appConfig.NEXT_PUBLIC_APP_BASE_URL}/api/proxy`),
    removeTrailingSlash(directory),
    removeTrailingSlash(fileName)
  ) as string

  return url
}
