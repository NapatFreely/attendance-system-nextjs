import appConfig from '@/appConfig'
import { joinString } from '@/helpers/joinString'

const BASE_URL = ''

export const removeTrailingSlash = (path: string): string => {
  return path.endsWith('/') ? path.slice(0, -1) : path
}

export const imageFilePath = ({
  folderPath,
  fileName,
  options,
}: {
  folderPath: string
  fileName: string
  options?: {
    width?: number
    height?: number
    quality?: number
  }
}): string => {
  const params = []

  if (!!options?.width) {
    params.push(`width=${options.width}`)
  }

  if (!!options?.height) {
    params.push(`height=${options.height}`)
  }

  if (!!options?.quality) {
    params.push(`quality=${options.quality}`)
  }
  params.push('f=auto')

  return `${joinString('/')(
    removeTrailingSlash(BASE_URL),
    params.join(','),
    removeTrailingSlash(folderPath),
    removeTrailingSlash(fileName)
  )}`
}
