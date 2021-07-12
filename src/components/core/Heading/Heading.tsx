import React, { FunctionComponent } from 'react'

import { StyledHeading, TStyledHeadingProps } from './Heading.styled'

type TProps = {} & TStyledHeadingProps

export const Heading: FunctionComponent<TProps> = ({ children, ...props }) => {
  return <StyledHeading {...props}>{children}</StyledHeading>
}

export type THeadingProps = TProps
