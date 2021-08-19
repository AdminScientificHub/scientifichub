import React, { FunctionComponent, useMemo } from 'react'
import ModalComponent from 'react-modal'

import { useGlobalContext } from '@src/contextes'

import { mobileModalStyle, modalStyle } from './Modal.styled'

type TProps = {
  isModalOpen: boolean
  closeModal: () => void
  maxWidth?: string
  padding?: string
}

ModalComponent.setAppElement('#__next')

export const Modal: FunctionComponent<TProps> = ({
  isModalOpen,
  children,
  closeModal,
  maxWidth = '50%',
  padding = '2.4rem',
}) => {
  const { isMobile } = useGlobalContext()

  const style = useMemo(() => {
    return isMobile ? mobileModalStyle({ maxWidth, padding }) : modalStyle({ maxWidth, padding })
  }, [isMobile, maxWidth, padding])

  return (
    <ModalComponent
      style={style}
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      {children}
    </ModalComponent>
  )
}

export type TModalProps = TProps
