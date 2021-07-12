import { useGlobalContext, useTextEditorContext } from '@src/contextes'
import React, { FunctionComponent } from 'react'
import { StyledTitle } from './Title.styled'

type TProps = {}

export const TextEditorTitle: FunctionComponent<TProps> = () => {
  const { title, editor, setTitle } = useTextEditorContext()

  const { isPreviewMode } = useGlobalContext()

  const onTitleChange = (e: any) => {
    // Allow to have a dynamic textArea height
    e.target.style.height = '4.8rem'
    e.target.style.height = e.target.scrollHeight + 'px'

    // Small trick to handle textArea disappearing
    e.target.style.minHeight = '4.8rem'
    e.target.style.minHeight = e.target.scrollHeight + 'px'
  }

  return (
    <StyledTitle
      disabled={isPreviewMode}
      value={title}
      placeholder="Publication title"
      onClick={(e: any) => e.stopPropagation()}
      onInput={onTitleChange}
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
