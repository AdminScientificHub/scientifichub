import styled from '@emotion/styled'
import { Flex, Paragraph } from '@src/components/core'
import { rgba } from 'emotion-rgba'

export const StyledContainer = styled(Flex)(() => {
  return {
    label: {
      marginBottom: '.8rem',
      fontSize: '1.4rem',
      lineHeight: '1',
      fontWeight: 700,
    },
  }
})

export const StyledInput = styled(Flex)(() => {
  return {
    width: '100%',
    cursor: 'pointer',

    input: {
      borderRadius: '.4rem',
      border: `.1rem solid ${rgba('#000', 0.1)}`,
      height: '3.8rem',
      padding: '0 1.2rem',
      fontSize: '1.6rem',
      lineHeight: '1.2',
      transition: 'all .2s ease',
      width: '100%',

      '&:focus': {
        outline: 'none',
        border: `.1rem solid ${rgba('#000', 0.3)}`,
      },

      '&::placeholder': {
        color: rgba('#000', 0.2),
      },
    },
  }
})

export const StyledErrorMessage = styled(Paragraph)(() => {
  return {
    color: '#FF6767',
    fontSize: '1.2rem',
    lineHeight: 1.2,
    position: 'absolute',
    bottom: '-1.6rem',
  }
})
