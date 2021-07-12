import React, { FunctionComponent } from 'react'
import { StyledContainer, TSpanStyles } from './Span.styled'

type TProps = {} & TSpanStyles

export const Span: FunctionComponent<TProps> = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}

Span.defaultProps = {
  color: 'default',
  size: 'regular',
}

export type TSpanProps = TProps
