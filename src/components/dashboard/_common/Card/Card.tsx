import { Paragraph } from '@src/components/core'
import React, { FunctionComponent, ReactElement } from 'react'
import { StyledContainer, StyledContent } from './Card.styled'

import PlusIcon from '@src/assets/icons/plus.svg'

type TProps = {
  title: string
  description: string
  icon: ReactElement
  onClick: () => void
}

export const DashboardCard: FunctionComponent<TProps> = ({ title, description, icon, onClick }) => {
  return (
    <StyledContainer align="start" direction="row" onClick={onClick}>
      <StyledContent direction="column" align="start">
        {icon}
        <Paragraph size="small" weight={700}>
          {title}
        </Paragraph>
        <Paragraph size="xsmall" color="text-light">
          {description}
        </Paragraph>
      </StyledContent>
      <PlusIcon />
    </StyledContainer>
  )
}

export type TDashboardCardProps = TProps
