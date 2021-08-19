import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { TOrder } from '@src/components/dashboard/Drafts/View.utils'

export const StyledContainer = styled('div')(() => {
  return {
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 2fr)',
    gridAutoColumns: 'minmax(100px,1fr)',
    gridColumnGap: '1.6rem',
  }
})

export const StyledItem = styled(Flex)<{ index: number; clickable: boolean }>(
  ({ index, clickable }) => {
    return {
      gridColumn: `${index + 1}/${index + 1}`,
      ...(clickable && {
        cursor: 'pointer',
      }),
      userSelect: 'none',
    }
  },
)

export const StyledOrderIcon = styled(Flex)<{ order: TOrder['order'] }>(({ order }) => {
  return {
    transform: `rotate(${order === 'ASC' ? '0' : '180'}deg)`,
    marginLeft: '.4rem',
    svg: {
      height: '1.2rem',
      fill: '#858CA8',
    },
  }
})
