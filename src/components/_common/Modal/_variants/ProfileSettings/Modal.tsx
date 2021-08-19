import { Modal, TModalProps } from '@src/components/_common'
import { Thumbnail } from '@src/components/_common/Thumbnail'
import { useAuthContext } from '@src/contextes'
import React, { FunctionComponent } from 'react'
import { ProfileSettingsInput } from './Input'
import { StyledContainer, StyledForm, StyledFormRow, StyledProfile } from './Modal.styled'

import { Paragraph } from '@src/components/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ProfileSettingsFieldofStudiesSelect } from './FieldOfStudies'
import { TSchema, schema } from './constant'
import { useEffect } from 'react'
import { updateUser } from '@src/services'

type TProps = {} & TModalProps

export const ProfileSettingsModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const { user } = useAuthContext()

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    clearErrors,
    setValue,
  } = useForm<TSchema>({ resolver: yupResolver(schema), reValidateMode: 'onSubmit' })

  useEffect(() => {
    setValue('firstName', user?.firstName || '')
    setValue('lastName', user?.lastName || '')
    setValue('title', user?.title || '')
    setValue('fieldOfStudies', user?.fieldOfStudies || [])
  }, [setValue, user])

  const onSubmit = (data: TSchema) => {
    if (!user) {
      return
    }

    updateUser({
      userId: user?.id,
      user: {
        ...data,
      },
      callback: closeModal,
    })
  }

  return (
    <Modal closeModal={closeModal} {...props}>
      <StyledContainer direction="row">
        <StyledProfile align="center" direction="column">
          <Thumbnail size="xlarge" username={user?.firstName} />
          <Paragraph size="xxsmall" color="text-light">
            {user?.email}
          </Paragraph>
        </StyledProfile>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledFormRow direction="row">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <ProfileSettingsInput
                  name="firstName"
                  value={value}
                  onChange={onChange}
                  label="First Name"
                  clearErrors={clearErrors}
                  error={errors.firstName}
                  placeholder="Albert"
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <ProfileSettingsInput
                  name="lastName"
                  value={value}
                  onChange={onChange}
                  label="Last Name"
                  clearErrors={clearErrors}
                  error={errors.lastName}
                  placeholder="Einstein"
                />
              )}
            />
          </StyledFormRow>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="title"
            render={({ field: { onChange, value } }) => (
              <ProfileSettingsInput
                name="title"
                value={value}
                onChange={onChange}
                label="Title"
                clearErrors={clearErrors}
                error={errors.lastName}
                placeholder="E.g: Assistant Professor of Electronics at Politecnico di Milano"
              />
            )}
          />
          <ProfileSettingsFieldofStudiesSelect control={control} />
          <button disabled={!isDirty} onClick={handleSubmit(onSubmit)}>
            Save
          </button>
        </StyledForm>
      </StyledContainer>
    </Modal>
  )
}

export type TProfileSettingsModalProps = TProps
