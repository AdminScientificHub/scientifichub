import { createContext } from 'react'

export type TUser = {
  uid: string
  photoURL: string
  email: string
  displayName: string
  emailVerified: boolean
}

type TContext = {
  user: TUser | null
  isSignedIn: boolean
  setUser: (user: TUser) => void
}

const initialValue: TContext = {
  user: null,
  isSignedIn: false,
  setUser: () => {
    {
    }
  },
}

export const AuthContext = createContext(initialValue)

export type TAuthContext = TContext
