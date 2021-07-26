import React, { FunctionComponent, useEffect, useState } from 'react'

import BulletListExtension from '@tiptap/extension-bullet-list'
import FloatingMenuExtension from '@tiptap/extension-floating-menu'
import HeadingExtension from '@tiptap/extension-heading'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import ListItemExtension from '@tiptap/extension-list-item'
import OrderedListExtension from '@tiptap/extension-ordered-list'
import PlaceholderExtension from '@tiptap/extension-placeholder'
import UnderlineExtension from '@tiptap/extension-underline'
import {
  Indent as IndentExtension,
  MathBlock as MathBlockExtension,
  MathInline as MathInlineExtension,
  MathInlineMark as MathInlineMarkExtension,
} from '@src/components/_common/TextEditor/_extensions'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import NoMobileIllustration from '@src/assets/illustrations/no-mobile.svg'

import { TextEditorProvider, useGlobalContext, useTextEditorContext } from '@src/contextes'

import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { StyledContainer, StyledNoMobileContainer } from './Layout.styled'
import { Heading, Link, Paragraph } from '@src/components/core'

type TProps = {}

export const TextEditorLayoutComponent: FunctionComponent<TProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { editor, setEditor } = useTextEditorContext()
  const { isPreviewMode, isMobile } = useGlobalContext()

  useEffect(() => {
    if (editor) {
      editor?.setEditable(!isPreviewMode)
    }
  }, [editor, isPreviewMode])

  const editorContext = useEditor({
    extensions: [
      MathBlockExtension,
      StarterKit,
      PlaceholderExtension.configure({
        placeholder: 'Write or paste (⌘+V) your text here',
      }),
      LinkExtension.configure({
        HTMLAttributes: {
          target: '_blank',
        },
      }),
      IndentExtension,
      UnderlineExtension,
      FloatingMenuExtension,
      OrderedListExtension,
      BulletListExtension,
      ListItemExtension,
      MathInlineExtension,
      ImageExtension,
      MathInlineMarkExtension,
      HeadingExtension.extend({
        addGlobalAttributes() {
          return [
            {
              types: ['heading'],
              attributes: {
                id: {
                  default: null,
                },
              },
            },
          ]
        },
      }),
    ],
  })

  const backToHome = () => {
    window.location.href = 'https://www.scientifichub.io/'
  }

  useEffect(() => {
    setEditor(editorContext)
  }, [editorContext, setEditor])

  return (
    <StyledContainer isPreviewMode={isPreviewMode}>
      <Header />
      {isMobile && !isPreviewMode ? (
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
  <TextEditorProvider>
    <TextEditorLayoutComponent {...props}>{children}</TextEditorLayoutComponent>
  </TextEditorProvider>
)

export type TTextEditorLayoutProps = TProps
