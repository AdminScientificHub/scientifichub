import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useEffect } from 'react'

import { TextEditorLayout } from '@src/components/layouts'

export const RedirectToPublication = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/publications')
  }, [router])

  return (
    <>
      <Head>
        <title>Publication | ScientificHub</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

RedirectToPublication.Layout = TextEditorLayout

export default RedirectToPublication
