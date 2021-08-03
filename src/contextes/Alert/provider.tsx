import React, { FunctionComponent } from 'react'

import { transitions, Provider, AlertProviderProps } from 'react-alert'
import { Alert } from '@src/components/_common'

const options: AlertProviderProps = {
  timeout: 5000,
  transition: transitions.FADE,
  offset: '30px',
  template: Alert,
  containerStyle: {
    alignItems: 'flex-end',
    right: 0,
    top: 0,
    margin: '3rem',
    width: 'calc(100% - 6rem)',
    pointerEvents: 'all',
  },
}

export const AlertProvider: FunctionComponent = ({ children }) => {
  return <Provider {...options}>{children}</Provider>
}
