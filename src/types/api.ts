export interface BaseErrorResponse {
  statusCode: number
  message: string
  code: string
  correlationId: string
  domain?: string
  error?: string
}
