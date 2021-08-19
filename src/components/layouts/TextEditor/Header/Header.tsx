import React, { FunctionComponent } from 'react'
import Link from 'next/link'

import LogoBetaIcon from '@src/assets/icons/logo-beta.svg'
import { Flex, Paragraph, Span } from '@src/components/core'
import {
  useAuthContext,
  useGlobalContext,
  usePublicationContext,
  useTextEditorContext,
} from '@src/contextes'

import {
  StyledActionsContainer,
  StyledHeader,
  StyledLogo,
  StyledNavigationItem,
  StyledNewDocumentBtn,
  StyledSaving,
} from './Header.styled'

import CheckIcon from '@src/assets/icons/check.svg'
import { NewAction } from './New'
import { ExportAction } from './Export'
import { ImportAction } from './Import'
import { PreviewAction } from '../Preview'
import { PublishAction } from './Publish'
import { useRouter } from 'next/dist/client/router'

type TProps = {}

export const Header: FunctionComponent<TProps> = () => {
  const { editor, isSaving } = useTextEditorContext()
  const { isPreviewMode, isLiveMode, isErrorPage, isMobile } = useGlobalContext()
  const { publicationId } = usePublicationContext()
  const { user } = useAuthContext()

  const { push } = useRouter()

  if (!editor && !isErrorPage) {
    return <></>
  }

  return (
    <StyledHeader direction="row" justify="between" position="relative">
      <Link href="/">
        <StyledLogo href="/">
          <LogoBetaIcon />
        </StyledLogo>
      </Link>

      <Flex direction="row" align={isLiveMode ? 'center' : 'default'}>
        {isPreviewMode && (
          <StyledActionsContainer align="center">
            <Link href={`/publication/${publicationId}/edit`}>
              <StyledNavigationItem justify="center" align="center">
                <Span size="small">Back to editor</Span>
              </StyledNavigationItem>
            </Link>
          </StyledActionsContainer>
        )}
        {isLiveMode && !user && (
          <StyledNewDocumentBtn onClick={() => push(`/`)}>
            Write a publication <span>- It’s Free</span>
          </StyledNewDocumentBtn>
        )}
        {!isPreviewMode && !isErrorPage && !isMobile && !isLiveMode && (
          <StyledSaving align="center">
            {!isSaving && <CheckIcon />}
            <Paragraph size="xsmall" color="text-light">
              {isSaving ? 'Saving...' : 'Saved !'}
            </Paragraph>
          </StyledSaving>
        )}
        {!isPreviewMode && !isErrorPage && !isMobile && !isLiveMode && (
          <StyledActionsContainer align="center">
            <NewAction />
            <ImportAction />
            <ExportAction />
            <PreviewAction />
            <PublishAction />
          </StyledActionsContainer>
        )}
      </Flex>
    </StyledHeader>
  )
}

export type THeaderProps = TProps
