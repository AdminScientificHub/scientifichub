import AppType, { AppContext, AppInitialProps } from 'next/app'
import { withUserAgent, WithUserAgentProps } from 'next-useragent'
import React from 'react'

import { Page } from '@src/utils/libs/nextjs'
import { GlobalStyles } from '@src/utils/styles/Global'

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

    // Todo => create provider to access this
    // console.log(ua?.isMac)

    return (
      <>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}

export default withUserAgent(App)
