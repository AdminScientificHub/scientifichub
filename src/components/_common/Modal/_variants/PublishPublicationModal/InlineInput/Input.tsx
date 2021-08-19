import { capitalizeFirstLetter } from '@src/utils/text/firstLetterUppercase'
import React, { FunctionComponent } from 'react'
import { UseFormClearErrors } from 'react-hook-form'
import { FieldError } from 'react-hook-form'
import { TSchema } from '../constant'
import { StyledContainer, StyledErrorMessage } from './Input.styled'

type TProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: FieldError
  name: keyof TSchema
  clearErrors: UseFormClearErrors<TSchema>
}

export const InlineInput: FunctionComponent<TProps> = ({
  value = '',
  label,
  placeholder,
  onChange,
  disabled,
  error,
  name,
  clearErrors,
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
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        title={value}
        id={name}
      />
      {error && <StyledErrorMessage>{capitalizeFirstLetter(error.message)}</StyledErrorMessage>}
    </StyledContainer>
  )
}

export type TInlineInputProps = TProps
