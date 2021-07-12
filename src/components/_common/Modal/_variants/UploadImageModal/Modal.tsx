import { Modal, TModalProps } from '@src/components/_common'
import React, { FunctionComponent, useCallback, useState } from 'react'
import {
  StyledContainer,
  StyledDropContainer,
  StyledLoadingContainer,
  StyledLoadingSpinner,
} from './Modal.styled'
import { useDropzone, FileRejection } from 'react-dropzone'
import firebase from 'firebase/app'
import 'firebase/storage'

import FileUploadIcon from '@src/assets/icons/file-upload.svg'
import LoadingIcon from '@src/assets/icons/loading.svg'
import { Paragraph } from '@src/components/core'
import { useTextEditorContext } from '@src/contextes'

type TProps = {} & TModalProps

export const UploadImageModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const [isFileUploading, setIsFileUploading] = useState(false)
  const [isMaxSizeExceed, setIsMaxSizeExceed] = useState(false)

  const { editor } = useTextEditorContext()

  const onDrop = useCallback(
    (files: File[]) => {
      if (!editor) {
        return
      }

      if (isMaxSizeExceed) {
        setIsMaxSizeExceed(false)
      }

      const [file] = files
      const fileName = `${file.name}_${Math.random().toString(36).substr(2, 9)}`

      const storage = firebase.storage()

      const uploadTask = storage.ref(`/images/${fileName}`).put(file)

      uploadTask.on(
        'state_changed',
        snapShot => {
          setIsFileUploading(true)
        },
        err => console.log(err),
        () => {
          setIsFileUploading(false)

          storage
            .ref('images')
            .child(fileName)
            .getDownloadURL()
            .then(fireBaseUrl => {
              editor.chain().focus().setImage({ src: fireBaseUrl }).run()
            })

          closeModal()
        },
      )
    },
    [editor, isMaxSizeExceed, setIsMaxSizeExceed],
  )

  // Error can only become from sizeExceed for now
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setIsMaxSizeExceed(true)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['image/png', 'image/jpeg'],
    multiple: false,
    maxSize: 500000,
    onDropRejected,
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
          <StyledDropContainer direction="column" align="center">
            <input {...getInputProps()} />
            <FileUploadIcon />
            <Paragraph textAlign="center" color="text-light" weight={700}>
              Drop a image or click to open the selector
            </Paragraph>
            <Paragraph color="text-light" size="small">
              Accepted formats: PNG, JPEG
            </Paragraph>
            <Paragraph color={isMaxSizeExceed ? 'error' : 'text-lighter'} size="xsmall">
              Max size 500kB
            </Paragraph>
          </StyledDropContainer>
        )}
      </StyledContainer>
    </Modal>
  )
}
