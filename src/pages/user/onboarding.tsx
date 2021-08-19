import React from 'react'
import Head from 'next/head'
import { DashboardLayout } from '@src/components/layouts'
import { UserOnboardingView } from '@src/components/user'

export const SigninPage = () => {
  return (
    <>
      <Head>
        <title>First Steps | ScientificHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserOnboardingView />
    </>
  )
}

SigninPage.Layout = DashboardLayout

export default SigninPage
