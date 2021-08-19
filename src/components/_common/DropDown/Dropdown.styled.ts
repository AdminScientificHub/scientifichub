import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    width: '100%',
    height: '100%',

    '& > *': {
      '&:first-child': {
        cursor: 'pointer',
        width: '100%',
      },
    },
  }
})

export const StyledChevron = styled('div')(() => {
  return {
    svg: {
      marginLeft: '1.6rem',
      fill: '#fff',
      height: '.8rem',
    },
  }
})
