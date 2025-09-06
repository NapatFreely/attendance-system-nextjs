import axios from 'axios'

// import appConfig from '@/appConfig';
import { cookieManager } from '@/helpers/cookies'

const JWT_KEY = 'kpc_jwt' as const //NOTE: jwt key in cookies
const cookieStore = cookieManager()
const accessToken = cookieStore.get(JWT_KEY)

/**
 * Instantiate a new axios client for making API requests.
 * The client is configured with the base URL and timeout settings from the appConfig.
 * It also includes a default Authorization header with the access token stored in the cookies.
 *
 * @returns {AxiosInstance} The configured axios client.
 */
export const apiClient = axios.create({
  // Set the base URL for all API requests
  baseURL: 'https://jsonplaceholder.typicode.com',

  // Set the request timeout to 5 seconds
  timeout: 5000,

  // Set the default headers for all requests
  // The ContentType header is set to 'application/json' for JSON payloads
  // The Authorization header is set to the access token stored in the cookies
  headers: {
    ContentType: 'application/json',
    Authorization: accessToken,
  },
})
