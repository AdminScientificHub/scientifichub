import React, { FunctionComponent } from 'react'

import EmptyDocIcon from '@src/assets/icons/document.svg'
import TemplateIcon from '@src/assets/icons/template.svg'
import ExempleTemplateIcon from '@src/assets/icons/exemple-document.svg'
import { Modal, TModalProps } from '@src/components/_common'
import { Heading, Paragraph, Span } from '@src/components/core'
import { useAuthContext } from '@src/contextes'

import { EXEMPLE_TEMPLATE, PAPER_TEMPLATE } from './constant'
import { StyledChooseContainer, StyledChooseItem, StyledContainer } from './Modal.styled'
import { useRouter } from 'next/dist/client/router'
import { createPublication } from '@src/services'

type TProps = {} & TModalProps

export const NewDocumentModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const { user } = useAuthContext()
  const router = useRouter()

  const createPaperPublicationTemplate = () => {
    if (!user) {
      return
    }

    createPublication({
      title: 'ON THE ELECTRODYNAMICS OF MOVING BODIES',
      authors: [{ type: 'PRINCIPAL', id: user.id }],
      userUid: user.uid,
      content: PAPER_TEMPLATE,
      callback: ({ id }) => {
        router.push(`/publication/${id}/edit`)
        closeModal()
      },
    })
  }

  const createExemplePublicationTemplate = () => {
    if (!user) {
      return
    }

    createPublication({
      title: 'ON THE ELECTRODYNAMICS OF MOVING BODIES',
      authors: [{ type: 'PRINCIPAL', id: user.id }],
      userUid: user.uid,
      content: EXEMPLE_TEMPLATE,
      callback: ({ id }) => {
        router.push(`/publication/${id}/edit`)
        closeModal()
      },
    })
  }

  const createEmptyPublication = () => {
    if (!user) {
      return
    }

    createPublication({
      authors: [{ type: 'PRINCIPAL', id: user.id }],
      userUid: user.uid,
      callback: ({ id }) => {
        return () => {
          router.push(`/publication/${id}/edit`)
          closeModal()
        }
      },
    })
  }

  return (
    <Modal closeModal={closeModal} {...props}>
      <StyledContainer direction="column">
        <Heading as="h2">Bring science to the world 🌍</Heading>
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
