import React, { FunctionComponent, useContext } from 'react'
import { TextEditorContext, TTextEditorContext } from './context'
import { useTextEditor } from './hook'

export const TextEditorProvider: FunctionComponent = ({ children }) => {
  const value = useTextEditor()

  return <TextEditorContext.Provider value={value}>{children}</TextEditorContext.Provider>
}

export const useTextEditorContext = (): TTextEditorContext => {
  return useContext(TextEditorContext)
}
