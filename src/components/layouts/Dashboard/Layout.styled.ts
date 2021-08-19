import styled from '@emotion/styled'

export const StyledContainer = styled('div')(() => {
  return {
    display: 'grid',
    gridTemplateRows: '4.8rem auto',
    height: '100vh',

    '& > *': {
      display: 'grid',
      gridTemplateColumns: '22rem auto',
      width: '100vw',
      overflow: 'auto',
      scrollBehavior: 'smooth',
    },
  }
})
