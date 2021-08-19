import styled from '@emotion/styled'
import { Paragraph } from '@src/components/core'
import { rgba } from 'emotion-rgba'

export const StyledInput = styled('input')(() => {
  return {
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
