import React, { FunctionComponent, useContext } from 'react'

import { AuthContext, TAuthContext } from './context'
import { useAuth } from './hook'

export const AuthProvider: FunctionComponent = ({ children }) => {
  const value = useAuth()

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): TAuthContext => useContext(AuthContext)
