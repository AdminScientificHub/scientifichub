import Head from 'next/head'
import React from 'react'

import { DashboardLayout } from '@src/components/layouts'
import { PublishedView } from '@src/components/dashboard'

const Published = () => {
  return (
    <>
      <Head>
        <title>Published | ScientificHub</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublishedView />
    </>
  )
}

Published.Layout = DashboardLayout

export default Published
