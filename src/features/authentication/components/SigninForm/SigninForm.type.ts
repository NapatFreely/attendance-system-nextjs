export interface SigninFormProps {
  onSubmit?: (params: SigninParams) => void
}

export interface SigninParams {
  email: string
  password: string
}
