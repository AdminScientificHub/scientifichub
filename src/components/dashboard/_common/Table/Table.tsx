import React, { FunctionComponent } from 'react'
import { TOrder } from '../../Drafts/View.utils'
import { DashboardTableContent } from './Content/Content'
import { DashboardTableHeader, TTableHeader } from './Header'
import { StyledContainer } from './Table.styled'

type TProps = {
  columns: TTableHeader[]
  rows: any[]
  onOrder: (columnKey: TTableHeader['key']) => void
  orderSelected?: TOrder | null
  isLoading?: boolean
}

export const DashboardTable: FunctionComponent<TProps> = ({
  columns,
  rows,
  onOrder,
  orderSelected,
  isLoading,
}) => {
  return (
    <StyledContainer>
      <DashboardTableHeader
        hasRows={!!rows.length}
        columns={columns}
        onOrder={onOrder}
        orderSelected={orderSelected}
      />
      <DashboardTableContent isLoading={isLoading} columns={columns} rows={rows} />
    </StyledContainer>
  )
}

export type TDashboardTableProps = TProps
