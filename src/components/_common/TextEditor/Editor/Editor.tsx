import React, { FunctionComponent } from 'react'

import { EditorContent } from '@tiptap/react'

import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { StyledContainer, StyledEditor } from './Editor.styled'
import { EditorFloatingMenu } from './FloatingMenu'
import { ShareableLinks } from './ShareableLinks'
import { TextEditorTitle } from './Title'
import { EditorInfos } from './Infos'

type TProps = {}

export const Editor: FunctionComponent<TProps> = () => {
  const { editor } = useTextEditorContext()
  const { isPreviewMode, isLiveMode } = useGlobalContext()

  const handleEditorFocus = () => {
    if (!editor) {
      return
    }

    const { doc } = editor.state
    const { lastChild } = editor.state.doc

    const islastChildAParagraph = lastChild?.type.name === 'paragraph'

    if (!islastChildAParagraph || (islastChildAParagraph && !!lastChild?.content.childCount)) {
      const endPosition = doc.content.size

      editor
        .chain()
        .insertContentAt(endPosition, { type: 'paragraph' })
        .focus(endPosition + 1)
        .run()
    } else {
      editor.commands.focus()
    }
  }

  return (
    <StyledContainer direction="column" onClick={handleEditorFocus}>
      {(isPreviewMode || isLiveMode) && <ShareableLinks />}
      <TextEditorTitle />
      <EditorInfos />
      <StyledEditor>
        {editor && <EditorContent editor={editor} />}
        <EditorFloatingMenu />
      </StyledEditor>
    </StyledContainer>
  )
}

export type TEditorProps = TProps
