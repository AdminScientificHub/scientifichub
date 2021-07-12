import { TextEditorLayout } from '@src/components/layouts'
import { TextEditor } from '@src/components/_common'

import Head from 'next/head'
import React from 'react'

export const PublicationPreview = () => {
  return (
    <>
      <Head>
        <title>ScientificHub - Write publication in a data privacy way.</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TextEditor />
    </>
  )
}

PublicationPreview.Layout = TextEditorLayout

export default PublicationPreview
