import { Flex } from '@src/components/core'
import React, { FunctionComponent } from 'react'
import { AlertComponentProps } from 'react-alert'
import { StyledSubtitle, StyledTitle } from './AlertContent.styled'

type TProps = {
  title: string
  subtitle: string
  type: AlertComponentProps['options']['type']
}

export const AlertContent: FunctionComponent<TProps> = ({ title, subtitle, type }) => {
  console.log('type', type)
  return (
    <Flex direction="column">
      <StyledTitle type={type}>{title}</StyledTitle>
      <StyledSubtitle type={type}>{subtitle}</StyledSubtitle>
    </Flex>
  )
}

export type TAlertContentProps = TProps
