import { Flex, Paragraph } from '@src/components/core'
import React, { FunctionComponent } from 'react'
import { StyledButton, StyledContent, StyledForm, StyledHeader, StyledTitle } from './Steps.styled'

type TProps = {
  step: number
  header: string
  subtitle: string
  title: string
  stepsLength: number
  onSubmit: () => void
}

export const OnboardingSteps: FunctionComponent<TProps> = ({
  header,
  title,
  step,
  stepsLength,
  subtitle,
  onSubmit,
  children,
}) => {
  return (
    <Flex direction="column">
      <StyledHeader align="center">
        <Paragraph size="small" weight={700}>
          {header}
        </Paragraph>
      </StyledHeader>
      <StyledContent direction="column">
        <Paragraph size="small" color="text-light">
          Step {step} of {stepsLength}
        </Paragraph>
        <StyledTitle>{title}</StyledTitle>
        <Paragraph color="text-light">{subtitle}</Paragraph>
        <StyledForm direction="column">{children}</StyledForm>
        <StyledButton onClick={onSubmit}>Next</StyledButton>
      </StyledContent>
    </Flex>
  )
}

export type TOnboardingStepsProps = TProps
