import React from 'react'
import Head from 'next/head'
import { SignupView } from '@src/components/auth/Signup/View'
import { AuthLayout } from '@src/components/layouts'

export const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up | ScientificHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignupView />
    </>
  )
}

SignupPage.Layout = AuthLayout

export default SignupPage
