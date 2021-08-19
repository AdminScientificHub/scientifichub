import React, { FunctionComponent, useEffect, useState } from 'react'

import { useEditor } from '@tiptap/react'

import NoMobileIllustration from '@src/assets/illustrations/no-mobile.svg'

import {
  PublicationProvider,
  TextEditorProvider,
  useGlobalContext,
  useTextEditorContext,
} from '@src/contextes'

import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { StyledContainer, StyledNoMobileContainer } from './Layout.styled'
import { Heading, Link, Paragraph } from '@src/components/core'
import { EXTENSIONS } from './Layout.utils'

type TProps = {}

const TextEditorLayoutComponent: FunctionComponent<TProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { editor, setEditor } = useTextEditorContext()
  const { isPreviewMode, isMobile, isLiveMode } = useGlobalContext()

  const backToHome = () => {
    window.location.href = 'https://www.scientifichub.io/'
  }

  useEffect(() => {
    if (editor?.isEditable && (isPreviewMode || isLiveMode)) {
      editor?.setEditable(false)
    } else {
      editor?.setEditable(true)
    }
  }, [editor, isPreviewMode, isLiveMode])

  const editorContext = useEditor({
    extensions: EXTENSIONS,
  })

  useEffect(() => {
    setEditor(editorContext)
  }, [editorContext, setEditor])

  return (
    <StyledContainer isPreviewMode={isPreviewMode || isLiveMode}>
      <Header />
      {isMobile && !isPreviewMode && !isLiveMode ? (
        <StyledNoMobileContainer direction="column" align="center" justify="center">
          <NoMobileIllustration />
          <Heading textAlign="center" as="h1">
            Our editor is not available in mobile version for the moment
          </Heading>
          <Paragraph color="text-light" textAlign="center">
            If you think this is a mistake you can{' '}
            <Link href="mailto:maxence@scientifichub.io" size="regular">
              contact us
            </Link>
            , sorry for the inconvenience.
          </Paragraph>
          {mounted && <button onClick={backToHome}>Back to home page</button>}
        </StyledNoMobileContainer>
      ) : (
        <>
          <Content>{children}</Content>
          <Footer />
        </>
      )}
    </StyledContainer>
  )
}

export const TextEditorLayout: FunctionComponent = ({ children, ...props }) => (
  <PublicationProvider>
    <TextEditorProvider>
      <TextEditorLayoutComponent {...props}>{children}</TextEditorLayoutComponent>
    </TextEditorProvider>
  </PublicationProvider>
)

export type TTextEditorLayoutProps = TProps
