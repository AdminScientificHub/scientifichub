import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useEffect } from 'react'

import { DashboardLayout } from '@src/components/layouts'

export const RedirectToPublications = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/publications/drafts')
  }, [router])

  return (
    <>
      <Head>
        <title>Publications | ScientificHub</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

RedirectToPublications.Layout = DashboardLayout

export default RedirectToPublications
