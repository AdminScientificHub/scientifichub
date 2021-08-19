import { Paragraph } from '@src/components/core'
import { Thumbnail } from '@src/components/_common/Thumbnail'
import { useGlobalContext, usePublicationContext } from '@src/contextes'
import { formatToDate } from '@src/utils/text/formatDate'
import React, { FunctionComponent, useMemo } from 'react'
import moment from 'moment'
import { StyledContainer } from './Infos.styled'

type TProps = {}

export const EditorInfos: FunctionComponent<TProps> = () => {
  const { publication } = usePublicationContext()
  const { isPreviewMode, isLiveMode } = useGlobalContext()

  const mainAuthor = useMemo(
    () => publication?.authors.find(author => author.type === 'PRINCIPAL'),
    [publication],
  )

  const readTime = useMemo(() => {
    return Math.ceil(
      (publication?.content.replace(/<\/?[^>]+(>|$)/g, '').split(' ').length || 0) / 300,
    )
  }, [publication])

  if (!mainAuthor || !publication || (!isPreviewMode && !isLiveMode)) {
    return <></>
  }

  return (
    <StyledContainer align="center">
      <Thumbnail size="medium" username={mainAuthor?.firstName} />
      <Paragraph size="small" weight={700}>
        {mainAuthor.firstName} {mainAuthor.lastName}
      </Paragraph>
      <Paragraph color="text-light" size="small">
        {publication?.publishedAt
          ? formatToDate(moment.utc(publication.updatedAt.toDate()).toString())
          : 'Not published yet'}{' '}
        · {readTime} min read
      </Paragraph>
    </StyledContainer>
  )
}

export type TEditorInfosProps = TProps
