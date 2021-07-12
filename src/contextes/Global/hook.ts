import { useEffect, useState } from 'react'
import { TGlobalContext } from './context'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/dist/client/router'

export const useGlobal = (): TGlobalContext => {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isLiveMode, setIsLiveMode] = useState(false)
  const [isEditorPreview, setIsEditorPreview] = useState(false)
  const [isErrorPage, setIsErrorPage] = useState(false)

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })
  const router = useRouter()

  useEffect(() => {
    setIsPreviewMode(router.pathname === '/publication/preview' || !!router.query.publicationId)
    setIsLiveMode(!!router.query.publicationId)
    setIsEditorPreview(router.pathname === '/publication/preview')
    setIsErrorPage(router.pathname === '/publication/error')
  }, [router.pathname])

  return {
    isMobile,
    isPreviewMode,
    isLiveMode,
    isEditorPreview,
    isErrorPage,
  }
}
