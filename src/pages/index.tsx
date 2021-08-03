import Head from 'next/head'
import React from 'react'

import { TextEditorLayout } from '@src/components/layouts/TextEditor/Layout'

const Home = () => {
  return (
    <>
      <Head>
        <title>Write publication in a data privacy way | ScientificHub</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Hello World</p>
    </>
  )
}

Home.Layout = TextEditorLayout

export default Home
