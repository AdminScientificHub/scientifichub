import { ALL_AREAS_OF_EXPERTISE } from '@src/components/user/Onboarding/StepTwo/constant'
import { rgba } from 'emotion-rgba'
import React, { FunctionComponent } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'
import { TSchema } from '../constant'

import { StyledContainer } from './Select.styled'

type TProps = {
  control: Control<TSchema>
}

const formatGroupLabel: FunctionComponent<any> = data => <span>{data.label}</span>

export const ProfileSettingsFieldofStudiesSelect: FunctionComponent<TProps> = ({ control }) => {
  return (
    <StyledContainer direction="column">
      <label>Field of studies</label>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="fieldOfStudies"
        render={({ field: { onChange, value } }) => (
          <Select
            isMulti
            value={value}
            placeholder="E.g: Mathematics"
            styles={{
              control: provided => ({
                ...provided,
                border: `.1rem solid ${rgba('#000', 0.1)}`,
              }),
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

export type TProfileSettingsFieldofStudiesSelectProps = TProps
