export interface GetQrCodeRequest {
  studentId: number
  qrValue: string
  generatedAt: string
  expiredAt: string
}

export interface GetQrCodeResponse {
  id: number
  studentId: number
  qrValue: string
  generatedAt: string
  expiredAt: string
}
