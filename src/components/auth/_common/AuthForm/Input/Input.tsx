import React, { FunctionComponent, useRef, useState } from 'react'
import { StyledContainer, StyledInput } from './Input.styled'

import EmailIcon from '@src/assets/icons/email.svg'
import PasswordIcon from '@src/assets/icons/password.svg'
import PreviewIcon from '@src/assets/icons/preview.svg'

type TProps = {
  id: string
  label: string
  type: 'email' | 'password' | 'text'
  onChange: (value: string) => void
}

export const AuthFormInput: FunctionComponent<TProps> = ({ id, type, label, onChange }) => {
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [inputType, setInputType] = useState(type)

  const inputRef = useRef<HTMLInputElement>(null)

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
    inputRef.current?.focus()
  }

  return (
    <StyledContainer direction="column">
      <label htmlFor={id}>{label}</label>
      <StyledInput position="relative" align="center" type={type} isInputFocus={isInputFocus}>
        {type === 'email' && <EmailIcon />}
        {type === 'password' && <PasswordIcon />}
        <input
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          type={inputType}
          name="id"
          id={id}
          ref={inputRef}
          onChange={e => onChange(e.target.value)}
        />
        {type === 'password' && (
          <div onClick={toggleInputType}>
            <PreviewIcon />
          </div>
        )}
      </StyledInput>
    </StyledContainer>
  )
}

export type TInputProps = TProps
