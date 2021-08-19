import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    label: {
      marginBottom: '.8rem',
      fontSize: '1.4rem',
      lineHeight: '1',
      fontWeight: 700,
    },

    '& > *': {
      width: '100%',
    },

    '.onboarding-area-select': {
      fontSize: '1.6rem',
    },
  }
})
