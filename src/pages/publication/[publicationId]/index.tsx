import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useMemo } from 'react'

import { FirestoreDocument } from '@react-firebase/firestore'

import { TextEditor } from '@src/components/_common'
import { TextEditorLayout } from '@src/components/layouts'
import { useTextEditorContext } from '@src/contextes'

export const PublicationItem = () => {
  const { title, editor } = useTextEditorContext()

  const router = useRouter()

  const description = useMemo(() => {
    if (!editor) return

    const { content } = editor?.getJSON()

    const firstParagraph = content.find(({ type }: any) => type === 'paragraph')

    if (!firstParagraph.content) {
      return ''
    }

    return firstParagraph.content[0].text
  }, [editor])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FirestoreDocument path={`/publications/${router.query.publicationId}`}>
        {({ value, isLoading }) => {
          return <TextEditor {...value} isLoading={isLoading} />
        }}
      </FirestoreDocument>
    </>
  )
}

PublicationItem.Layout = TextEditorLayout

export default PublicationItem
