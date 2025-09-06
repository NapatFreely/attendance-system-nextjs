import dynamic from 'next/dynamic'

export const LoginPage = dynamic(() => import('./Login'))
export const SigninPage = dynamic(() => import('./Signin'))
export const SignupPage = dynamic(() => import('./Signup'))
