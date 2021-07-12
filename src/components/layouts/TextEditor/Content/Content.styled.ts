import styled from '@emotion/styled'

export const StyledContainer = styled('div')(() => {
  return {
    gridRow: '2/2',
    display: 'grid',
    gridTemplateColumns: '66% 1fr',
    height: '100%',
    overflow: 'auto',

    '& > *': {
      '&:not(:first-child)': {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'hidden',

        '&:after': {
          content: '""',
          height: '60%',
          position: 'absolute',
          left: '0',
          width: '0.1rem',
          backgroundColor: '#E5E5E5',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
    },

    '@media only screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      display: 'flex',
      flexDirection: 'column-reverse',
      scrollBehavior: 'smooth',
      '& > *': {
        '&:not(:first-child)': {
          '&:after': {
            content: 'none',
          },
        },
      },
    },
  }
})
