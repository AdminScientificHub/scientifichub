import { Paragraph } from '@src/components/core'
import React, { FunctionComponent } from 'react'
import { StyledContainer } from './Separator.styled'

type TProps = {
  text: string
}

export const Separator: FunctionComponent<TProps> = ({ text }) => {
  return (
    <StyledContainer align="center">
      <Paragraph textAlign="center" size="small" color="text-light">
        {text}
      </Paragraph>
    </StyledContainer>
  )
}

export type TSeparatorProps = TProps
