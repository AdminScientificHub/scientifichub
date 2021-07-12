import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { Flex, Link, Paragraph, Span } from '@src/components/core'
import { useGlobalContext } from '@src/contextes'
import { useClickOutside } from '@src/utils/hooks/useClickOutside'

import { TAuthor } from '../..'
import { StyledAuthorModal } from './Item.styled'

type TProps = {
  author: TAuthor
  isLast: boolean
  updateAuthor: (name: string, link?: string) => void
}

export const AuthorsListItem: FunctionComponent<TProps> = ({ updateAuthor, author, isLast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [authorName, setAuthorName] = useState(author.name)
  const [authorLink, setAuthorLink] = useState(author.link)

  const { isPreviewMode } = useGlobalContext()

  const ref = useRef(null)

  const { clickedOutside } = useClickOutside(ref)

  const openModal = () => {
    if (isPreviewMode) {
      return
    }

    setIsModalOpen(true)
  }

  useEffect(() => {
    if (clickedOutside && (authorName !== author.name || authorLink !== author.link)) {
      updateAuthor(authorName, authorLink)
    }

    if (clickedOutside) {
      setIsModalOpen(false)
    }
  }, [clickedOutside, authorName, authorLink, author, updateAuthor])

  const handleAuthorChanges = (e: React.ChangeEvent<HTMLInputElement>, ctx: 'name' | 'link') => {
    const { value } = e.target

    switch (ctx) {
      case 'link':
        return setAuthorLink(value)
      case 'name':
        return setAuthorName(value)
    }
  }

  const handleAuthorOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e

    if (keyCode === 13) {
      updateAuthor(authorName, authorLink)
      setIsModalOpen(false)
    }
  }

  return (
    <Flex direction="row" onClick={openModal} position="relative">
      {isModalOpen && (
        <StyledAuthorModal direction="column" onClick={e => e.stopPropagation()} forwardRef={ref}>
          <input
            placeholder="Albert Einstein"
            value={authorName}
            onChange={e => handleAuthorChanges(e, 'name')}
            onKeyDown={handleAuthorOnKeyDown}
            autoFocus
          />
          <input
            placeholder="https://www.linkedin.com/in/Albert_Einstein"
            value={authorLink}
            onChange={e => handleAuthorChanges(e, 'link')}
            onKeyDown={handleAuthorOnKeyDown}
          />
        </StyledAuthorModal>
      )}

      {author.link ? (
        <Link
          color="text-light"
          size="small"
          href={isPreviewMode ? author.link : undefined}
          target="_blank"
        >
          {author.name}
        </Link>
      ) : (
        <Paragraph size="small" color="text-light">
          {author.name}
        </Paragraph>
      )}
      {!isLast && (
        <Span color="text-light" size="small">
          ,
        </Span>
      )}
    </Flex>
  )
}

export type TItemProps = TProps
