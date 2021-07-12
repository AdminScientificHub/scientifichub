import React, { FunctionComponent } from 'react'

import { StyledContainer, TLinkStyles } from './Link.styled'

type TProps = {
  onClick?: () => void
  href?: string
  target?: '_blank'
} & TLinkStyles

export const Link: FunctionComponent<TProps> = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}

export type TLinkProps = TProps
