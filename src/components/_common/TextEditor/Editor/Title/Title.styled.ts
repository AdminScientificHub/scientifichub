import styled from '@emotion/styled'

import { FONT_FAMILY } from '@src/utils/styles/tokens'

export const StyledTitle = styled('textarea')(() => {
  return {
    height: `4.8rem`,
    fontFamily: FONT_FAMILY,
    border: 'none',
    fontSize: '4rem',
    lineHeight: '4.8rem',
    fontWeight: 700,
    marginBottom: '1.2rem',
    padding: 0,
    resize: 'none',
    minHeight: '4.8rem',

    '&:focus': {
      outline: 'none',
    },

    '&:disabled': {
      backgroundColor: 'transparent',
      color: '#000',
    },

    '&::placeholder': {
      color: '#858DA8',
    },
  }
})
