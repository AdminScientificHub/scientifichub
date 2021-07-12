import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import AddIcon from '@src/assets/icons/plus.svg'
import { Flex, Paragraph } from '@src/components/core'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'
import { useClickOutside } from '@src/utils/hooks/useClickOutside'

import { StyledAddAuthorBtn, StyledAuthorModal, StyledContainer } from './Authors.styled'
import { AuthorsList } from './List'

type TProps = {}

export type TAuthor = {
  name: string
  link?: string
}

export const TextEditorAuthors: FunctionComponent<TProps> = () => {
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false)

  const [newAuthorName, setNewAuthorName] = useState('')
  const [newAuthorLink, setNewAuthorLink] = useState('')

  const { authors, setAuthors } = useTextEditorContext()
  const { isPreviewMode } = useGlobalContext()

  const ref = useRef(null)

  const { clickedOutside } = useClickOutside(ref)

  useEffect(() => {
    if (newAuthorName && clickedOutside) {
      setAuthors([...authors, { name: newAuthorName, link: newAuthorLink }])
    }

    if (clickedOutside) {
      setIsAuthorModalOpen(false)
      setNewAuthorLink('')
      setNewAuthorName('')
    }
  }, [clickedOutside, newAuthorName, newAuthorLink, authors, setAuthors])

  const handleAuthorChanges = (e: React.ChangeEvent<HTMLInputElement>, ctx: 'name' | 'link') => {
    const { value } = e.target

    switch (ctx) {
      case 'link':
        return setNewAuthorLink(value)
      case 'name':
        return setNewAuthorName(value)
    }
  }

  const handleAuthorOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e

    if (keyCode === 13) {
      setAuthors([...authors, { name: newAuthorName, link: newAuthorLink }])
      setNewAuthorLink('')
      setNewAuthorName('')
      setIsAuthorModalOpen(false)
    }
  }

  const updateAuthor = (authorIndex: number, updatedAuthor: TAuthor) => {
    setAuthors(
      authors.map((author, index) => {
        if (index === authorIndex) {
          return updatedAuthor
        }

        return author
      }),
    )
  }

  if (isPreviewMode && !authors.length) {
    return <></>
  }

  return (
    <StyledContainer position="relative">
      <>
        {isAuthorModalOpen && !isPreviewMode && (
          <StyledAuthorModal direction="column" onClick={e => e.stopPropagation()} forwardRef={ref}>
            <input
              placeholder="Albert Einstein"
              value={newAuthorName}
              onChange={e => handleAuthorChanges(e, 'name')}
              onKeyDown={handleAuthorOnKeyDown}
              autoFocus
            />
            <input
              placeholder="https://www.linkedin.com/in/Albert_Einstein"
              value={newAuthorLink}
              onChange={e => handleAuthorChanges(e, 'link')}
              onKeyDown={handleAuthorOnKeyDown}
            />
          </StyledAuthorModal>
        )}
        {!isPreviewMode && (
          <Flex>
            {!authors.length && (
              <Paragraph size="small" color="text-lighter">
                Click on the &apos;+&apos; to add an author
              </Paragraph>
            )}

            <StyledAddAuthorBtn
              onClick={e => {
                e.stopPropagation()
                setIsAuthorModalOpen(true)
              }}
            >
              <AddIcon />
            </StyledAddAuthorBtn>
          </Flex>
        )}
      </>
      <AuthorsList authors={authors} updateAuthor={updateAuthor} />
    </StyledContainer>
  )
}

export type TTextEditorAuthorsProps = TProps
