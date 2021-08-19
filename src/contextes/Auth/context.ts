import { createContext } from 'react'
import { TPublication } from '../Publication/context'

export type TAuth = any

export type TUser = {
  id: string
  uid: string
  firstName: string
  title: string
  lastName: string
  email: string
  fieldOfStudies: { label: string; value: string }[]
  isOnboardingFinished: boolean
  publications: TPublication[]
}

type TContext = {
  user: TUser | null
  auth: TAuth | null
  isSignedIn: boolean
  updateAuth: (auth: TAuth) => void
}

const initialValue: TContext = {
  auth: null,
  user: null,
  isSignedIn: false,
  updateAuth: () => {
    {
    }
  },
}

export const AuthContext = createContext(initialValue)

export type TAuthContext = TContext
