import { rgba } from 'emotion-rgba'
import React, { FunctionComponent } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'
import { TSchema } from '../constants'
import { ALL_AREAS_OF_EXPERTISE } from './constant'
import { StyledContainer } from './Form.styled'

type TProps = {
  control: Control<TSchema>
}

const formatGroupLabel: FunctionComponent<any> = data => <span>{data.label}</span>

export const OnBoardingStepTwoForm: FunctionComponent<TProps> = ({ control }) => {
  return (
    <StyledContainer>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="onBoardingTwo.fieldOfStudies"
        render={({ field: { onChange, value } }) => (
          <Select
            isMulti
            value={value}
            placeholder="E.g: Mathematics"
            styles={{
              groupHeading: provided => ({
                ...provided,
                fontWeight: 700,
              }),
              placeholder: provided => ({
                ...provided,
                color: rgba('#000', 0.2),
              }),
            }}
            className="onboarding-area-select"
            formatGroupLabel={formatGroupLabel}
            options={ALL_AREAS_OF_EXPERTISE.map(field => ({
              label: field.title,
              options: field.areas.map(area => ({ label: area, value: area })),
            }))}
            onChange={onChange}
          />
        )}
      />
    </StyledContainer>
  )
}

export type TOnBoardingStepTwoFormProps = TProps
