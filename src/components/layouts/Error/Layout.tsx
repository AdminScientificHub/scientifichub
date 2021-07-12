import React, { FunctionComponent } from 'react'

import { GlobalProvider } from '@src/contextes'

import { Header } from '../TextEditor/Header'

type TProps = {}

export const ErrorLayout: FunctionComponent<TProps> = ({ children }) => {
  return (
    <GlobalProvider>
      <Header />
      {children}
    </GlobalProvider>
  )
}

export type TLayoutProps = TProps
