import React, { FunctionComponent, useContext } from 'react'
import { PublicationContext, TPublicationContext } from './context'
import { usePublication } from './hook'

export const PublicationProvider: FunctionComponent = ({ children }) => {
  const value = usePublication()

  return <PublicationContext.Provider value={value}>{children}</PublicationContext.Provider>
}

export const usePublicationContext = (): TPublicationContext => {
  return useContext(PublicationContext)
}
