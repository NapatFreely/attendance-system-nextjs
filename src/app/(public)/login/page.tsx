import { redirect } from 'next/navigation'

import { LoginPage } from '@/features/authentication/pages'
import { Route } from '@/types/route.type'

const Page = async () => {
  // const session = await getServerSession()

  // if (session?.user) {
  //   redirect(Route.LOGIN)
  // }

  return <LoginPage />
}

export default Page
