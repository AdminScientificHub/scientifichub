import React, { FunctionComponent, useState } from 'react'

import EmptyDocIcon from '@src/assets/icons/document.svg'
import TemplateIcon from '@src/assets/icons/template.svg'
import ExempleTemplateIcon from '@src/assets/icons/exemple-document.svg'
import { Modal, TModalProps } from '@src/components/_common'
import { Heading, Paragraph, Span } from '@src/components/core'
import { useTextEditorContext } from '@src/contextes'

import { EXEMPLE_TEMPLATE, PAPER_TEMPLATE } from './constant'
import { StyledChooseContainer, StyledChooseItem, StyledContainer } from './Modal.styled'
import { useEffect } from 'react'

type TProps = {} & TModalProps

export const NewDocumentModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false)

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
    setTitle('ON THE ELECTRODYNAMICS OF MOVING BODIES')
    setAuthors([])

    closeModal()
  }

  const createExemplePublicationTemplate = () => {
    if (authors.length || title || !editor?.isEmpty) {
      const confirm = window.confirm(
        'Your publication is not empty, on creating a new document you will permanently delete the old one, are you sure ?',
      )

      if (!confirm) {
        return
      }
    }

    setContent(EXEMPLE_TEMPLATE)
    setTitle('ON THE ELECTRODYNAMICS OF MOVING BODIES')
    setAuthors([
      {
        name: 'Albert Einstein',
        link: 'https://www.fourmilab.ch/etexts/einstein/specrel/specrel.pdf',
      },
    ])

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

  useEffect(() => {
    const localStorageFirstVisit = localStorage.getItem('firstVisit')

    if (localStorageFirstVisit) {
      return
    }

    setIsFirstVisit(true)
    localStorage.setItem('firstVisit', 'true')
  }, [])

  return (
    <Modal closeModal={closeModal} {...props}>
      <StyledContainer direction="column">
        <Heading as="h2">
          {isFirstVisit ? 'Welcome to ScientificHub 👋' : 'Bring science to the world 🌍'}
        </Heading>
        <Paragraph color="text-light">
          We are a platform allowing scientists around the world to create, edit and publish
          scientific content. We want to empower how research communication works and make{' '}
          <Span textDecoration="underline">science more open</Span>.
        </Paragraph>
        <Paragraph color="text-light">
          Our service aims to make subscription newspapers obsolete. We are working on the creation
          of a central space for research-related publications: from feedback on false hypotheses to
          the creation of papers.
        </Paragraph>
        <Paragraph color="text-light">
          We also believe in data protection, which is why your document is stored locally.
        </Paragraph>
      </StyledContainer>
      <StyledChooseContainer direction="row">
        <StyledChooseItem
          direction="column"
          align="start"
          onClick={createExemplePublicationTemplate}
        >
          <ExempleTemplateIcon />
          <Paragraph>Document exemple</Paragraph>
        </StyledChooseItem>
        <StyledChooseItem direction="column" align="start" onClick={createEmptyPublication}>
          <EmptyDocIcon />
          <Paragraph>Blank document</Paragraph>
        </StyledChooseItem>
        <StyledChooseItem direction="column" align="start" onClick={createPaperPublicationTemplate}>
          <TemplateIcon />
          <Paragraph>Paper templarte</Paragraph>
        </StyledChooseItem>
      </StyledChooseContainer>
    </Modal>
  )
}

export type TNewDocumentModalProps = TProps
