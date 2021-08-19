import React, { FunctionComponent, useMemo, useState } from 'react'

import MoreIcon from '@src/assets/icons/more.svg'
import { StyledHeader, StyledContainer, StyledContent, StyledItem } from './Actions.styled'

import { AlertContent, DropDown } from '@src/components/_common'
import { Paragraph } from '@src/components/core'

import { useAlert } from 'react-alert'
import { useRouter } from 'next/dist/client/router'
import { deletePublication } from '@src/services'

type TProps = {
  row: any
}

export const DashboardTableRowActions: FunctionComponent<TProps> = ({ row }) => {
  const [isDropOpen, setIsDropOpen] = useState(false)

  const alert = useAlert()

  const onItemClick = () => {
    setIsDropOpen(false)
  }

  const router = useRouter()

  const isPublishedView = useMemo(() => router.pathname === '/publications/published', [router])

  const deleteItem = () => {
    if (isPublishedView) {
      return
    }

    deletePublication({
      publicationId: row.id,
      callback: () => {
        alert.info(
          <AlertContent
            title="Delete successfully"
            subtitle="Your publication has been deleted"
            type="info"
          />,
        )
        setIsDropOpen(false)
      },
    })
  }

  return (
    <StyledContainer onClick={e => e.stopPropagation()}>
      <DropDown
        header={
          <StyledHeader>
            <MoreIcon />
          </StyledHeader>
        }
        isOpen={isDropOpen}
        onOpenChange={setIsDropOpen}
        dropAlign={{ top: 'bottom', right: 'right' }}
      >
        <StyledContent direction="column">
          <StyledItem onClick={onItemClick}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`/publication/${row.id}${isPublishedView ? '' : '/edit'}`}
            >
              <Paragraph size="small">Open in a new tab</Paragraph>
            </a>
          </StyledItem>
          {!isPublishedView && (
            <StyledItem onClick={deleteItem}>
              <Paragraph size="small">Delete</Paragraph>
            </StyledItem>
          )}
        </StyledContent>
      </DropDown>
    </StyledContainer>
  )
}

export type TActionsProps = TProps
