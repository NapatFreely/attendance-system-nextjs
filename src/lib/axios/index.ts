import axios from 'axios'

import appConfig from '@/appConfig'
import { REFRESH_ACCESS_TOKEN_ERROR } from '@/constants'
import { LocalStorageKey } from '@/types/local-storage'
import Router from 'next/router'
import { Route } from '@/types/route.type'

const axiosClient = axios.create({
  baseURL: `${appConfig.NEXT_PUBLIC_APP_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: 'fetch',
  fetchOptions: {
    credentials: 'omit',
  },
  // Add other configurations like interceptors if needed
})

axiosClient.interceptors.request.use(
  async (config) => {
    let accessToken = ''

    if (
      config.baseURL === `${appConfig.NEXT_PUBLIC_APP_BASE_URL}` &&
      config.fetchOptions
    ) {
      config.fetchOptions.credentials = 'include'
    }

    accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) ?? ''

    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    // Handle responses or errors globally
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // attempt to read a new token (from localStorage or refresh flow)
        const newAccessToken = localStorage.getItem(
          LocalStorageKey.ACCESS_TOKEN
        )

        if (newAccessToken) {
          // update the header and retry request
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosClient(originalRequest)
        }

        // if no token available, force login
        localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
        Router.push(Route.LOGIN)
      } catch (err) {
        Router.push(Route.LOGIN)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient
