import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useEffect } from 'react'

import { TextEditor } from '@src/components/_common'
import { TextEditorLayout } from '@src/components/layouts/TextEditor/Layout'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/publication/new')
  }, [router])

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

Home.Layout = TextEditorLayout

export default Home
