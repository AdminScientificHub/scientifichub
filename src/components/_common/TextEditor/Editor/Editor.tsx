import React, { FunctionComponent } from 'react'

import { EditorContent } from '@tiptap/react'

import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { TextEditorAuthors } from './Authors'
import { StyledContainer, StyledEditor } from './Editor.styled'
import { EditorFloatingMenu } from './FloatingMenu'
import { ShareableLinks } from './ShareableLinks'
import { TextEditorTitle } from './Title'

type TProps = {}

export const Editor: FunctionComponent<TProps> = () => {
  const { editor } = useTextEditorContext()
  const { isPreviewMode } = useGlobalContext()

  const handleEditorFocus = () => {
    if (!editor) {
      return
    }

    const { doc } = editor.state

    const { lastChild } = editor.state.doc
    const endPosition = doc.content.size

    if (
      lastChild?.type.name !== 'paragraph' ||
      (lastChild.type.name === 'paragraph' && !!lastChild?.content.childCount)
    ) {
      {
        editor
          .chain()
          .insertContentAt(endPosition, { type: 'paragraph' })
          .focus(endPosition + 1)
          .run()
      }
    } else {
      editor.commands.focus()
    }
  }

  return (
    <StyledContainer direction="column" onClick={handleEditorFocus}>
      {isPreviewMode && <ShareableLinks />}
      <TextEditorTitle />
      <TextEditorAuthors />
      <StyledEditor>
        {editor && <EditorContent editor={editor} />}
        <EditorFloatingMenu />
      </StyledEditor>
    </StyledContainer>
  )
}

export type TEditorProps = TProps
