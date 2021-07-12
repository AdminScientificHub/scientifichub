import React, { FunctionComponent, useContext } from 'react'
import { GlobalContext } from './context'
import { useGlobal } from './hook'
import { FirestoreProvider } from '@react-firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

const CONFIG = {
  apiKey: 'AIzaSyDnMovccpoKbzDroOaJBtVfTjUiBKHqQsc',
  authDomain: 'scientifichub-a905b.firebaseapp.com',
  projectId: 'scientifichub-a905b',
  storageBucket: 'scientifichub-a905b.appspot.com',
  messagingSenderId: '723821793769',
  appId: '1:723821793769:web:4c4bf70309d1ab6edc3b78',
  measurementId: 'G-2WJX5NWBWT',
  databaseURL: '',
}

export const GlobalProvider: FunctionComponent = ({ children }) => {
  const value = useGlobal()

  return (
    <FirestoreProvider {...CONFIG} firebase={firebase}>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </FirestoreProvider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
