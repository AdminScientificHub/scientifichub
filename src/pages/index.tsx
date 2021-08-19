import Head from 'next/head'
import React, { useEffect } from 'react'

import { DashboardLayout } from '@src/components/layouts'
import { useRouter } from 'next/dist/client/router'

const Home = () => {
  const router = useRouter()

  // Redirect to Drafts on page load
  useEffect(() => {
    router.push('/publications/drafts')
  }, [router])

  return (
    <>
      <Head>
        <title>Home | ScientificHub</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

Home.Layout = DashboardLayout

export default Home
