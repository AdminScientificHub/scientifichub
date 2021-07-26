import { createContext } from 'react'

type TContext = {}

const initialValue: TContext = {}

export const AuthContext = createContext(initialValue)

export type TAuthContext = TContext
