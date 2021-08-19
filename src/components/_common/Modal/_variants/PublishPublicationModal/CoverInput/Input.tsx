import React, { FunctionComponent, useCallback, useState } from 'react'
import firebase from 'firebase/app'
import { FileRejection, useDropzone } from 'react-dropzone'
import {
  StyledContainer,
  StyledDropZone,
  StyledErrorMessage,
  StyledLoadingContainer,
  StyledLoadingSpinner,
} from './Input.styled'
import LoadingIcon from '@src/assets/icons/loading.svg'

import { Paragraph } from '@src/components/core'
import { FieldError, UseFormClearErrors } from 'react-hook-form'
import { TSchema } from '../constant'
import { capitalizeFirstLetter } from '@src/utils/text/firstLetterUppercase'

type TProps = {
  onChange: (imgUrl: string) => void
  error?: FieldError
  clearErrors: UseFormClearErrors<TSchema>
}

export const PublishModalCoverInput: FunctionComponent<TProps> = ({
  onChange,
  error,
  clearErrors,
}) => {
  const [isFileUploading, setIsFileUploading] = useState(false)
  const [isMaxSizeExceed, setIsMaxSizeExceed] = useState(false)

  const onDrop = useCallback(
    (files: File[]) => {
      if (isMaxSizeExceed) {
        setIsMaxSizeExceed(false)
      }

      const [file] = files

      if (!file) {
        return
      }

      clearErrors('coverUrl')

      const fileName = `${file.name}_${Math.random().toString(36).substr(2, 9)}`

      const storage = firebase.storage()

      const uploadTask = storage.ref(`/images/${fileName}`).put(file)

      uploadTask.on(
        'state_changed',
        () => {
          setIsFileUploading(true)
        },
        err => console.log(err),
        () => {
          setIsFileUploading(false)

          storage.ref('images').child(fileName).getDownloadURL().then(onChange)
        },
      )
    },
    [clearErrors, isMaxSizeExceed, onChange],
  )

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setIsMaxSizeExceed(true)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'image/png'],
    multiple: false,
    maxSize: 5000000,
    onDropRejected,
  })

  return (
    <StyledContainer direction="column" position="relative">
      <label htmlFor="coverUrl">Image Cover</label>
      <StyledDropZone
        {...getRootProps()}
        isActive={isDragActive}
        align="center"
        justify="center"
        direction="column"
      >
        {isFileUploading ? (
          <StyledLoadingContainer direction="column" align="center">
            <StyledLoadingSpinner>
              <LoadingIcon />
            </StyledLoadingSpinner>
            <Paragraph size="small" color="text-light">
              Uploading your file...
            </Paragraph>
          </StyledLoadingContainer>
        ) : (
          <>
            <input {...getInputProps()} name="coverUrl" />
            <Paragraph size="small" textAlign="center" color="text-light" weight={700}>
              Drop an image or click to open the selector
            </Paragraph>
            <Paragraph color="text-light" size="xsmall">
              Accepted formats: PNG, JPEG
            </Paragraph>
            <Paragraph color={isMaxSizeExceed ? 'error' : 'text-lighter'} size="xsmall">
              Max size 5Mo
            </Paragraph>
          </>
        )}
      </StyledDropZone>
      {error && <StyledErrorMessage>{capitalizeFirstLetter(error.message)}</StyledErrorMessage>}
    </StyledContainer>
  )
}

export type TPublishModalCoverInputProps = TProps
