import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React from 'react'

import styled from '@emotion/styled'

import ErrorIllusation from '@src/assets/illustrations/error-publication.svg'
import { Flex, Heading, Link, Paragraph } from '@src/components/core'
import { ErrorLayout } from '@src/components/layouts'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

const StyledContainer = styled(Flex)(() => {
  return {
    height: 'calc(100vh - 4rem)',
    maxWidth: '60%',
    margin: '0 auto',
    svg: {
      width: '30%',
      minWidth: '30rem',
      marginBottom: '3.2rem',
    },
    h1: {
      marginBottom: '1.6rem',
    },
    button: {
      marginTop: '3.2rem',
      padding: '.8rem 2.4rem',
      borderRadius: '.4rem',
      border: 'none',
      color: '#fff',
      backgroundColor: '#3654D1',
      fontSize: '1.6rem',
      fontWeight: 700,
      lineHeight: '2rem',
      transition: 'all .2s ease',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: lightenDarkenColor('#3654D1', -20),
      },
    },
  }
})

export const PublicationItemError = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>ScientificHub - 404 Cannot find publication</title>
        <meta
          name="description"
          content="Discover and share knowledge with the best's scientific around the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer direction="column" align="center" justify="center">
        <ErrorIllusation />
        <Heading as="h1">We couldn’t find the publication</Heading>
        <Paragraph color="text-light" textAlign="center">
          If you think this is a mistake you can{' '}
          <Link href="mailto:maxence@scientifichub.io" size="regular">
            contact us
          </Link>
          , otherwise contact the person who sent you the link.
        </Paragraph>

        <button onClick={() => router.push('/publication/new')}>Back to publication</button>
      </StyledContainer>
    </>
  )
}

PublicationItemError.Layout = ErrorLayout

export default PublicationItemError
