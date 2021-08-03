import AppType, { AppContext, AppInitialProps } from 'next/app'
import { withUserAgent, WithUserAgentProps } from 'next-useragent'
import React from 'react'
import { NextWebVitalsMetric } from 'next/app'

import { Page } from '@src/utils/libs/nextjs'
import { GlobalStyles } from '@src/utils/styles/Global'
import Head from 'next/head'
import { AlertProvider, AuthProvider, FirebaseProvider, GlobalProvider } from '@src/contextes'
import { AppScripts } from '@src/utils/libs/scripts'

class App extends AppType<AppContext & WithUserAgentProps & {}, AppInitialProps> {
  static async getInitialProps(ctx: any) {
    const pageProps = {}

    return {
      pageProps,
      useragent: ctx?.ua?.source,
      isServer: !!ctx.req,
    }
  }

  render() {
    const { Component, pageProps } = this.props

    const Layout = (Component as Page)?.Layout || null

    // const { ua } = this.props as WithUserAgentProps
    // console.log(ua?.isMac)

    return (
      <>
        <Head>
          <AppScripts />
        </Head>
        <GlobalStyles />
        <GlobalProvider>
          <AlertProvider>
            <FirebaseProvider>
              <AuthProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AuthProvider>
            </FirebaseProvider>
          </AlertProvider>
        </GlobalProvider>
      </>
    )
  }
}

export const reportWebVitals = ({ id, name, label, value }: NextWebVitalsMetric): any => {
  ;(window as any).gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

export default withUserAgent(App)
