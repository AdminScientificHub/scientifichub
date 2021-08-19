import React, { FunctionComponent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Paragraph } from '@src/components/core'

import { Modal, TModalProps } from '../../Modal'
import { StyledContainer, StyledLoadingContainer, StyledLoadingSpinner } from './Modal.styled'

import fileToArrayBuffer from 'file-to-array-buffer'
import { convertToHtml } from 'mammoth/mammoth.browser'

import FileUploadIcon from '@src/assets/icons/file-upload.svg'
import LoadingIcon from '@src/assets/icons/loading.svg'
import { useAuthContext, useTextEditorContext } from '@src/contextes'
import { useRouter } from 'next/dist/client/router'
import { createPublication, updatePublication } from '@src/services'

type TProps = {
  publicationId?: string
  isEditorEmpty?: boolean
} & TModalProps

export const UploadFileModal: FunctionComponent<TProps> = ({
  closeModal,
  isEditorEmpty,
  publicationId,
  ...props
}) => {
  const [isFileUploading, setIsFileUploading] = useState(false)

  const { user } = useAuthContext()
  const { editor, setTitle } = useTextEditorContext()

  const router = useRouter()

  const onDrop = useCallback(
    (files: File[]) => {
      const [file] = files

      if (!isEditorEmpty && publicationId) {
        const valited = window.confirm(
          'Your publication is not empty, on uploading a new document you will permanently delete the actual content, are you sure ?',
        )

        if (!valited) {
          return
        }
      }

      setIsFileUploading(true)

      fileToArrayBuffer(file).then((data: any) => {
        convertToHtml({ arrayBuffer: data })
          .then(function (result: any) {
            if (!user) {
              return
            }

            setIsFileUploading(false)

            if (publicationId) {
              updatePublication({
                publicationId,
                publication: {
                  title: 'Untitled',
                  content: result.value || '',
                },
                callback: () => {
                  setTitle('Untitled')
                  editor?.chain().setContent(result.value, true).focus().run()
                  closeModal()
                },
              })

              return
            }

            createPublication({
              content: result.value || '',
              authors: [{ type: 'PRINCIPAL', id: user.id }],
              userUid: user?.uid,
              callback: ({ id }) => {
                router.push(`/publication/${id}/edit`)
                closeModal()
              },
            })
          })
          .done()
      })
    },
    [closeModal, editor, isEditorEmpty, publicationId, router, setTitle, user],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    multiple: false,
  })

  return (
    <Modal closeModal={closeModal} {...props}>
      <StyledContainer
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
            <input {...getInputProps()} />
            <FileUploadIcon />
            <Paragraph textAlign="center" color="text-light" weight={700}>
              Drop a file or click to open the selector
            </Paragraph>
            <Paragraph color="text-light" size="small">
              Accepted formats: DOCX
            </Paragraph>
          </>
        )}
      </StyledContainer>
    </Modal>
  )
}

export type TUploadFileModalProps = TProps
