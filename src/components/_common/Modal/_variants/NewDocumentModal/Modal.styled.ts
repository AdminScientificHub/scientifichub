import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { rgba } from 'emotion-rgba'

export const StyledContainer = styled(Flex)(() => {
  return {
    h2: {
      marginBottom: '1.6rem',
    },
  }
})

export const StyledChooseContainer = styled(Flex)(() => {
  return {
    marginTop: '1.6rem',

    '& > *': {
      '&:not(:last-child)': {
        marginBottom: '.8rem',
      },
    },
  }
})

export const StyledChooseItem = styled(Flex)(() => {
  return {
    padding: '.8rem 1.2rem',
    borderRadius: '.4rem',
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      backgroundColor: rgba('#000000', 0.05),
    },

    svg: {
      height: '3rem',
      marginRight: '1.2rem',
    },
  }
})
