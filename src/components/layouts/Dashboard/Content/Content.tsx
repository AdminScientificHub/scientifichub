import React, { FunctionComponent } from 'react'
import { StyledContainer } from './Content.styled'

type TProps = {}

export const ContentDashboardLayout: FunctionComponent<TProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>
}

export type TContentDashboardLayoutProps = TProps
