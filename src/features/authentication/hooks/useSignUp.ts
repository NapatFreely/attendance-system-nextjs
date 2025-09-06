import { useMutation } from '@tanstack/react-query'

import { BaseErrorResponse } from '@/types/api'
import {
  GetSignUpResponse,
  GetSignUpRequest,
} from '@/features/authentication/types'
import { SignUpQueryKeys } from '@/features/authentication/enum'
import { postSignup } from '@/features/authentication/services'

const useSignUp = () => {
  return useMutation<GetSignUpResponse, BaseErrorResponse, GetSignUpRequest>({
    mutationKey: [SignUpQueryKeys.POST_SIGN_UP],
    mutationFn: postSignup,
  })
}

export default useSignUp
