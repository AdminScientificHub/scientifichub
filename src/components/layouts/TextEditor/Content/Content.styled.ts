import styled from '@emotion/styled'

export const StyledContainer = styled('div')(() => {
  return {
    height: '100%',
    position: 'relative',
    overflow: 'auto',
    scrollBehavior: 'smooth',

    '& > *': {
      '&:first-child': {
        maxWidth: '68rem',
        margin: '0 auto',
      },

      '&:not(:first-child)': {
        position: 'fixed',
        right: '0',
        top: '20%',
        maxWidth: '25rem',
        minWidth: '25rem',
        left: 'calc(50% + 68rem / 2 + 25rem / 2 + 2rem)',
        transform: 'translateX(-50%)',

        '@media only screen and (max-width: 1240px)': {
          display: 'none',
        },
      },
    },
  }
})
