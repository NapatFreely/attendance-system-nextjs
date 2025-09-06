import React from 'react'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata, Viewport } from 'next'
import { Kanit } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import ThemeProvider from '@/context/ThemeProvider'
import { getPublicEnv, RuntimeEnv } from '@/utils/runtime-env'
import { QueryClientProvider } from '@/utils/tanstack'
import { getQueryClient } from '@/utils/tanstack/createQueryClient'

import 'react-quill/dist/quill.snow.css'
import '../styles/variables.css'
import './globals.css'
import {
  BlockBrowserNavigation,
  NavigationBlockerProvider,
} from '@/context/NavigationBlockerProvider'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Checkin Student',
}

const font = Kanit({
  weight: '400',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  const queryClient = getQueryClient()
  const publicEnv = getPublicEnv(process.env)

  // * Example for pre-fetching data (if needed)
  // await queryClient.prefetchQuery({
  //   queryKey: [ServiceQueryKeys[KEY], variables],
  //   queryFn: async () => await fetchService(variables),
  // })

  /**
   * Dehydrate the query client state to be used on the client side.
   * This function takes the query client state and serializes it to be sent
   * to the client. The serialized state can be used to rehydrate the query
   * client on the client side.
   *
   * @return {DehydratedState} The dehydrated query client state.
   */
  const dehydratedState = dehydrate(queryClient)
  // The dehydrated state is a serialized version of the query client state.
  // It is used to rehydrate the query client on the client side.

  return (
    <html lang="en" className={font.className}>
      <head>
        <RuntimeEnv env={publicEnv} />
        <meta name="viewport" content="viewport-fit=cover" />
      </head>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <QueryClientProvider>
              <HydrationBoundary state={dehydratedState}>
                <NavigationBlockerProvider>
                  <BlockBrowserNavigation />
                  {children}
                </NavigationBlockerProvider>
              </HydrationBoundary>
            </QueryClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
