import { rgba } from 'emotion-rgba'

import styled from '@emotion/styled'

import { Flex } from '@src/components/core'

export const StyledTextEditList = styled(Flex)(() => {
  return {
    '& > *': {
      '&:not(:last-child)': {
        marginRight: '1.2rem',

        '@media only screen and (max-width: 550px)': {
          marginRight: '.8rem',
        },
      },
    },
  }
})

export const StyledLinkModalContainer = styled(Flex)(() => {
  return {
    position: 'absolute',
    top: '-6.2rem',
    backgroundColor: '#fff',
    padding: '1.2rem',
    height: 'initial',
    border: '1px solid #E5E5E5',
    borderRadius: '1.2rem',

    input: {
      fontSize: '1.4rem',
      lineHeight: '2rem',
      borderRadius: '.4rem',
      border: '1px solid #E5E5E5',
      padding: '.3rem .6rem',
      minWidth: '20rem',

      '&::placeholder': {
        color: '#CDCDCD',
      },
    },
  }
})

export const StyledTextEditItem = styled(Flex)<{ active: boolean }>(({ active }) => {
  const activeProps = {
    backgroundColor: rgba('#000', 0.05),
    '& > *': {
      fill: rgba('#000', 1),
    },
  }

  return {
    width: '3.2rem',
    height: '3.2rem',
    borderRadius: '.4rem',
    cursor: 'pointer',
    transition: 'all .2s ease',
    ...(active && activeProps),

    '& > svg': {
      height: '1.6rem',
      transition: 'all .2s ease',
      ...(!active && { fill: rgba('#000', 0.4) }),

      '@media only screen and (max-width: 550px)': {
        height: '1.2rem',
      },
    },
    '&:hover': {
      ...activeProps,
    },

    '@media only screen and (max-width: 550px)': {
      width: '2.5rem',
      height: '2.5rem',
    },
  }
})

export const StyledSeparator = styled('div')(() => {
  return {
    height: '3rem',
    width: '.1rem',
    backgroundColor: rgba('#000', 0.1),

    '@media only screen and (max-width: 550px)': {
      height: '2.5rem',
    },
  }
})
