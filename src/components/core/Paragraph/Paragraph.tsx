import React, { FunctionComponent, useMemo } from 'react'

import { StyledContainer, TParagraphStyles } from './Paragraph.styled'

type TProps = {
  title?: string
  onClick?: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void
} & TParagraphStyles

export const Paragraph: FunctionComponent<TProps> = ({ children, ...props }) => {
  const updatedChildren = useMemo(() => {
    return React.Children.toArray(children).map(item => {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, { ...props, ...item.props })
      }

      return item
    })
  }, [children, props])

  return <StyledContainer {...props}>{updatedChildren}</StyledContainer>
}

Paragraph.defaultProps = {
  color: 'default',
  size: 'regular',
  weight: 500,
}

export type TParagraphProps = TProps
