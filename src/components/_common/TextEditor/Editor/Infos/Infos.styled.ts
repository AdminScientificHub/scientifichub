import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    marginBottom: '2.4rem',
    '& > *': {
      '&:not(:last-child)': {
        marginRight: '.8rem',
      },
    },
  }
})
