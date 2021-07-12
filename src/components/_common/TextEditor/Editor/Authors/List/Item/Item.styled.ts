import styled from '@emotion/styled'

import { Flex } from '@src/components/core'

export const StyledAuthorModal = styled(Flex)(() => {
  return {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: '1.2rem',
    height: 'initial',
    border: '1px solid #E5E5E5',
    borderRadius: '1.2rem',
    top: '2.4rem',
    minWidth: '20rem',
    zIndex: 1,

    input: {
      fontSize: '1.4rem',
      lineHeight: '2rem',
      borderRadius: '.4rem',
      border: '1px solid #E5E5E5',
      padding: '.3rem .6rem',
      minWidth: '25rem',

      '&::placeholder': {
        color: '#CDCDCD',
      },
    },

    '& > *': {
      '&:not(:last-child)': {
        marginBottom: '1.2rem',
      },
    },
  }
})
