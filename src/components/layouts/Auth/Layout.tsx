import { useGlobalContext } from '@src/contextes'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyledNoMobileContainer } from '../TextEditor/Layout.styled'
import { StyledBackgroundContainer, StyledContainer, StyledImage } from './Layout.styled'

import NoMobileIllustration from '@src/assets/illustrations/no-mobile.svg'
import { Heading, Link, Paragraph } from '@src/components/core'

type TProps = {}

export const AuthLayout: FunctionComponent<TProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { isMobile } = useGlobalContext()

  const backToHome = () => {
    window.location.href = 'https://www.scientifichub.io/'
  }

  if (isMobile) {
    return (
      <StyledNoMobileContainer direction="column" align="center" justify="center">
        <NoMobileIllustration />
        <Heading textAlign="center" as="h1">
          Our application is not available on mobile for the moment
        </Heading>
        <Paragraph color="text-light" textAlign="center">
          If you think this is a mistake you can{' '}
          <Link href="mailto:maxence@scientifichub.io" size="regular">
            contact us.
          </Link>
          <br />
          Sorry for the inconvenience.
        </Paragraph>
        {mounted && <button onClick={backToHome}>Back to landing page</button>}
      </StyledNoMobileContainer>
    )
  }

  return (
    <StyledContainer>
      {children}
      <StyledBackgroundContainer align="center" justify="center">
        <StyledImage src="https://firebasestorage.googleapis.com/v0/b/scientifichub-a905b.appspot.com/o/Group%20119.png?alt=media&token=b2b2b726-e372-4db6-9266-386547f9a4f3" />
      </StyledBackgroundContainer>
    </StyledContainer>
  )
}

export type TAuthLayoutProps = TProps
