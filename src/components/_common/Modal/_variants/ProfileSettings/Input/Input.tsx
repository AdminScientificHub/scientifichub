import { capitalizeFirstLetter } from '@src/utils/text/firstLetterUppercase'
import React, { FunctionComponent } from 'react'
import { FieldError, UseFormClearErrors } from 'react-hook-form'
import { TSchema } from '../constant'

import { StyledContainer, StyledErrorMessage } from './Input.styled'

type TProps = {
  onChange: (value: string) => void
  label: string
  name: keyof TSchema
  error?: FieldError
  clearErrors: UseFormClearErrors<TSchema>
  value: string
  placeholder: string
}

export const ProfileSettingsInput: FunctionComponent<TProps> = ({
  name,
  label,
  clearErrors,
  onChange,
  error,
  value,
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
      <input onChange={handleChange} id={name} value={value} placeholder={placeholder} />

      {error && <StyledErrorMessage>{capitalizeFirstLetter(error.message)}</StyledErrorMessage>}
    </StyledContainer>
  )
}

export type TInputProps = TProps
