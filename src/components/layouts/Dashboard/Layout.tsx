import { Heading, Link, Paragraph } from '@src/components/core'
import { useGlobalContext } from '@src/contextes'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { StyledNoMobileContainer } from '../TextEditor/Layout.styled'
import { ContentDashboardLayout } from './Content'
import { HeaderDashboardLayout } from './Header'
import { StyledContainer } from './Layout.styled'
import { SidebarDashboardLayout } from './Sidebar'

import NoMobileIllustration from '@src/assets/illustrations/no-mobile.svg'

type TProps = {}

export const DashboardLayout: FunctionComponent<TProps> = ({ children }) => {
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
      <HeaderDashboardLayout />
      <div>
        <SidebarDashboardLayout />
        <ContentDashboardLayout>{children}</ContentDashboardLayout>
      </div>
    </StyledContainer>
  )
}

export type TDashboardLayoutProps = TProps
