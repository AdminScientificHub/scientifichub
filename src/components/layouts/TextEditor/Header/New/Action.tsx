import { Span } from '@src/components/core'
import { NewDocumentModal } from '@src/components/_common'
import React, { FunctionComponent, useState } from 'react'
import { StyledNavigationItem } from '../Header.styled'

type TProps = {}

export const NewAction: FunctionComponent<TProps> = () => {
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false)

  return (
    <>
      <NewDocumentModal
        isModalOpen={isNewDocModalOpen}
        closeModal={() => setIsNewDocModalOpen(false)}
      />
      <StyledNavigationItem
        justify="center"
        align="center"
        onClick={() => setIsNewDocModalOpen(true)}
      >
        <Span size="small">New</Span>
      </StyledNavigationItem>
    </>
  )
}

export type TNewActionProps = TProps
