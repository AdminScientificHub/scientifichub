import React, { FunctionComponent } from 'react'

import { StyledContainer, TFlexStyles } from './Flex.styled'

type TProps = {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  forwardRef?: React.Ref<HTMLDivElement>
} & TFlexStyles

export const Flex: FunctionComponent<TProps> = ({ forwardRef, children, ...props }) => {
  return (
    <StyledContainer ref={forwardRef} {...props}>
      {children}
    </StyledContainer>
  )
}

Flex.defaultProps = {
  direction: 'row',
  justify: 'default',
}

export type TFlexProps = TProps
