import { Flex } from '@src/components/core'
import React, { FunctionComponent, ReactElement } from 'react'
import { DashboardHeaderSection } from './Header'
import { StyledContainer } from './Section.styled'

type TProps = {
  title: string
  sideAction?: ReactElement
}

export const DashboardSection: FunctionComponent<TProps> = ({ title, sideAction, children }) => {
  return (
    <Flex direction="column">
      <DashboardHeaderSection title={title} sideAction={sideAction} />
      <StyledContainer>{children}</StyledContainer>
    </Flex>
  )
}

export type TDashboardSectionProps = TProps
