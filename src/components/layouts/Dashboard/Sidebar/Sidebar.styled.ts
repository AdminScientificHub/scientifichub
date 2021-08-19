import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    borderRight: '0.1rem solid #E5E5E5',
    padding: '.8rem 0',
  }
})

export const StyledListItem = styled(Flex)<{ inactive?: boolean; isActive?: boolean }>(
  ({ inactive, isActive }) => {
    return {
      alignItems: 'center',
      height: '3.2rem',
      transition: 'all .2s ease',
      backgroundColor: 'transparent',
      padding: '0 1.6rem',
      userSelect: 'none',

      ...(isActive && {
        backgroundColor: '#DAEBF7',
      }),

      ...(!inactive
        ? {
            '&:hover': {
              backgroundColor: '#DAEBF7',
              cursor: 'pointer',
            },
          }
        : {
            cursor: 'not-allowed',
            opacity: 0.3,
          }),

      svg: {
        height: '1.6rem',
        marginRight: '.8rem',
      },
    }
  },
)
