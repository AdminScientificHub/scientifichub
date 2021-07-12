import styled from '@emotion/styled'

export const StyledContainer = styled('div')(() => {
  return {
    height: '100%',
    scrollBehavior: 'smooth',
    overflow: 'auto',

    '@media only screen and (max-width: 900px)': {
      overflow: 'initial',
    },
  }
})
