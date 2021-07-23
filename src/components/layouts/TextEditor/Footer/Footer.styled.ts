import styled from '@emotion/styled'

import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    height: '5rem',
    gridRow: '3/3',
    padding: '.8rem 6.4rem',
    borderTop: '1px solid #E5E5E5',
    zIndex: 11,
    backgroundColor: '#fff',

    '@media only screen and (max-width: 550px)': {
      padding: '.8rem 2.4rem',
      height: '4rem',
    },
  }
})
