import { capitalizeFirstLetter } from '@src/utils/text/firstLetterUppercase'
import React, { FunctionComponent } from 'react'
import { FieldError, UseFormClearErrors } from 'react-hook-form'
import { StyledContainer, StyledErrorMessage, StyledInput } from './Input.styled'

type TProps = {
  label: string
  placeholder: string
  value: string
  name: string
  onChange: (event: string) => void
  clearErrors: UseFormClearErrors<any>
  error?: FieldError
}

export const OnboardingStepsInput: FunctionComponent<TProps> = ({
  value = '',
  name,
  label,
  error,
  onChange,
  clearErrors,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)

    if (error) {
      clearErrors(name)
    }
  }

  return (
    <StyledContainer direction="column" position="relative">
      <label htmlFor={name}>{label}</label>
      <StyledInput>
        <input onChange={handleChange} value={value} id={name} placeholder={placeholder} />
      </StyledInput>
      {error && <StyledErrorMessage>{capitalizeFirstLetter(error.message)}</StyledErrorMessage>}
    </StyledContainer>
  )
}

export type TOnboardingStepsInputProps = TProps
