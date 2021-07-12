import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { FONT_FAMILY } from '@src/utils/styles/tokens'
import { rgba } from 'emotion-rgba'

export const StyledFloatingMenuItem = styled(Flex)<{ active?: boolean; isMain?: boolean }>(
  ({ active, isMain }) => {
    return {
      height: '4rem',
      width: '4rem',
      backgroundColor: '#fff',
      boxShadow: `0 .2rem .5rem ${rgba('#000', 0.1)}`,
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all .2s ease',

      '@media only screen and (max-width: 550px)': {
        ...(isMain
          ? {
              height: '2rem',
              width: '2rem',
            }
          : {
              height: '3rem',
              width: '3rem',
              marginTop: '-.5rem',
            }),
      },

      '& > svg': {
        height: '1.6rem',

        '@media only screen and (max-width: 550px)': {
          ...(isMain ? { height: '.8rem' } : { height: '1.2rem' }),
        },
      },

      ...(active && {
        backgroundColor: '#F5F5F5',
      }),

      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
    }
  },
)

export const StyledFloatingMenu = styled(Flex)(() => {
  return {
    '& > *': {
      '&:not(:last-child)': {
        marginRight: '.8rem',
      },
    },
  }
})
