import { Paragraph } from '@src/components/core'
import React, { FunctionComponent } from 'react'
import { StyledContainer } from './Separator.styled'

type TProps = {
  text?: string
  marginVertical?: number
  marginHorizontal?: number
  color?: 'dark' | 'light'
}

export const Separator: FunctionComponent<TProps> = ({
  text,
  marginVertical,
  color = 'light',
  marginHorizontal,
}) => {
  return (
    <StyledContainer
      align="center"
      color={color}
      hasText={!!text}
      marginVertical={marginVertical}
      marginHorizontal={marginHorizontal}
    >
      {text && (
        <Paragraph textAlign="center" size="small" color="text-light">
          {text}
        </Paragraph>
      )}
    </StyledContainer>
  )
}

export type TSeparatorProps = TProps
