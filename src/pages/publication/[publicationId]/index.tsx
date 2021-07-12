import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React from 'react'

import { FirestoreDocument } from '@react-firebase/firestore'

import { TextEditor } from '@src/components/_common'
import { TextEditorLayout } from '@src/components/layouts'

export const PublicationItem = () => {
  const router = useRouter()

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
