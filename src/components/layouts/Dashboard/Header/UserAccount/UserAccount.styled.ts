import styled from '@emotion/styled'
import { Flex, Paragraph } from '@src/components/core'

export const StyledDropHeader = styled(Flex)(() => {
  return {
    cursor: 'pointer',
    svg: {
      marginRight: '.8rem',
    },
  }
})

export const StyledAccountNavigation = styled(Flex)<{ isClickable: boolean }>(({ isClickable }) => {
  return {
    transition: 'all .2s ease',
    borderRight: '1px solid #000',

    ...(!isClickable && {
      userSelect: 'none',
      pointerEvents: 'none',
    }),

    '&:hover': {
      backgroundColor: '#000000',
    },

    svg: {
      height: '1.6rem',
      fill: '#fff',
    },
  }
})

export const StyledDrop = styled(Flex)(() => {
  return {
    backgroundColor: '#2C2C2C',
    borderRadius: '.4rem',
    padding: '.4rem 0',
  }
})

export const StyledDropItem = styled(Flex)<{
  active?: boolean
  notClickable?: boolean
  disabled?: boolean
}>(({ notClickable, active, disabled }) => {
  return {
    alignItems: 'center',
    height: '3.2rem',
    padding: '0 1.2rem 0 .8rem',
    transition: 'all .2s ease',

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

    '& > *': {
      '&:nth-child(2)': {
        marginLeft: '.8rem',
      },
    },
  }
})

export const StyledCommunityUser = styled(Paragraph)(() => {
  return {
    marginLeft: '.8rem',
    opacity: 0.5,
  }
})
