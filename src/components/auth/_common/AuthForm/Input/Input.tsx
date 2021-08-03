import React, { FunctionComponent, useState } from 'react'
import { StyledContainer, StyledErrorMessage, StyledInput } from './Input.styled'

import EmailIcon from '@src/assets/icons/email.svg'
import PasswordIcon from '@src/assets/icons/password.svg'
import PreviewIcon from '@src/assets/icons/preview.svg'
import { FieldError, UseFormClearErrors } from 'react-hook-form'
import { capitalizeFirstLetter } from '@src/utils/text/firstLetterUppercase'
import { TSchema } from '..'

type TProps = {
  onChange: (event: string) => void
  label: string
  type: 'email' | 'password' | 'text'
  value: string
  name: keyof TSchema
  error?: FieldError
  clearErrors: UseFormClearErrors<TSchema>
}

export const AuthFormInput: FunctionComponent<TProps> = ({
  value = '',
  name,
  type,
  label,
  onChange,
  error,
  clearErrors,
}) => {
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [inputType, setInputType] = useState(type)

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)

    if (error) {
      clearErrors(name)
    }
  }

  return (
    <StyledContainer direction="column" position="relative">
      <label htmlFor={name}>{label}</label>
      <StyledInput position="relative" align="center" type={type} isInputFocus={isInputFocus}>
        {type === 'email' && <EmailIcon />}
        {type === 'password' && <PasswordIcon />}
        <input
          onChange={handleChange}
          value={value}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          type={inputType}
          id={name}
        />
        {type === 'password' && (
          <div onClick={toggleInputType}>
            <PreviewIcon />
          </div>
        )}
      </StyledInput>
      {error && <StyledErrorMessage>{capitalizeFirstLetter(error.message)}</StyledErrorMessage>}
    </StyledContainer>
  )
}

export type TInputProps = TProps
