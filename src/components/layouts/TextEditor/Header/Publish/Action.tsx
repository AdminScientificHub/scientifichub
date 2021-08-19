import { Span } from '@src/components/core'
import { PublishPublicationModal } from '@src/components/_common'
import React, { FunctionComponent, useState } from 'react'
import { StyledNavigationItem } from '../Header.styled'

type TProps = {}

export const PublishAction: FunctionComponent<TProps> = () => {
  const [isPublishingModalOpen, setIsPublishingModalOpen] = useState(false)

  return (
    <>
      <PublishPublicationModal
        isModalOpen={isPublishingModalOpen}
        closeModal={() => setIsPublishingModalOpen(false)}
      />
      <StyledNavigationItem
        justify="center"
        align="center"
        onClick={() => setIsPublishingModalOpen(true)}
      >
        <Span size="small">Publish</Span>
      </StyledNavigationItem>
    </>
  )
}

export type TPublishActionProps = TProps
