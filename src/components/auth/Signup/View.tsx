import React, { FunctionComponent } from 'react'
import { AuthForm } from '../_common'

type TProps = {}

export const SignupView: FunctionComponent<TProps> = () => {
  return <AuthForm context="sign-up" />
}

export type TSignupViewProps = TProps
