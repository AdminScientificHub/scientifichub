import { capitalizeFirstLetter } from '@src/utils/text/firstLetterUppercase'
import React, { FunctionComponent } from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form'
import { TSchema } from '../constants'
import { StyledErrorMessage, StyledInput } from './Form.styled'

type TProps = {
  control: Control<TSchema>
  errors: DeepMap<TSchema, FieldError>
}

export const OnBoardingStepThreeForm: FunctionComponent<TProps> = ({ control, errors }) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      name="onBoardingThree.title"
      render={({ field: { onChange, value } }) => (
        <>
          <StyledInput
            onChange={onChange}
            value={value}
            name="onBoardingThree.title"
            placeholder="E.g: Assistant Professor of Electronics at Politecnico di Milano"
          />
          {errors.onBoardingThree?.title && (
            <StyledErrorMessage>
              {capitalizeFirstLetter(errors.onBoardingThree?.title.message)}
            </StyledErrorMessage>
          )}
        </>
      )}
    />
  )
}

export type TOnBoardingStepThreeFormProps = TProps
