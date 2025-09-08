import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import {
  GetSignInRequest,
  GetSignInResponse,
} from '@/features/authentication/types'
import { SignInQueryKeys } from '@/features/authentication/enum'
import { postSignin } from '@/features/authentication/services'

const useSignIn = () => {
  return useMutation<GetSignInResponse, BaseErrorResponse, GetSignInRequest>({
    mutationKey: [SignInQueryKeys.POST_SIGN_IN],
    mutationFn: postSignin,
  })
}

export default useSignIn
