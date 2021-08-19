import React, { FunctionComponent } from 'react'

import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { StyledTitle } from './Title.styled'
import { useEffect } from 'react'

type TProps = {}

export const TextEditorTitle: FunctionComponent<TProps> = () => {
  const { title, editor, setTitle } = useTextEditorContext()

  const { isPreviewMode, isLiveMode } = useGlobalContext()

  useEffect(() => {
    const titleInput = document.querySelector('#editor-title') as HTMLInputElement

    if (titleInput) {
      // Allow to have a dynamic textArea height
      titleInput.style.height = '4.8rem'
      titleInput.style.height = titleInput.scrollHeight + 'px'

      // Small trick to handle textArea disappearing
      titleInput.style.minHeight = '4.8rem'
      titleInput.style.minHeight = titleInput.scrollHeight + 'px'
    }
  }, [title])

  return (
    <StyledTitle
      disabled={isPreviewMode || isLiveMode}
      value={title}
      id="editor-title"
      placeholder="Publication title"
      onClick={(e: any) => e.stopPropagation()}
      onChange={(e: any) => setTitle(e.target.value)}
      onKeyDown={(e: any) => {
        if (e.keyCode === 13) {
          e.preventDefault()
          editor?.commands.focus()
        }
      }}
    />
  )
}

export type TTextEditorTitleProps = TProps
