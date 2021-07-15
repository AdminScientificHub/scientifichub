import { rgba } from 'emotion-rgba'

import styled from '@emotion/styled'

import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    '& > *': {
      '&:not(:last-child)': {
        marginBottom: '.8rem',
      },
    },
    h2: {
      marginBottom: '2.4rem !important',
    },
  }
})

export const StyledChooseContainer = styled(Flex)(() => {
  return {
    marginTop: '2.4rem',

    '& > *': {
      '&:not(:last-child)': {
        marginRight: '2.4rem',
      },
    },
  }
})

export const StyledChooseItem = styled(Flex)(() => {
  return {
    padding: '1.6rem',
    borderRadius: '1.2rem',
    cursor: 'pointer',
    transition: 'all .2s ease',
    maxWidth: '12.5rem',
    border: `.1rem solid ${rgba('#000000', 0.1)}`,

    '&:hover': {
      backgroundColor: rgba('#000000', 0.05),
    },

    svg: {
      height: '3rem',
      marginBottom: '.8rem',
    },
  }
})
