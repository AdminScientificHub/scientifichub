import { Paragraph, TParagraphProps } from '@src/components/core'
import { TOrder } from '@src/components/dashboard/Drafts/View.utils'
import React, { FunctionComponent } from 'react'

import { StyledContainer, StyledItem, StyledOrderIcon } from './Header.styled'

import DownArrowIcon from '@src/assets/icons/down-arrow.svg'

export type TTableHeader = {
  key: string
  isColumnOrderable: boolean
  label: string
  styles?: TParagraphProps
  customComponent?: {
    component: any
    valueKey: string
  }
}

type TProps = {
  columns: TTableHeader[]
  onOrder: (columnKey: string) => void
  orderSelected?: TOrder | null
  hasRows: boolean
}

export const DashboardTableHeader: FunctionComponent<TProps> = ({
  columns,
  onOrder,
  orderSelected,
  hasRows,
}) => {
  console.log('hasRows', hasRows)
  return (
    <StyledContainer>
      {columns.map((column, index) => (
        <StyledItem
          key={column.key}
          clickable={column.isColumnOrderable && hasRows}
          onClick={() => hasRows && column.isColumnOrderable && onOrder(column.key)}
          index={index}
          align="center"
        >
          <Paragraph size="small" color="text-light">
            {column.label}
          </Paragraph>
          {orderSelected?.key === column.key && (
            <StyledOrderIcon order={orderSelected.order}>
              <DownArrowIcon />
            </StyledOrderIcon>
          )}
        </StyledItem>
      ))}
    </StyledContainer>
  )
}

export type TDashboardTableHeaderProps = TProps
