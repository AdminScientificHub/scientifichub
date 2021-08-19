import React, { FunctionComponent } from 'react'
import { StyledContainer, StyledErrorMessage } from './Input.styled'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { rgba } from 'emotion-rgba'
import { FieldError, UseFormClearErrors } from 'react-hook-form'
import { TSchema } from '../constant'
import { capitalizeFirstLetter } from '@src/utils/text/firstLetterUppercase'

type TProps = {
  label: string
  value: {
    label: string
    value: string
  }[]
  onChange: (value: any) => void
  placeholder: string
  variant?: 'creteable' | 'select'
  options?: any[]
  error?: FieldError
  name: keyof TSchema
  clearErrors: UseFormClearErrors<TSchema>
}

export const Input: FunctionComponent<TProps> = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  variant,
  error,
  name,
  clearErrors,
}) => {
  const handleChange = (value: any) => {
    onChange(value)

    if (error) {
      clearErrors(name)
    }
  }

  return (
    <StyledContainer direction="column" position="relative">
      <label htmlFor={name}>{label}</label>
      {variant === 'creteable' && (
        <CreatableSelect
          isMulti
          name={name}
          noOptionsMessage={() => null}
          formatCreateLabel={inputValue => `Add "${inputValue}"`}
          value={value}
          placeholder={placeholder}
          options={options}
          maxMenuHeight={200}
          styles={{
            groupHeading: provided => ({
              ...provided,
              fontWeight: 700,
            }),
            placeholder: provided => ({
              ...provided,
              color: rgba('#000', 0.2),
            }),
            indicatorsContainer: provided => ({
              ...provided,
              display: 'none',
            }),
          }}
          className="onboarding-area-select"
          onChange={handleChange}
        />
      )}
      {variant === 'select' && (
        <Select
          isMulti
          name={name}
          value={value}
          placeholder={placeholder}
          options={options}
          maxMenuHeight={200}
          styles={{
            groupHeading: provided => ({
              ...provided,
              fontWeight: 700,
            }),
            placeholder: provided => ({
              ...provided,
              color: rgba('#000', 0.2),
            }),
            indicatorsContainer: provided => ({
              ...provided,
              display: 'none',
            }),
          }}
          className="onboarding-area-select"
          onChange={handleChange}
        />
      )}
      {error && <StyledErrorMessage>{capitalizeFirstLetter(error.message)}</StyledErrorMessage>}
    </StyledContainer>
  )
}

export type TInputProps = TProps
