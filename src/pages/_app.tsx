import AppType, { AppContext, AppInitialProps } from 'next/app'
import { withUserAgent, WithUserAgentProps } from 'next-useragent'
import React from 'react'
import { NextWebVitalsMetric } from 'next/app'

import { Page } from '@src/utils/libs/nextjs'
import { GlobalStyles } from '@src/utils/styles/Global'
import Head from 'next/head'

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
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=G-HEX2M4ZB52`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HEX2M4ZB52', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2429082,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`,
            }}
          />
        </Head>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}

export const reportWebVitals = ({ id, name, label, value }: NextWebVitalsMetric) => {
  ;(window as any).gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

export default withUserAgent(App)
