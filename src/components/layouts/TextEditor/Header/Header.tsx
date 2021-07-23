import HTMLtoDOCX from 'html-to-docx'
import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, useMemo, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import Link from 'next/link'

import LogoBetaIcon from '@src/assets/icons/logo-beta.svg'

import { NewDocumentModal, PublishPublicationModal, UploadFileModal } from '@src/components/_common'
import { Flex, Span } from '@src/components/core'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import {
  StyledActionsContainer,
  StyledHeader,
  StyledLogo,
  StyledNavigationItem,
  StyledNewDocumentBtn,
} from './Header.styled'

type TProps = {}

export const Header: FunctionComponent<TProps> = () => {
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false)
  const [isPublishingModalOpen, setIsPublishingModalOpen] = useState(false)
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false)

  const { title, editor, authors } = useTextEditorContext()
  const { isPreviewMode, isLiveMode, isEditorPreview, isErrorPage, isMobile } = useGlobalContext()

  const { push } = useRouter()

  const canBePreview = useMemo(() => {
    return title && !editor?.isEmpty && authors.length
  }, [title, editor?.isEmpty, authors.length])

  if (!editor && !isErrorPage) {
    return <></>
  }

  const downloadDocument = async () => {
    await HTMLtoDOCX(JSON.stringify(editor?.getHTML()), title).then((data: any) => {
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(data)

      a.style.display = 'none'
      a.href = url
      a.download = title ? `${title}.docx` : 'scientifichub-publication.docx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  }

  return (
    <StyledHeader direction="row" justify="between" position="relative">
      <UploadFileModal
        isModalOpen={isFileUploadModalOpen}
        closeModal={() => setIsFileUploadModalOpen(false)}
      />
      <PublishPublicationModal
        isModalOpen={isPublishingModalOpen}
        closeModal={() => setIsPublishingModalOpen(false)}
      />
      <NewDocumentModal
        isModalOpen={isNewDocModalOpen}
        closeModal={() => setIsNewDocModalOpen(false)}
      />
      <Link href="/">
        <StyledLogo href="/">
          <LogoBetaIcon />
        </StyledLogo>
      </Link>
      <ReactTooltip place="bottom" className="tooltip" id="header" />

      <Flex direction="row" align={isLiveMode ? 'center' : 'default'}>
        {isEditorPreview && (
          <StyledActionsContainer align="center">
            <Link href="/publication/new">
              <StyledNavigationItem
                data-tip="Back to editor"
                data-for="header"
                justify="center"
                align="center"
              >
                <Span size="small">Back to editor</Span>
              </StyledNavigationItem>
            </Link>
          </StyledActionsContainer>
        )}
        {isLiveMode && (
          <StyledNewDocumentBtn onClick={() => push('/publication/new')}>
            Write a publication <span>- It’s Free</span>
          </StyledNewDocumentBtn>
        )}
        {!isPreviewMode && !isErrorPage && !isMobile && (
          <StyledActionsContainer align="center">
            <StyledNavigationItem
              justify="center"
              align="center"
              onClick={() => setIsNewDocModalOpen(true)}
            >
              <Span size="small">New</Span>
            </StyledNavigationItem>
            <StyledNavigationItem
              justify="center"
              align="center"
              onClick={() => setIsFileUploadModalOpen(true)}
            >
              <Span size="small">Import</Span>
            </StyledNavigationItem>

            <StyledNavigationItem justify="center" align="center" onClick={downloadDocument}>
              <Span size="small">Export</Span>
            </StyledNavigationItem>
            <StyledNavigationItem
              data-tip={
                canBePreview
                  ? 'Preview'
                  : 'Need title, content, and at least one author to be previewed'
              }
              justify="center"
              align="center"
              inactive={!canBePreview}
              onClick={() => canBePreview && push('/publication/preview')}
            >
              <Span size="small">Preview</Span>
            </StyledNavigationItem>
            <StyledNavigationItem
              data-tip={
                canBePreview
                  ? 'Publish'
                  : 'Need title, content, and at least one author to be published'
              }
              data-for="header"
              justify="center"
              align="center"
              inactive={!canBePreview}
              onClick={() => canBePreview && setIsPublishingModalOpen(true)}
            >
              <Span size="small">Publish</Span>
            </StyledNavigationItem>
          </StyledActionsContainer>
        )}
      </Flex>
    </StyledHeader>
  )
}

export type THeaderProps = TProps
