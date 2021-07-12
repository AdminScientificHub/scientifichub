import React, { FunctionComponent } from 'react'
import ModalComponent from 'react-modal'

import { useGlobalContext } from '@src/contextes'

import { mobileModalStyle, modalStyle } from './Modal.styled'

type TProps = {
  isModalOpen: boolean
  closeModal: () => void
}

ModalComponent.setAppElement('#__next')

export const Modal: FunctionComponent<TProps> = ({ isModalOpen, children, closeModal }) => {
  const { isMobile } = useGlobalContext()

  return (
    <ModalComponent
      style={isMobile ? mobileModalStyle : modalStyle}
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      {children}
    </ModalComponent>
  )
}

export type TModalProps = TProps
