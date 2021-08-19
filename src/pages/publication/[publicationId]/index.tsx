import Head from 'next/head'
import React from 'react'

import { TextEditorLayout } from '@src/components/layouts'
import { usePublicationContext } from '@src/contextes'

export const PublicationItem = () => {
  const { publication } = usePublicationContext()

  return (
    <>
      <Head>
        <title>{publication?.title}</title>
        <meta name="description" content={publication?.description} />
        <meta name="image" content={publication?.coverUrl} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

PublicationItem.Layout = TextEditorLayout

export default PublicationItem
