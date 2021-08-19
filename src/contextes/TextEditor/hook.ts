import { useCallback, useEffect, useMemo, useState } from 'react'
import { Editor } from '@tiptap/react'
import firebase from 'firebase/app'

import { TTextEditorContext } from './context'
import { usePublicationContext } from '../Publication'
import { useDebounceBoolean, useDebounceString } from '@src/utils/hooks/useDebounce'
import { useRouter } from 'next/dist/client/router'
import { updatePublication } from '@src/services'

export const useTextEditor = (): TTextEditorContext => {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [editorPublicationId, setEditorPublicationId] = useState('')

  const [title, setTitle] = useState<string>('')
  const [debouncedTitle, isTitleDebouncing, isTitleFistDeboucing] = useDebounceString(title, 300)

  const [content, setContent] = useState<string>('')
  const [debouncedContent, isContentDebouncing, isContentFistDeboucing] = useDebounceString(
    content,
    300,
  )

  const [isSaving, setIsSaving] = useState(false)
  const [isSavingDebounced] = useDebounceBoolean(
    (isTitleDebouncing && !isTitleFistDeboucing) ||
      (isContentDebouncing && !isContentFistDeboucing) ||
      isSaving,
  )

  const db = useMemo(() => firebase.firestore(), [])
  const router = useRouter()

  const { publication, publicationId } = usePublicationContext()

  useEffect(() => {
    if (
      router.pathname === '/publication/[publicationId]/edit' &&
      publication?.status === 'PUBLISHED'
    ) {
      router.push(`/publication/${publication.id}`)
    }
  }, [publication?.id, publication?.status, router])

  useEffect(() => {
    if (publication && editorPublicationId !== publication.id) {
      setTitle(publication.title)
      setContent(publication.content)
      setEditorPublicationId(publicationId)
      editor?.chain().focus().setContent(publication.content, true).run()
    }
  }, [editor, publicationId, editorPublicationId, publication])

  useEffect(() => {
    if (
      publication &&
      debouncedTitle !== publication?.title &&
      !isTitleDebouncing &&
      !isTitleFistDeboucing &&
      publicationId === editorPublicationId
    ) {
      setIsSaving(true)

      updatePublication({
        publicationId,
        publication: {
          title: debouncedTitle,
        },
        callback: () => {
          setIsSaving(false)
        },
      })
    }
  }, [
    db,
    debouncedTitle,
    publicationId,
    title,
    publication,
    isTitleDebouncing,
    isTitleFistDeboucing,
    editorPublicationId,
  ])

  const onContentChange = useCallback(() => {
    setContent(editor?.getHTML() || '')
  }, [editor])

  useEffect(() => {
    editor?.on('update', onContentChange)

    return () => {
      editor?.off('update', onContentChange)
    }
  }, [editor, onContentChange])

  useEffect(() => {
    if (
      publication &&
      debouncedContent !== publication.content &&
      !isContentDebouncing &&
      !isContentFistDeboucing &&
      publicationId === editorPublicationId
    ) {
      setIsSaving(true)

      updatePublication({
        publicationId,
        publication: {
          content: debouncedContent,
        },
        callback: () => {
          setIsSaving(false)
        },
      })
    }
  }, [
    db,
    debouncedContent,
    editorPublicationId,
    isContentDebouncing,
    isContentFistDeboucing,
    publication,
    publicationId,
  ])

  return {
    title,
    editor,
    isSaving: isSavingDebounced,
    setEditor,
    setTitle,
  }
}
