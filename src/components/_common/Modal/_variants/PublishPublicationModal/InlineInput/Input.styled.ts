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

    input: {
      padding: '.4rem 0',
      fontSize: '1.6rem',
      lineHeight: '1.2',
      border: 'none',
      borderBottom: `.1rem solid ${rgba('#000', 0.1)}`,
      outline: 'none',
      boxShadow: 'none',
      transition: 'all .2s ease',

      '&:focus': {
        borderBottom: `.1rem solid ${rgba('#000', 0.3)}`,
      },
      '&::placeholder': {
        color: '#CDCDCD',
      },

      '&:disabled': {
        backgroundColor: 'transparent',
        cursor: 'not-allowed',
        opacity: 0.4,
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
