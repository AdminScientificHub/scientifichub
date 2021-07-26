import React, { FunctionComponent, useState } from 'react'
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

import LogoIcon from '@src/assets/icons/logo.svg'
import GoogleMinIcon from '@src/assets/icons/google-min.svg'
import { Separator } from '@src/components/_common'
import { AuthFormInput } from './Input/Input'

type TProps = {}

export const AuthForm: FunctionComponent<TProps> = () => {
  // Replace with react-hook-form
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  return (
    <StyledContainer position="relative">
      <StyledLogo>
        <LogoIcon />
      </StyledLogo>
      <Flex direction="column" justify="center">
        <StyledTopContent direction="column" align="start">
          <Heading as="h1">Hi, Welcome to ScientificHub 👋 !</Heading>
          <Paragraph color="text-light">
            We suggest using the <Span weight={700}>email address that you use at work</Span>.
          </Paragraph>
          <StyledGoogleButton>
            <GoogleMinIcon />
            <Span size="small" weight={700}>
              Sign In with Google
            </Span>
          </StyledGoogleButton>
        </StyledTopContent>
        <Separator text="Or sign with an Email" />
        <StyledForm>
          <AuthFormInput id="email" type="email" label="Email address" onChange={setEmail} />
          <AuthFormInput id="password" type="password" label="Password" onChange={setPassword} />
        </StyledForm>
        <StyledButton>Sign Up</StyledButton>
        <StyledLinkTo direction="row" align="center">
          <Paragraph color="text-lighter" size="small">
            Already registered ?
          </Paragraph>
          <a>Login to your Account</a>
        </StyledLinkTo>
      </Flex>
    </StyledContainer>
  )
}

export type TAuthFormProps = TProps
