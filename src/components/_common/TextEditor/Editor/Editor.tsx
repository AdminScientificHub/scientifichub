import React, { FunctionComponent } from 'react'

import { StyledContainer, StyledEditor } from './Editor.styled'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { TextEditorTitle } from './Title'
import { TextEditorAuthors } from './Authors'
import { ShareableLinks } from './ShareableLinks'
import { EditorFloatingMenu } from './FloatingMenu'
import { EditorContent } from '@tiptap/react'

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
