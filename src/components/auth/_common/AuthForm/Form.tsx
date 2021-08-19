import React, { FunctionComponent } from 'react'
import {
  StyledButton,
  StyledContainer,
  StyledForm,
  StyledGoogleButton,
  StyledLinkTo,
  StyledLogo,
  StyledTopContent,
} from './Form.styled'
import { Flex, Heading, Paragraph, Span } from '@src/components/core'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import LogoIcon from '@src/assets/icons/logo.svg'
import GoogleMinIcon from '@src/assets/icons/google-min.svg'
import { AlertContent, Separator } from '@src/components/_common'
import { AuthFormInput } from './Input/Input'

import firebase from 'firebase/app'
import 'firebase/auth'

import * as yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useAlert } from 'react-alert'
import { getErrorContent } from './_utils/authErrorCodes'

type TProps = {
  context: 'sign-in' | 'sign-up'
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export interface TSchema {
  email: string
  password: string
}

export const AuthForm: FunctionComponent<TProps> = ({ context }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<TSchema>({ resolver: yupResolver(schema), reValidateMode: 'onSubmit' })
  const router = useRouter()
  const alert = useAlert()

  const authWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

    const firebaseAuth = firebase.auth()

    firebaseAuth
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        router.push('/')
      })
      .catch(reason => {
        alert.error(<AlertContent {...getErrorContent(reason.code)} type="error" />)
      })
  }

  const authWithPasswordAndEmail = ({ email, password }: TSchema) => {
    const firebaseAuth = firebase.auth()

    switch (context) {
      case 'sign-in':
        firebaseAuth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            router.push('/')
          })
          .catch(reason => {
            alert.error(<AlertContent {...getErrorContent(reason.code)} type="error" />)
          })
        return
      case 'sign-up':
        firebaseAuth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            router.push('/')
          })
          .catch(reason => {
            alert.error(<AlertContent {...getErrorContent(reason.code)} type="error" />)
          })
        return
    }
  }

  return (
    <StyledContainer position="relative">
      <StyledLogo>
        <LogoIcon />
      </StyledLogo>
      <Flex direction="column" justify="center">
        <StyledTopContent direction="column" align="start">
          <Heading as="h1">
            {context === 'sign-up' ? 'Hi, Welcome to ScientificHub 👋 !' : 'Hi, Welcome Back 👋 !'}
          </Heading>
          <Paragraph color="text-light">
            We suggest using the <Span weight={700}>email address that you use at work</Span>.
          </Paragraph>
          <StyledGoogleButton onClick={authWithGoogle}>
            <GoogleMinIcon />
            <Span size="small" weight={700}>
              Sign {context === 'sign-up' ? 'up' : 'in'} with Google
            </Span>
          </StyledGoogleButton>
        </StyledTopContent>
        <Separator text={`Or sign ${context === 'sign-up' ? 'up' : 'in'} with an Email`} />
        <StyledForm onSubmit={handleSubmit(authWithPasswordAndEmail)}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <AuthFormInput
                onChange={onChange}
                value={value}
                type="email"
                label="Email address"
                name="email"
                error={errors.email}
                clearErrors={clearErrors}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <AuthFormInput
                onChange={onChange}
                value={value}
                type="password"
                label="Password"
                name="password"
                error={errors.password}
                clearErrors={clearErrors}
              />
            )}
            name="password"
          />
        </StyledForm>
        <StyledButton onClick={handleSubmit(authWithPasswordAndEmail)}>
          Sign {context === 'sign-up' ? 'Up' : 'In'}
        </StyledButton>
        <StyledLinkTo direction="row" align="center">
          <Paragraph color="text-lighter" size="small">
            {context === 'sign-up' ? 'Already registered ?' : 'Not registered yet ?'}
          </Paragraph>
          <Link href={context === 'sign-up' ? '/auth/signin' : '/auth/signup'}>
            {context === 'sign-up' ? 'Login to your Account' : 'Create an Account'}
          </Link>
        </StyledLinkTo>
      </Flex>
    </StyledContainer>
  )
}

export type TAuthFormProps = TProps
