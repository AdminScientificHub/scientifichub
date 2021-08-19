import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

import { rgba } from 'emotion-rgba'

export const StyledHeader = styled(Flex)(() => {
  return {
    padding: '1rem',
    transition: 'all .2s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderRadius: '2rem',

    svg: {
      height: '1.2rem',
    },

    '&:hover': {
      backgroundColor: rgba('#000', 0.1),
    },
  }
})

export const StyledContainer = styled('div')(() => {
  return {
    justifySelf: 'flex-end',
    width: '100%',

    '& > *': {
      '& > *': {
        justifyContent: 'flex-end',
      },
    },
  }
})

export const StyledContent = styled(Flex)(() => {
  return {
    border: '.1rem solid #E5E5E5',
    backgroundColor: '#fff',
    padding: '.4rem 0',
    borderRadius: '.4rem',
  }
})

export const StyledItem = styled(Flex)(() => {
  return {
    height: '3rem',
    padding: '0 1.2rem',
    alignItems: 'center',
    transition: 'all .2s ease',
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: rgba('#000', 0.1),
    },

    a: {
      textDecoration: 'none',
      display: 'block',
    },
  }
})
