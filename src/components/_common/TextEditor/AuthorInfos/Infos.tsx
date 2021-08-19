import { Flex, Paragraph } from '@src/components/core'
import { usePublicationContext } from '@src/contextes'
import React, { FunctionComponent, useMemo } from 'react'
import { StyledItem, StyledItemsContainer } from './Infos.styled'

type TProps = {}

export const AuthorInfos: FunctionComponent<TProps> = () => {
  const { publication } = usePublicationContext()

  const principalAuthor = useMemo(() => {
    return publication?.authors.find(author => author.type === 'PRINCIPAL')
  }, [publication])

  return (
    <Flex direction="column">
      <Paragraph weight={700}>
        {principalAuthor?.firstName} {principalAuthor?.lastName}
      </Paragraph>
      <Paragraph size="small">{principalAuthor?.title}</Paragraph>
      <StyledItemsContainer direction="row">
        {principalAuthor?.fieldOfStudies.map(fieldOfStudy => (
          <StyledItem key={fieldOfStudy.value}>{fieldOfStudy.label}</StyledItem>
        ))}
      </StyledItemsContainer>
    </Flex>
  )
}

export type TAuthorInfosProps = TProps
