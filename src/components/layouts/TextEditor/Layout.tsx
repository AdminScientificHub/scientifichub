import React, { FunctionComponent, useEffect } from 'react'
import {
  TextEditorProvider,
  useTextEditorContext,
  GlobalProvider,
  useGlobalContext,
  FirebaseProvider,
} from '@src/contextes'
import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { StyledContainer } from './Layout.styled'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import UnderlineExtension from '@tiptap/extension-underline'
import PlaceholderExtension from '@tiptap/extension-placeholder'
import FloatingMenuExtension from '@tiptap/extension-floating-menu'
import BulletListExtension from '@tiptap/extension-bullet-list'
import ListItemExtension from '@tiptap/extension-list-item'
import OrderedListExtension from '@tiptap/extension-ordered-list'
import HeadingExtension from '@tiptap/extension-heading'
import ImageExtension from '@tiptap/extension-image'

type TProps = {}

export const TextEditorLayoutComponent: FunctionComponent<TProps> = ({ children }) => {
  const { editor, setEditor } = useTextEditorContext()
  const { isPreviewMode } = useGlobalContext()

  useEffect(() => {
    if (editor) {
      editor?.setEditable(!isPreviewMode)
    }
  }, [editor, isPreviewMode])

  const editorContext = useEditor({
    extensions: [
      StarterKit,
      PlaceholderExtension.configure({
        placeholder: 'Write or paste (⌘+V) your text here',
      }),
      LinkExtension.configure({
        HTMLAttributes: {
          target: '_blank',
        },
      }),
      UnderlineExtension,
      FloatingMenuExtension,
      OrderedListExtension,
      BulletListExtension,
      ListItemExtension,
      ImageExtension,
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

  useEffect(() => {
    setEditor(editorContext)
  }, [editorContext, setEditor])

  return (
    <StyledContainer isPreviewMode={isPreviewMode}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </StyledContainer>
  )
}

export const TextEditorLayout: FunctionComponent = ({ children, ...props }) => (
  <GlobalProvider>
    <FirebaseProvider>
      <TextEditorProvider>
        <TextEditorLayoutComponent {...props}>{children}</TextEditorLayoutComponent>
      </TextEditorProvider>
    </FirebaseProvider>
  </GlobalProvider>
)

export type TTextEditorLayoutProps = TProps
