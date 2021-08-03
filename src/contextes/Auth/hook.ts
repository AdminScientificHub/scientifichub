import { useState } from 'react'
import { TAuthContext, TUser } from './context'

export const useAuth = (): TAuthContext => {
  const [user, setUser] = useState<TUser | null>(null)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  const updateUser = (updatedUser: any) => {
    if (updatedUser) {
      setUser(updatedUser)
      setIsSignedIn(true)

      return
    }

    setUser(null)
    setIsSignedIn(false)
  }

  return {
    user,
    isSignedIn,
    setUser: updateUser,
  }
}
