export interface GetSignUpRequest {
  name: string
  email: string
  role: number
  password: string
  studentCode?: string
  department?: string
}

export interface SignUp {
  id: number
  name: string
  email: string
  role: string
}

export interface AccessToken {
  accessToken: string
}

export interface GetSignInRequest {
  email: string
  password: string
}

export interface GetSignUpResponse {
  data: SignUp
}

export interface GetSignInResponse {
  role: number
  accessToken: string
}

export interface GetUserResponse extends SignUp {
  userId: number
  studentCode?: string
  department?: string
}
