export interface SignupFormProps {
  onSubmit?: (params: SignupParams) => void
}

export interface SignupParams {
  role: string
  name: string
  email: string
  password: string
}
