export const joinString =
  (separator = '') =>
  (
    ...args: Array<string | number | undefined>
  ): string | number | undefined => {
    return args.reduce((result, value) => {
      if (typeof value === 'number') value = `${value}`
      if (result) {
        if (value) {
          return `${result}${separator}${value}`
        } else {
          return result
        }
      } else {
        return value ?? ''
      }
    }, '')
  }

export const joinStringWithDash = joinString('-')
export const joinStringWithSpace = joinString(' ')
export const joinStringWithComma = joinString(', ')
