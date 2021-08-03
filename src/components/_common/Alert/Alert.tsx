import React, { FunctionComponent } from 'react'
import { AlertComponentProps } from 'react-alert'
import {
  StyledCloseContainer,
  StyledContainer,
  StyledContentContainer,
  StyledIconContainer,
} from './Alert.styled'

import ErrorIcon from '@src/assets/icons/alert.svg'
import InfoIcon from '@src/assets/icons/info.svg'
import SuccessIcon from '@src/assets/icons/check-mark.svg'
import CloseIcon from '@src/assets/icons/close.svg'

type TProps = {} & AlertComponentProps

export const Alert: FunctionComponent<TProps> = ({ message, options: { type }, close }) => {
  return (
    <StyledContainer align="center" direction="row">
      <StyledIconContainer type={type} align="center" justify="center">
        {type === 'error' && <ErrorIcon />}
        {type === 'info' && <InfoIcon />}
        {type === 'success' && <SuccessIcon />}
      </StyledIconContainer>
      <StyledContentContainer>{message}</StyledContentContainer>
      <StyledCloseContainer align="center" justify="center" onClick={close}>
        <CloseIcon />
      </StyledCloseContainer>
    </StyledContainer>
  )
}

export type TAlertProps = TProps
