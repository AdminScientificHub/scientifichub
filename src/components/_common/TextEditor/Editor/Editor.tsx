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

  return (
    <StyledContainer direction="column" onClick={() => editor?.commands.focus()}>
      {isPreviewMode && <ShareableLinks />}
      <TextEditorTitle />
      <TextEditorAuthors />
      <StyledEditor>
        <EditorContent editor={editor} />
        <EditorFloatingMenu />
      </StyledEditor>
    </StyledContainer>
  )
}

export type TEditorProps = TProps
