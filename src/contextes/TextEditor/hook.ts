import { TAuthor } from '@src/components/_common/TextEditor/Editor/Authors'
import { Editor } from '@tiptap/react'
import { useRouter } from 'next/dist/client/router'

import { useEffect, useState } from 'react'
import { useGlobalContext } from '../Global'
import { TTextEditorContext } from './context'

export const useTextEditor = (): TTextEditorContext => {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [title, setTitle] = useState<string>('')
  const [authors, setAuthors] = useState<TAuthor[]>([])
  const [isNewDocumentModalOpen, setIsNewDocumentModalOpen] = useState(false)

  const { pathname, push } = useRouter()
  const { isPreviewMode, isLiveMode } = useGlobalContext()

  // First visit logic
  useEffect(() => {
    if (pathname === '/publication/new') {
      const localData = localStorage.getItem('editor')

      if (localData) return

      setIsNewDocumentModalOpen(true)
    }
  }, [pathname])

  // Redirect to new publication when no localStorage
  useEffect(() => {
    const isPreviewPage = pathname === '/publication/preview'
    const localData = localStorage.getItem('editor')
    const parsedData = localData && JSON.parse(localData)

    if (isPreviewPage && (!title || !parsedData.content.length) && editor) {
      push('/publication/new')
    }
  }, [pathname, isPreviewMode, title, editor])

  // Update cache on update
  useEffect(() => {
    if (!editor || isLiveMode) return

    const localData = localStorage.getItem('editor')

    editor?.on('update', () => {
      const parsedLocalData = localData && JSON.parse(localData)

      localStorage.setItem(
        'editor',
        JSON.stringify({
          ...editor.getJSON(),
          ...(parsedLocalData && {
            title: parsedLocalData.title,
            authors: parsedLocalData.authors,
          }),
        }),
      )
    })

    if (localData) {
      const localDataParsed = JSON.parse(localData)

      !editor.isDestroyed && editor?.chain().setContent(localDataParsed, true).focus().run()
    }
  }, [editor, isLiveMode])

  useEffect(() => {
    const localData = localStorage.getItem('editor')

    if (isLiveMode || !localData) return

    const parsedData = JSON.parse(localData)

    parsedData.title && setTitle(parsedData.title)
    parsedData.authors && setAuthors(parsedData.authors)
  }, [isLiveMode])

  const handleTitleChange = (newTitle: string) => {
    const localData = localStorage.getItem('editor')

    setTitle(newTitle)

    if (isLiveMode) return

    if (localData) {
      localStorage.setItem(
        'editor',
        JSON.stringify({ ...(localData && JSON.parse(localData)), title: newTitle }),
      )
    } else {
      localStorage.setItem('editor', JSON.stringify({ title: newTitle }))
    }
  }

  const setContent = (content: string) => {
    !editor?.isDestroyed && editor?.chain().setContent(content, true).focus().run()

    localStorage.setItem('editor', JSON.stringify(editor?.getJSON()))
  }

  const handleAuthorsChange = (authors: TAuthor[]) => {
    const localData = localStorage.getItem('editor')

    setAuthors(authors)

    if (isLiveMode) return

    if (localData) {
      localStorage.setItem(
        'editor',
        JSON.stringify({ ...(localData && JSON.parse(localData)), authors }),
      )
    } else {
      localStorage.setItem('editor', JSON.stringify({ authors }))
    }
  }

  return {
    authors,
    title,
    editor,
    isNewDocumentModalOpen,
    setEditor,
    setContent,
    setTitle: handleTitleChange,
    setAuthors: handleAuthorsChange,
    setIsNewDocumentModalOpen,
  }
}
