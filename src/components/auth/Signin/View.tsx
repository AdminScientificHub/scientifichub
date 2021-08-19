import React, { FunctionComponent } from 'react'
import { AuthForm } from '../_common'

type TProps = {}

export const SigninView: FunctionComponent<TProps> = () => {
  return <AuthForm context="sign-in" />
}

export type TSigninViewProps = TProps
