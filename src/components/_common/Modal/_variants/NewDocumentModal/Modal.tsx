import React, { FunctionComponent } from 'react'

import EmptyDocIcon from '@src/assets/icons/document.svg'
import TemplateIcon from '@src/assets/icons/template.svg'
import { Modal, TModalProps } from '@src/components/_common'
import { Heading, Paragraph } from '@src/components/core'
import { useTextEditorContext } from '@src/contextes'

import { PAPER_TEMPLATE } from './constant'
import { StyledChooseContainer, StyledChooseItem, StyledContainer } from './Modal.styled'

type TProps = {} & TModalProps

export const NewDocumentModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const { setContent, editor, setTitle, setAuthors, title, authors } = useTextEditorContext()

  const createPaperPublicationTemplate = () => {
    if (authors.length || title || !editor?.isEmpty) {
      const confirm = window.confirm(
        'Your publication is not empty, on creating a new document you will permanently delete the old one, are you sure ?',
      )

      if (!confirm) {
        return
      }
    }

    setContent(PAPER_TEMPLATE)
    setTitle('')
    setAuthors([])

    closeModal()
  }

  const createEmptyPublication = () => {
    if (authors.length || title || !editor?.isEmpty) {
      const confirm = window.confirm(
        'Your publication is not empty, on creating a new document you will permanently delete the old one, are you sure ?',
      )

      if (!confirm) {
        return
      }
    }

    editor?.chain().clearContent(true).focus().run()
    setTitle('')
    setAuthors([])

    closeModal()
  }

  return (
    <Modal closeModal={closeModal} {...props}>
      <StyledContainer direction="column">
        <Heading as="h2">Bring science to the world 🌍</Heading>
        <Paragraph color="text-light">
          The content is not stored online but only locally on your computer. In order not to lose
          your work, we advise you to download the document regularly. Downloadable links will be
          generated when your document is published.
        </Paragraph>
      </StyledContainer>
      <StyledChooseContainer direction="column">
        <StyledChooseItem align="center" onClick={createEmptyPublication}>
          <EmptyDocIcon />
          <Paragraph>Start from blank</Paragraph>
        </StyledChooseItem>
        <StyledChooseItem align="center" onClick={createPaperPublicationTemplate}>
          <TemplateIcon />
          <Paragraph>Use paper publication template</Paragraph>
        </StyledChooseItem>
      </StyledChooseContainer>
    </Modal>
  )
}

export type TNewDocumentModalProps = TProps
