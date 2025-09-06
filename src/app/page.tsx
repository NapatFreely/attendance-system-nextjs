import { redirect } from 'next/navigation'

import { Route } from '@/types/route.type'

const Home = async () => {
  return redirect(Route.LOGIN)
}

export default Home
