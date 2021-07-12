import React from 'react'
import { TextEditorLayout } from '@src/components/layouts'
import { TextEditor } from '@src/components/_common'
import Head from 'next/head'
import { NewDocumentModal } from '@src/components/_common/Modal/_variants'
import { useTextEditorContext } from '@src/contextes'

export const NewPublication = () => {
  const { isNewDocumentModalOpen, setIsNewDocumentModalOpen } = useTextEditorContext()

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
      <NewDocumentModal
        isModalOpen={isNewDocumentModalOpen}
        closeModal={() => setIsNewDocumentModalOpen(false)}
      />
      <TextEditor />
    </>
  )
}

NewPublication.Layout = TextEditorLayout

export default NewPublication
