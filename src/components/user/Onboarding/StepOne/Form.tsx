import React, { FunctionComponent } from 'react'
import { Control, Controller, DeepMap, FieldError, UseFormClearErrors } from 'react-hook-form'
import { OnboardingStepsInput } from '../../_common/OnboardingSteps/Input'
import { TSchema } from '../constants'

type TProps = {
  control: Control<TSchema>
  clearErrors: UseFormClearErrors<TSchema>
  errors: DeepMap<TSchema, FieldError>
}

export const OnBoardingStepOneForm: FunctionComponent<TProps> = ({
  control,
  clearErrors,
  errors,
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="onBoardingOne.firstName"
        render={({ field: { onChange, value } }) => (
          <OnboardingStepsInput
            placeholder="Albert"
            onChange={onChange}
            value={value}
            name="onBoardingOne.firstName"
            label="First Name"
            clearErrors={clearErrors}
            error={errors.onBoardingOne?.firstName}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="onBoardingOne.lastName"
        render={({ field: { onChange, value } }) => (
          <OnboardingStepsInput
            placeholder="Einstein"
            onChange={onChange}
            value={value}
            name="onBoardingOne.lastName"
            label="Last Name"
            error={errors.onBoardingOne?.lastName}
            clearErrors={clearErrors}
          />
        )}
      />
    </>
  )
}

export type TOnBoardingStepOneFormProps = TProps
