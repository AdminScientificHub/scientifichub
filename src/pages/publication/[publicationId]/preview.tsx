import Head from 'next/head'
import React from 'react'

import { TextEditorLayout } from '@src/components/layouts'
import { useTextEditorContext } from '@src/contextes'

export const PreviewPublicationItem = () => {
  const { title } = useTextEditorContext()

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

PreviewPublicationItem.Layout = TextEditorLayout

export default PreviewPublicationItem
