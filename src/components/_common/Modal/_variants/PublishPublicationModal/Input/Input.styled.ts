import styled from '@emotion/styled'
import { Flex, Paragraph } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    '.onboarding-area-select': {
      fontSize: '1.6rem',
    },

    label: {
      marginBottom: '.8rem',
      fontSize: '1.4rem',
      lineHeight: '1',
      fontWeight: 700,
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
