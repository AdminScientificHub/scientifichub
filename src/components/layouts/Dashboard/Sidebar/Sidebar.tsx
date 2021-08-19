import { Flex, Paragraph } from '@src/components/core'
import { Separator } from '@src/components/_common'
import React, { FunctionComponent, useMemo } from 'react'
import { StyledContainer, StyledListItem } from './Sidebar.styled'

import DraftIcon from '@src/assets/icons/draft.svg'
import PublishedIcon from '@src/assets/icons/published.svg'
import CommunityIcon from '@src/assets/icons/community.svg'
import RightArrowIcon from '@src/assets/icons/right-arrow.svg'
import { useRouter } from 'next/dist/client/router'

type TProps = {}

export const SidebarDashboardLayout: FunctionComponent<TProps> = () => {
  const router = useRouter()

  const isOnboarding = useMemo(() => router.pathname === '/user/onboarding', [router])

  return (
    <StyledContainer direction="column">
      {!isOnboarding && (
        <>
          <StyledListItem
            isActive={router.pathname === '/publications/drafts'}
            onClick={() => router.push('/publications/drafts')}
          >
            <DraftIcon />
            <Paragraph size="xsmall">Drafts</Paragraph>
          </StyledListItem>
          <StyledListItem
            isActive={router.pathname === '/publications/published'}
            onClick={() => router.push('/publications/published')}
          >
            <PublishedIcon />
            <Paragraph size="xsmall">Published</Paragraph>
          </StyledListItem>
          <Separator marginVertical={0.8} marginHorizontal={1.6} color="dark" />
          <StyledListItem justify="between" inactive>
            <Flex>
              <CommunityIcon />
              <Paragraph size="xsmall">Community</Paragraph>
            </Flex>
            <RightArrowIcon />
          </StyledListItem>
        </>
      )}
    </StyledContainer>
  )
}

export type TSidebarDashboardLayoutProps = TProps
