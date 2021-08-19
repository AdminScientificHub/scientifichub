import { Paragraph } from '@src/components/core'
import React, { FunctionComponent, createElement, useMemo } from 'react'
import { TTableHeader } from '../Header'
import { StyledContainer, StyledList, StyledFakeItem, StyledLoadingSpinner } from './Content.styled'

import { DashboardTableRowActions } from './Actions'
import { useRouter } from 'next/dist/client/router'

import LoadingIcon from '@src/assets/icons/loading.svg'

type TProps = {
  rows: any[]
  columns: TTableHeader[]
  isLoading?: boolean
}

export const DashboardTableContent: FunctionComponent<TProps> = ({ columns, isLoading, rows }) => {
  const router = useRouter()

  const isPublishedView = useMemo(() => router.pathname === '/publications/published', [router])

  if (isLoading) {
    return (
      <StyledFakeItem>
        <StyledLoadingSpinner>
          <LoadingIcon />
        </StyledLoadingSpinner>
        <Paragraph size="small">Drafts are loading...</Paragraph>
      </StyledFakeItem>
    )
  }

  return (
    <StyledContainer>
      {rows.length ? (
        rows.map((row, index) => (
          <StyledList
            key={index}
            onClick={() => router.push(`/publication/${row.id}${isPublishedView ? '' : '/edit'}`)}
          >
            {columns.map(({ key, styles, customComponent }, columnIndex) => {
              if (customComponent) {
                if (typeof row[key] === 'object') {
                  return row[key].map((value: any) =>
                    createElement(customComponent.component, {
                      [customComponent.valueKey]: value,
                      key: key + index,
                    }),
                  )
                }

                return createElement(customComponent.component, {
                  [customComponent.valueKey]: row[key],
                  key: key + index,
                })
              }

              if (row[key]) {
                return (
                  <Paragraph
                    title={row[key]}
                    size="small"
                    ellipsis
                    key={columnIndex + index}
                    {...styles}
                  >
                    {row[key]}
                  </Paragraph>
                )
              }

              return <DashboardTableRowActions row={row} key={columnIndex + index} />
            })}
          </StyledList>
        ))
      ) : (
        <StyledFakeItem>
          <Paragraph size="small">
            No draft for the moment, click on <span>blank document</span> just above to create a new
            one.
          </Paragraph>
        </StyledFakeItem>
      )}
    </StyledContainer>
  )
}

export type TDashboardTableContentProps = TProps
