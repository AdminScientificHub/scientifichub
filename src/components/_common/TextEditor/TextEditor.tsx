import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, useEffect } from 'react'

import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { Editor } from './Editor'
import { TAuthor } from './Editor/Authors'
import { TableOfContent } from './TableOfContent'
import { StyledContainer } from './TextEditor.styled'

type TProps = {
  authors?: TAuthor[]
  content?: string
  title?: string
  isLoading?: boolean
}

export const TextEditor: FunctionComponent<TProps> = ({
  content,
  title,
  authors,
  isLoading = true,
}) => {
  const { isLiveMode } = useGlobalContext()
  const { setAuthors, setTitle, setContent } = useTextEditorContext()

  const router = useRouter()

  useEffect(() => {
    if (isLiveMode && !isLoading && (!content || !title)) {
      router.push('/publication/error')
    }
  }, [isLiveMode, isLoading, content, title, router])

  useEffect(() => {
    if (content && title && authors?.length) {
      setContent(content)
      setTitle(title)
      setAuthors(authors)
    }
  }, [content, title, authors, setAuthors, setContent, setTitle])

  return (
    <>
      <StyledContainer>
        <Editor />
      </StyledContainer>
      <TableOfContent />
    </>
  )
}

export type TTextEditorProps = TProps
