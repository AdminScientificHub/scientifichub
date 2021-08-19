import React, { FunctionComponent } from 'react'
import { StyledContainer, TStyledDropdownProps } from './Thumbnail.styled'

type TProps = {
  username?: string
} & TStyledDropdownProps

export const Thumbnail: FunctionComponent<TProps> = ({ username = '', ...props }) => {
  return (
    <StyledContainer {...props} align="center" justify="center">
      {username?.charAt(0)}
    </StyledContainer>
  )
}

export type TThumbnailProps = TProps
