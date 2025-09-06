/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as cookiesNext from 'cookies-next'
import { OptionsType } from 'cookies-next/lib/types'

/**
 * @description Use this function to manage cookies in the browser and server side
 * @example
 * ```ts
 * const cookieStore = cookieManager()
 * // Set a cookie
 * cookieStore.set('cookieName', 'cookieValue', { expires: 1 })
 * // Get a cookie
 * cookieStore.get('cookieName')
 * // Get all cookies
 * cookieStore.getAll()
 * // Check if a cookie exists
 * cookieStore.has('cookieName')
 * // Remove a cookie
 * cookieStore.remove('cookieName')
 * ```
 */
export const cookieManager = () => {
  // If the code is running in the server side, the `next/headers` module is required to get the cookies
  const nextHeadersCookies =
    typeof window === 'undefined' ? require('next/headers').cookies : undefined

  const get = (name: string, options?: OptionsType) => {
    try {
      return cookiesNext.getCookie(name, {
        ...options,
        cookies: nextHeadersCookies,
      })
    } catch (error) {
      console.error(
        '`cookieManager` was thrown an error in `get` function',
        error
      )
      return undefined
    }
  }

  const getAll = (options?: OptionsType) => {
    try {
      return cookiesNext.getCookies({
        ...options,
        cookies: nextHeadersCookies,
      })
    } catch (error) {
      console.error(
        '`cookieManager` was thrown an error in `getAll` function',
        error
      )
      return undefined
    }
  }

  const has = (name: string, options?: OptionsType) => {
    try {
      return cookiesNext.hasCookie(name, {
        ...options,
        cookies: nextHeadersCookies,
      })
    } catch (error) {
      console.error(
        '`cookieManager` was thrown an error in `has` function',
        error
      )
      return false
    }
  }

  const set = (name: string, value: string, options?: OptionsType) => {
    try {
      cookiesNext.setCookie(name, value, {
        ...options,
        cookies: nextHeadersCookies,
      })
    } catch (error) {
      console.error(
        '`cookieManager` was thrown an error in `set` function',
        error
      )
    }
  }

  const remove = (name: string, options?: OptionsType) => {
    try {
      cookiesNext.deleteCookie(name, {
        ...options,
        cookies: nextHeadersCookies,
      })
    } catch (error) {
      console.error(
        '`cookieManager` was thrown an error in `remove` function',
        error
      )
    }
  }

  return {
    get,
    getAll,
    has,
    set,
    remove,
  }
}
