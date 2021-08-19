import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { AlertContent, Modal, TModalProps } from '@src/components/_common'
import { Flex, Heading, Paragraph, Span } from '@src/components/core'
import {
  StyledColumn,
  StyledContainer,
  StyledCover,
  StyledCoverContainer,
  StyledRemoveCover,
} from './Modal.styled'
import { PublishModalCoverInput } from './CoverInput/Input'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InlineInput } from './InlineInput'
import { Input } from './Input'
import { TSchema, schema } from './constant'
import { usePublicationContext } from '@src/contextes'
import CloseSvg from '@src/assets/icons/close.svg'
import { ALL_AREAS_OF_EXPERTISE } from '@src/components/user/Onboarding/StepTwo/constant'
import { publishPublication } from '@src/services'
import LoadingIcon from '@src/assets/icons/loading.svg'

import { useRouter } from 'next/dist/client/router'
import { useAlert } from 'react-alert'
import { StyledLoadingSpinner } from '@src/components/dashboard/_common/Table/Content/Content.styled'

type TProps = {} & TModalProps

export const PublishPublicationModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const [isPublishing, setIsPublishing] = useState(false)
  const { publication, publicationId } = usePublicationContext()

  const router = useRouter()
  const alert = useAlert()

  const mainAuthor = useMemo(
    () => publication?.authors.find(author => author.type === 'PRINCIPAL'),
    [publication],
  )

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      title: publication?.title,
    },
  })

  const coverUrl = watch('coverUrl')

  const deleteCover = () => setValue('coverUrl', '')

  useEffect(() => {
    setValue('title', publication?.title || '')
  }, [publication, setValue])

  const onSubmit = ({ tags, fields, ...data }: TSchema) => {
    if (!publication?.title || !publication.content) {
      alert.error(
        <AlertContent
          title="Document is invalid"
          subtitle="Your document need at least a title and content"
          type="error"
        />,
      )
      return
    }

    setIsPublishing(true)

    publishPublication({
      publicationId,
      publication: {
        ...data,
        tags: tags.map(tag => ({ value: tag.value, label: tag.label })),
        fields: fields.map(field => ({ value: field.value, label: field.label })),
      },
      callback: () => {
        setIsPublishing(false)
        router.push(`/publication/${publicationId}`)
      },
    })
  }

  return (
    <Modal maxWidth="70%" closeModal={closeModal} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledContainer direction="row">
          <StyledColumn direction="column">
            <Flex direction="column">
              <Heading as="h3">Publication preview</Heading>
              <Paragraph color="text-light" size="small">
                Changes here will affect how your publication appear in public places like
                ScientificHub homepage or in social media — not the publication itself.
              </Paragraph>
            </Flex>
            {coverUrl ? (
              <StyledCoverContainer>
                <Paragraph>Image Cover</Paragraph>
                <StyledCover src={coverUrl}>
                  <StyledRemoveCover onClick={deleteCover}>
                    <CloseSvg />
                  </StyledRemoveCover>
                </StyledCover>
              </StyledCoverContainer>
            ) : (
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="coverUrl"
                render={({ field: { onChange } }) => (
                  <PublishModalCoverInput
                    error={errors.coverUrl}
                    clearErrors={clearErrors}
                    onChange={onChange}
                  />
                )}
              />
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="title"
              render={({ field: { onChange, value } }) => (
                <InlineInput
                  onChange={onChange}
                  value={value}
                  label="Title"
                  placeholder="Write a preview title"
                  disabled
                  error={errors.title}
                  clearErrors={clearErrors}
                  name="title"
                />
              )}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="description"
              render={({ field: { onChange, value } }) => (
                <InlineInput
                  onChange={onChange}
                  value={value}
                  label="Description"
                  placeholder="Write a preview description"
                  error={errors.description}
                  clearErrors={clearErrors}
                  name="description"
                />
              )}
            />
          </StyledColumn>
          <StyledColumn direction="column">
            <Flex direction="column">
              <Heading as="h3">Extra informations</Heading>
              <Paragraph color="text-light" size="small">
                Allow readers to know what your publication is about — fill these informations
                carefully.
              </Paragraph>
            </Flex>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="tags"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="E.g : General relativity"
                  label="Tags"
                  value={value}
                  onChange={onChange}
                  variant="creteable"
                  error={errors.tags as any}
                  clearErrors={clearErrors}
                  name="tags"
                />
              )}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="fields"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="E.g : Physics"
                  label="Fields"
                  value={value}
                  variant="select"
                  onChange={onChange}
                  options={ALL_AREAS_OF_EXPERTISE.map(field => ({
                    label: field.title,
                    options: field.areas.map(area => ({ label: area, value: area })),
                  }))}
                  error={errors.fields as any}
                  clearErrors={clearErrors}
                  name="fields"
                />
              )}
            />
            <Paragraph color="text-light" size="small">
              When your document is published, it will no longer be editable and it will be
              available on the Community plateform.
            </Paragraph>
            <Paragraph color="text-light" size="small">
              The main author will be :{' '}
              <Span weight={700}>
                {mainAuthor?.firstName} {mainAuthor?.lastName}
              </Span>
            </Paragraph>
            <button onClick={handleSubmit(onSubmit)}>
              {isPublishing ? (
                <StyledLoadingSpinner>
                  <LoadingIcon />
                </StyledLoadingSpinner>
              ) : (
                'Publish'
              )}
            </button>
          </StyledColumn>
        </StyledContainer>
      </form>
    </Modal>
  )
}

export type TPublishPublicationModalProps = TProps
