import styled from '@emotion/styled'

export const StyledContainer = styled('div')(() => {
  return {
    '& > *': {
      width: '100%',
    },

    '.onboarding-area-select': {
      fontSize: '1.6rem',
    },
  }
})
