import React from 'react'
import Head from 'next/head'
import { AuthLayout } from '@src/components/layouts'
import { SigninView } from '@src/components/auth/Signin/View'

export const SigninPage = () => {
  return (
    <>
      <Head>
        <title>First steps | ScientificHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SigninView />
    </>
  )
}

SigninPage.Layout = AuthLayout

export default SigninPage
