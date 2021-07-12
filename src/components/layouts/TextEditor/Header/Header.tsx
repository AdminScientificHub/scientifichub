import HTMLtoDOCX from 'html-to-docx'
import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, useMemo, useState } from 'react'
import ReactTooltip from 'react-tooltip'

import BackIcon from '@src/assets/icons/back.svg'
import DownloadIcon from '@src/assets/icons/download.svg'
import LogoBetaIcon from '@src/assets/icons/logo-beta.svg'
import NewDocumentIcon from '@src/assets/icons/new-document.svg'
import PreviewIcon from '@src/assets/icons/preview.svg'
import PublishIcon from '@src/assets/icons/publish.svg'
import UploadIcon from '@src/assets/icons/upload.svg'
import { NewDocumentModal, PublishPublicationModal, UploadFileModal } from '@src/components/_common'
import { Flex } from '@src/components/core'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import {
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
  const { isPreviewMode, isLiveMode, isEditorPreview, isErrorPage } = useGlobalContext()

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
      <StyledLogo href="/">
        <LogoBetaIcon />
      </StyledLogo>
      <ReactTooltip place="bottom" className="tooltip" id="header" />

      <Flex direction="row" align={isLiveMode ? 'center' : 'default'}>
        {isEditorPreview && (
          <StyledNavigationItem
            data-tip="Back to editor"
            data-for="header"
            justify="center"
            align="center"
            onClick={() => push('/publication/new')}
          >
            <BackIcon />
          </StyledNavigationItem>
        )}
        {isLiveMode && (
          <StyledNewDocumentBtn onClick={() => push('/publication/new')}>
            Write a publication <span>- It’s Free</span>
          </StyledNewDocumentBtn>
        )}
        {!isPreviewMode && !isErrorPage && (
          <>
            <StyledNavigationItem
              data-tip="Upload"
              data-for="header"
              justify="center"
              align="center"
              onClick={() => setIsFileUploadModalOpen(true)}
            >
              <UploadIcon />
            </StyledNavigationItem>
            <StyledNavigationItem
              data-tip="Create"
              data-for="header"
              justify="center"
              align="center"
              onClick={() => setIsNewDocModalOpen(true)}
            >
              <NewDocumentIcon />
            </StyledNavigationItem>
            <StyledNavigationItem
              data-tip="Download"
              data-for="header"
              justify="center"
              align="center"
              onClick={downloadDocument}
            >
              <DownloadIcon />
            </StyledNavigationItem>
            <StyledNavigationItem
              data-tip={
                canBePreview
                  ? 'Preview'
                  : 'Need title, content, and at least one author to be preview'
              }
              data-for="header"
              justify="center"
              align="center"
              inactive={!canBePreview}
              onClick={() => canBePreview && push('/publication/preview')}
            >
              <PreviewIcon />
            </StyledNavigationItem>
            <StyledNavigationItem
              data-tip={
                canBePreview
                  ? 'Publish'
                  : 'Need title, content, and at least one author to be publish'
              }
              data-for="header"
              justify="center"
              align="center"
              inactive={!canBePreview}
              onClick={() => canBePreview && setIsPublishingModalOpen(true)}
            >
              <PublishIcon />
            </StyledNavigationItem>
          </>
        )}
      </Flex>
    </StyledHeader>
  )
}

export type THeaderProps = TProps
