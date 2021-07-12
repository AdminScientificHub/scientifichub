import React, { FunctionComponent, useContext } from 'react'
import { FirebaseContext } from './context'
import { useFirebase } from './hook'

export const FirebaseProvider: FunctionComponent = ({ children }) => {
  const value = useFirebase()

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
}

export const useFirebaseContext = () => useContext(FirebaseContext)
