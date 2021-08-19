import { Flex, Paragraph } from '@src/components/core'
import { DropDown, Thumbnail, Separator } from '@src/components/_common'
import { useAuthContext } from '@src/contextes'
import React, { FunctionComponent, useMemo, useState } from 'react'

import LogoShortIcon from '@src/assets/icons/logo-short.svg'
import CommunityIcon from '@src/assets/icons/community.svg'

import {
  StyledAccountNavigation,
  StyledDropHeader,
  StyledDrop,
  StyledDropItem,
  StyledCommunityUser,
} from './UserAccount.styled'
import { useRouter } from 'next/dist/client/router'

type TProps = {}

export const UserAccountHeader: FunctionComponent<TProps> = () => {
  const [isUserDropOpen, setIsUserDropOpen] = useState(false)

  const { user } = useAuthContext()
  const router = useRouter()

  const isOnboarding = useMemo(() => router.pathname === '/user/onboarding', [router])

  return (
    <StyledAccountNavigation
      direction="row"
      align="center"
      justify="center"
      isClickable={!isOnboarding}
    >
      <DropDown
        targetMargin={4}
        withChevron
        isOpen={isUserDropOpen}
        onOpenChange={setIsUserDropOpen}
        header={
          <StyledDropHeader align="center" justify="center">
            <LogoShortIcon />
            <Flex align="center" justify="center">
              <Flex direction="column">
                <Paragraph size="xsmall" color="text-white">
                  {user?.firstName} {user?.lastName}
                </Paragraph>
                <Paragraph size="xxsmall" color="text-lighter">
                  {user?.email}
                </Paragraph>
              </Flex>
            </Flex>
          </StyledDropHeader>
        }
      >
        <StyledDrop direction="column">
          <StyledDropItem notClickable>
            <Paragraph color="text-lighter" size="xsmall">
              {user?.email}
            </Paragraph>
          </StyledDropItem>
          <StyledDropItem active onClick={() => setIsUserDropOpen(false)}>
            <Thumbnail username={user?.firstName} />
            <Paragraph color="text-white" size="xsmall">
              {user?.firstName} {user?.lastName}
            </Paragraph>
          </StyledDropItem>
          <Separator marginVertical={0.4} />
          <StyledDropItem disabled>
            <CommunityIcon />
            <Flex direction="row">
              <Paragraph color="text-white" size="xsmall">
                Community
              </Paragraph>
              <StyledCommunityUser color="text-lighter" size="xsmall">
                {user?.email}
              </StyledCommunityUser>
            </Flex>
          </StyledDropItem>
        </StyledDrop>
      </DropDown>
    </StyledAccountNavigation>
  )
}

export type TUserAccountHeaderProps = TProps
