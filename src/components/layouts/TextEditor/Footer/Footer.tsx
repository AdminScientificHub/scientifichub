import React, { FunctionComponent } from 'react'

import { Link } from '@src/components/core'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { StyledContainer } from './Footer.styled'
import { FooterToolbar } from './Toolbar'

type TProps = {}

export const Footer: FunctionComponent<TProps> = () => {
  const { isPreviewMode, isMobile, isLiveMode } = useGlobalContext()
  const { editor } = useTextEditorContext()

  if (isPreviewMode || isLiveMode || !editor) {
    return <></>
  }

  return (
    <StyledContainer direction="row" align="center" justify="between">
      <FooterToolbar editor={editor} />
      {!isMobile && <Link href="mailto:maxence@scientifichub.io">Find a bug ?</Link>}
    </StyledContainer>
  )
}

export type TFooterProps = TProps
