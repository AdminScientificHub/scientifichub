import React, { FunctionComponent, useContext } from 'react'
import { GlobalContext, TGlobalContext } from './context'
import { useGlobal } from './hook'

export const GlobalProvider: FunctionComponent = ({ children }) => {
  const value = useGlobal()

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = (): TGlobalContext => useContext(GlobalContext)
