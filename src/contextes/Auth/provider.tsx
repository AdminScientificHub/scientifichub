import React, { FunctionComponent, useContext, useEffect } from 'react'
import firebase from 'firebase/app'
import { FirebaseAuthConsumer, FirebaseAuthProvider } from '@react-firebase/auth'
import { FirestoreProvider } from '@react-firebase/firestore'
import 'firebase/auth'
import 'firebase/firestore'

import { AuthContext, TAuthContext } from './context'
import { useAuth } from './hook'
import { useRouter } from 'next/dist/client/router'

import { isEmpty } from 'lodash'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDnMovccpoKbzDroOaJBtVfTjUiBKHqQsc',
  authDomain: 'scientifichub-a905b.firebaseapp.com',
  projectId: 'scientifichub-a905b',
  storageBucket: 'scientifichub-a905b.appspot.com',
  messagingSenderId: '723821793769',
  appId: '1:723821793769:web:4c4bf70309d1ab6edc3b78',
  measurementId: 'G-2WJX5NWBWT',
  databaseURL: '',
}

const AuthContainerHanlder: FunctionComponent<{ auth: any; firebaseApp: any }> = ({
  children,
  auth: userAuth,
  firebaseApp,
}) => {
  const { updateAuth, auth } = useAuthContext()
  const { push, pathname } = useRouter()

  useEffect(() => {
    updateAuth(userAuth)
  }, [userAuth, updateAuth])

  if (
    !auth &&
    !userAuth &&
    !['/auth/signin', '/auth/signup'].includes(pathname) &&
    !isEmpty(firebaseApp)
  ) {
    push('/auth/signin')

    return <></>
  }

  if (
    (auth || userAuth) &&
    ['/auth/signin', '/auth/signup'].includes(pathname) &&
    !isEmpty(firebaseApp)
  ) {
    push('/')

    return <></>
  }

  return <>{children}</>
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  const value = useAuth()

  return (
    <FirestoreProvider {...FIREBASE_CONFIG} firebase={firebase}>
      <FirebaseAuthProvider firebase={firebase} {...FIREBASE_CONFIG}>
        <AuthContext.Provider value={value}>
          <FirebaseAuthConsumer>
            {({ user: auth, firebase: firebaseApp }) => (
              <AuthContainerHanlder firebaseApp={firebaseApp} auth={auth}>
                {children}
              </AuthContainerHanlder>
            )}
          </FirebaseAuthConsumer>
        </AuthContext.Provider>
      </FirebaseAuthProvider>
    </FirestoreProvider>
  )
}

export const useAuthContext = (): TAuthContext => useContext(AuthContext)
