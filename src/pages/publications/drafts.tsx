import Head from 'next/head'
import React from 'react'

import { DashboardLayout } from '@src/components/layouts'
import { DraftsView } from '@src/components/dashboard'

const Drafts = () => {
  return (
    <>
      <Head>
        <title>Drafts | ScientificHub</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DraftsView />
    </>
  )
}

Drafts.Layout = DashboardLayout

export default Drafts
