import { useEffect, useState } from 'react'
import { TAuth, TAuthContext, TUser } from './context'
import firebase from 'firebase'
import { useRouter } from 'next/dist/client/router'
import { createUser } from '@src/services'

export const useAuth = (): TAuthContext => {
  const [user, setUser] = useState<TUser | null>(null)
  const [auth, setAuth] = useState<TAuth | null>(null)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (user && router.pathname !== '/user/onboarding' && !user?.isOnboardingFinished && auth) {
      router.push('/user/onboarding')
    }
  }, [router, user, auth])

  const updateAuth = (updatedAuth: any) => {
    if (updatedAuth) {
      setAuth(updatedAuth)
      setIsSignedIn(true)

      return
    }

    setAuth(null)
    setIsSignedIn(false)
  }

  useEffect(() => {
    if (!auth) {
      return
    }

    const db = firebase.firestore()

    db.collection('users')
      .where('uid', '==', auth.uid)
      .onSnapshot(async ({ docs }) => {
        if (docs.length) {
          const [userFromDB] = docs.map(doc => ({ id: doc.id, ...doc.data() }))

          setUser(userFromDB as TUser)
        } else {
          createUser({
            user: {
              uid: auth.uid,
              firstName: auth.displayName ? auth.displayName.split(' ')[0] : '',
              lastName: auth.displayName ? auth.displayName.split(' ')[1] : '',
              email: auth.email,
            },
          })
        }
      })
  }, [auth])

  return {
    user,
    auth,
    isSignedIn,
    updateAuth,
  }
}
