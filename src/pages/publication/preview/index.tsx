import Head from 'next/head'
import React from 'react'

import { TextEditorLayout } from '@src/components/layouts'
import { usePublicationContext } from '@src/contextes'

export const PublicationPreview = () => {
  const { publication } = usePublicationContext()

  return (
    <>
      <Head>
        <title>{publication?.title || 'Preview'} | ScientificHub</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

PublicationPreview.Layout = TextEditorLayout

export default PublicationPreview
