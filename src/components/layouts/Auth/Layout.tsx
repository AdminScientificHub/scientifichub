import React, { FunctionComponent } from 'react'
import { StyledBackgroundContainer, StyledContainer } from './Layout.styled'

type TProps = {}

export const AuthLayout: FunctionComponent<TProps> = ({ children }) => {
  return (
    <StyledContainer>
      {children}
      <StyledBackgroundContainer align="center" justify="center">
        <image src="/images/auth-background.png" />
      </StyledBackgroundContainer>
    </StyledContainer>
  )
}

export type TAuthLayoutProps = TProps
