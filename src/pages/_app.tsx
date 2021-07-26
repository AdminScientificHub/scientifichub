import AppType, { AppContext, AppInitialProps } from 'next/app'
import { withUserAgent, WithUserAgentProps } from 'next-useragent'
import React from 'react'
import { NextWebVitalsMetric } from 'next/app'

import { Page } from '@src/utils/libs/nextjs'
import { GlobalStyles } from '@src/utils/styles/Global'
import Head from 'next/head'
import { AuthProvider, FirebaseProvider, GlobalProvider } from '@src/contextes'

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
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '814483792808420');
  fbq('track', 'PageView');`,
            }}
          />
        </Head>
        <GlobalStyles />
        <GlobalProvider>
          <FirebaseProvider>
            <AuthProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          </FirebaseProvider>
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
