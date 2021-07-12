import { Flex, Link, Paragraph, Span } from '@src/components/core'
import { useGlobalContext } from '@src/contextes'
import React, { FunctionComponent } from 'react'
import { TAuthor } from '..'
import { AuthorsListItem } from './Item'
import { StyledAuthorsContainer } from './List.styled'

type TProps = {
  authors: TAuthor[]
  updateAuthor: (index: number, author: TAuthor) => void
}

export const AuthorsList: FunctionComponent<TProps> = ({ updateAuthor, authors }) => {
  const { isPreviewMode } = useGlobalContext()

  if (!authors.length) {
    return <></>
  }

  return (
    <StyledAuthorsContainer isPreviewMode={isPreviewMode}>
      {!!authors.length &&
        authors.map((author, index) => (
          <Flex direction="row" key={index}>
            <AuthorsListItem
              updateAuthor={(name, link) => updateAuthor(index, { name, link })}
              author={author}
              isLast={index + 1 === authors.length}
            />
          </Flex>
        ))}
    </StyledAuthorsContainer>
  )
}

export type TListProps = TProps
