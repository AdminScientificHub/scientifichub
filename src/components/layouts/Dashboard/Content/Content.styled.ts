import styled from '@emotion/styled'

export const StyledContainer = styled('div')(() => {
  return {
    scrollBehavior: 'smooth',
    overflow: 'auto',
  }
})
