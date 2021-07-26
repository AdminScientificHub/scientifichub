import { Flex } from '@src/components/core'
import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const StyledContainer = styled(Flex)(() => {
  return {
    width: '100%',
    '&:before': {
      content: "''",
      width: '100%',
      height: '1px',
      backgroundColor: rgba('#000', 0.1),
    },

    '&:after': {
      content: "''",
      width: '100%',
      height: '1px',
      backgroundColor: rgba('#000', 0.1),
    },

    p: {
      width: '100%',
    },
  }
})
