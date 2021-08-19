import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)<{ isClickable: boolean }>(({ isClickable }) => {
  return {
    marginRight: '1.2rem',
    transition: 'all .2s ease',

    ...(!isClickable && {
      userSelect: 'none',
      pointerEvents: 'none',
    }),

    '&:hover': {
      backgroundColor: '#000000',
    },

    '& > *': {
      padding: '0 1.2rem',
    },
  }
})

export const StyledList = styled(Flex)(() => {
  return {
    backgroundColor: '#2C2C2C',
    padding: '.4rem 0',
    borderRadius: '.4rem',
  }
})

export const StyledListItem = styled(Flex)<{
  active?: boolean
  notClickable?: boolean
  disabled?: boolean
}>(({ notClickable, active, disabled }) => {
  return {
    alignItems: 'center',
    height: '3.2rem',
    padding: '0 1.2rem 0 .8rem',
    transition: 'all .2s ease',

    '& > *': {
      '&:nth-child(2)': {
        marginLeft: '.8rem',
      },
    },

    svg: {
      height: '1.6rem',
      fill: '#fff',
    },

    ...(!notClickable &&
      !disabled && {
        '&:hover': {
          backgroundColor: '#18A0FB',
          cursor: 'pointer',
        },
      }),

    ...(active && {
      backgroundColor: '#18A0FB',
    }),

    ...(disabled && {
      opacity: 0.4,
      cursor: 'not-allowed',
    }),
  }
})
