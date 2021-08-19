import { useGlobalContext } from '@src/contextes'

import React, { FunctionComponent } from 'react'

import { AuthorInfos } from './AuthorInfos'

import { Editor } from './Editor'

import { TableOfContent } from './TableOfContent'
import { StyledSidebar } from './TextEditor.styled'

type TProps = {
  showSidebar: boolean
}

export const TextEditor: FunctionComponent<TProps> = ({ showSidebar }) => {
  const { isPreviewMode, isLiveMode } = useGlobalContext()

  return (
    <>
      <div>
        <Editor />
      </div>
      {(isPreviewMode || isLiveMode) && (
        <StyledSidebar direction="column" showSidebar={showSidebar}>
          <AuthorInfos />
          <TableOfContent />
        </StyledSidebar>
      )}
    </>
  )
}

export type TTextEditorProps = TProps
