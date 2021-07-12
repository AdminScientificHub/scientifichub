import { Paragraph } from '@src/components/core'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { Modal, TModalProps } from '../../Modal'
import { StyledContainer, StyledLoadingContainer, StyledLoadingSpinner } from './Modal.styled'
import { useDropzone } from 'react-dropzone'

const fileToArrayBuffer = require('file-to-array-buffer')
import { convertToHtml } from 'mammoth/mammoth.browser'

import FileUploadIcon from '@src/assets/icons/file-upload.svg'
import LoadingIcon from '@src/assets/icons/loading.svg'
import { useTextEditorContext } from '@src/contextes'

type TProps = {} & TModalProps

export const UploadFileModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const [isFileUploading, setIsFileUploading] = useState(false)

  const { editor } = useTextEditorContext()

  const onDrop = useCallback(
    (files: File[]) => {
      const [file] = files

      if (!editor) return

      const valited =
        editor.isEmpty ||
        window.confirm(
          'Your publication is not empty, on uploading a new document you will permanently delete the old one, are you sure ?',
        )

      if (!valited) {
        return
      }

      setIsFileUploading(true)

      fileToArrayBuffer(file).then((data: any) => {
        convertToHtml({ arrayBuffer: data })
          .then(function (result: any) {
            setIsFileUploading(false)

            editor.commands.setContent(result.value)

            closeModal()
          })
          .done()
      })
    },
    [editor],
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
