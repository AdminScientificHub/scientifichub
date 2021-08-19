import { Span } from '@src/components/core'
import { usePublicationContext } from '@src/contextes'
import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent } from 'react'
import { StyledNavigationItem } from '../Header/Header.styled'

type TProps = {}

export const PreviewAction: FunctionComponent<TProps> = () => {
  const { push } = useRouter()
  const { publicationId } = usePublicationContext()

  return (
    <StyledNavigationItem
      justify="center"
      align="center"
      onClick={() => push(`/publication/${publicationId}/preview`)}
    >
      <Span size="small">Preview</Span>
    </StyledNavigationItem>
  )
}

export type TPreviewActionProps = TProps
