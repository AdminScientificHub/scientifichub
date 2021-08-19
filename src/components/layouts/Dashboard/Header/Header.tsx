import { Flex } from '@src/components/core'
import React, { FunctionComponent } from 'react'
import { StyledContainer } from './Header.styled'
import { HeaderProfil } from './Profil'
import { HeaderSearch } from './Search'
import { UserAccountHeader } from './UserAccount'

type TProps = {}

export const HeaderDashboardLayout: FunctionComponent<TProps> = () => {
  return (
    <StyledContainer>
      <UserAccountHeader />
      <Flex justify="between">
        <HeaderSearch />
        <HeaderProfil />
      </Flex>
    </StyledContainer>
  )
}

export type THeaderDashboardLayoutProps = TProps
