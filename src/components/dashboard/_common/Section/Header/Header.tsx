import { Paragraph } from '@src/components/core'
import React, { FunctionComponent, ReactElement } from 'react'
import { StyledContainer } from './Header.styled'

type TProps = {
  title: string
  sideAction?: ReactElement
}

export const DashboardHeaderSection: FunctionComponent<TProps> = ({ title, sideAction }) => {
  return (
    <StyledContainer align="center" justify="between" direction="row">
      <Paragraph size="small" weight={700}>
        {title}
      </Paragraph>
      {sideAction}
    </StyledContainer>
  )
}

export type TDashboardHeaderSectionProps = TProps
