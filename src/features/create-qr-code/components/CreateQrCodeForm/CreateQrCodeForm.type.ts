export interface CreateQrCodeFormProps {
  onSubmit?: (params: CreateQrCodeFormParams) => void
}

export interface CreateQrCodeFormParams {
  studentId: string
  name: string
}
