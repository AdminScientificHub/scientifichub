import { createContext } from 'react'

type TContext = {
  isMobile: boolean
  isPreviewMode: boolean
  isLiveMode: boolean
  isEditorPreview: boolean
  isErrorPage: boolean
}

const initialValue: TContext = {
  isMobile: false,
  isPreviewMode: false,
  isLiveMode: false,
  isEditorPreview: false,
  isErrorPage: false,
}

export const GlobalContext = createContext(initialValue)

export type TGlobalContext = TContext
