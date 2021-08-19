import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { rgba } from 'emotion-rgba'

export const StyledContainer = styled(Flex)(() => {
  return {
    borderRadius: '1.2rem',
    border: '.1rem solid #E5E5E5',
    width: '100%',
    maxWidth: '15rem',
    padding: '1.6rem',
    backgroundColor: 'transparent',
    transition: 'all .2s ease',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: rgba('#000', 0.05),
    },

    svg: {
      width: '2.5rem',
      fill: '#7D7D7D',
    },
  }
})

export const StyledContent = styled(Flex)(() => {
  return {
    svg: {
      height: '3rem',
      marginBottom: '1.2rem',
    },

    '& > *': {
      '&:nth-child(2)': {
        marginBottom: '.4rem',
      },
    },
  }
})
