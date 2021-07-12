import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'

import SummaryIllustration from '@src/assets/illustrations/summary.svg'
import { Heading, Link, Paragraph } from '@src/components/core'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { UploadFileModal } from '../..'
import {
  StyledContainer,
  StyledItem,
  StyledListContainer,
  StyledNoTableOfContentContainer,
} from './TableOfContent.styled'

type THeading = {
  level: 1 | 2 | 3
  text: string
  id: string
  position: 1 | 2 | 3
}

export const TableOfContent: FunctionComponent = () => {
  const [allHeadings, setAllHeadings] = useState<THeading[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { editor } = useTextEditorContext()
  const { isMobile, isPreviewMode } = useGlobalContext()

  const handleUpdate = useCallback(() => {
    if (!editor) {
      return
    }

    const headings: THeading[] = []
    const transaction = editor.state.tr

    editor.state.doc.descendants((node: any, pos: number) => {
      if (node.type.name === 'heading') {
        const id = `heading-${headings.length + 1}`

        if (node.attrs.id !== id) {
          transaction.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            id,
          })
        }

        const headingShouldBeFirst = (): THeading['position'] => {
          switch (node.attrs.level) {
            case 1:
              return 1
            case 2:
              return !headings.find(heading => heading.level === 1) ? 1 : 2
            case 3:
              const previousItem = headings[headings.length - 1]

              if (!previousItem) {
                return 1
              }

              if (previousItem.position === 3) {
                return 3
              }

              return (previousItem.position + 1) as THeading['position']

            default:
              return 3
          }
        }

        headings.push({
          level: node.attrs.level,
          text: node.textContent,
          position: headingShouldBeFirst(),
          id,
        })
      }
    })

    transaction.setMeta('preventUpdate', true)

    !editor.isDestroyed && editor.view.dispatch(transaction)

    setAllHeadings(headings)
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.on('update', handleUpdate)
      process.nextTick(handleUpdate)
    }
  }, [editor, handleUpdate])

  if (isPreviewMode && !allHeadings.length) {
    return <></>
  }

  return (
    <StyledContainer direction="column" justify={isMobile ? 'start' : 'center'} position="relative">
      <UploadFileModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      {isMobile && !!allHeadings.length && <Heading as="h2">Summary</Heading>}
      {allHeadings.length ? (
        <StyledListContainer>
          {allHeadings.map(heading => (
            <StyledItem href={`#${heading.id}`} data-position={heading.position} key={heading.id}>
              {heading.text || 'Untitled'}
            </StyledItem>
          ))}
        </StyledListContainer>
      ) : (
        <StyledNoTableOfContentContainer direction="column" justify="center" align="center">
          <SummaryIllustration />
          <Paragraph textAlign="center">No table of contents for the moment</Paragraph>
          <Paragraph color="text-light" size="small" textAlign="center">
            Add headings or <Link onClick={() => setIsModalOpen(true)}>upload</Link> a document to
            view your table of contents
          </Paragraph>
        </StyledNoTableOfContentContainer>
      )}
    </StyledContainer>
  )
}
