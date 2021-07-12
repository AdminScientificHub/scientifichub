import { createContext } from 'react'

type TContext = {}

const initialValue: TContext = {}

export const FirebaseContext = createContext(initialValue)

export type TFirebaseContext = TContext
