import React, { FunctionComponent } from 'react'
import { StyledBackgroundContainer, StyledContainer } from './Layout.styled'

type TProps = {}

export const AuthLayout: FunctionComponent<TProps> = ({ children }) => {
  return (
    <StyledContainer>
      {children}
      <StyledBackgroundContainer align="center" justify="center" />
    </StyledContainer>
  )
}

export type TAuthLayoutProps = TProps
