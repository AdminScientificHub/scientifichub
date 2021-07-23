import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledContainer = styled('div')<{ isPreviewMode: boolean }>(({ isPreviewMode }) => {
  return {
    display: 'grid',
    height: '100vh',
    width: '100%',
    ...(!isPreviewMode
      ? {
          gridTemplateRows: '4rem 1fr 5rem',
          '@media only screen and (max-width: 550px)': {
            gridTemplateRows: '4rem 1fr 4rem',
          },
        }
      : { gridTemplateRows: '4rem 1fr' }),
  }
})

export const StyledNoMobileContainer = styled(Flex)(() => {
  return {
    height: 'calc(100vh - 4rem)',
    maxWidth: '60%',
    margin: '0 auto',

    '@media only screen and (max-width: 550px)': {
      margin: '0 3.2rem',
      maxWidth: '100%',
    },

    svg: {
      width: '30%',
      minWidth: '30rem',
      marginBottom: '3.2rem',

      '@media only screen and (max-width: 550px)': {
        width: '30%',
        minWidth: '15rem',
        marginBottom: '3.2rem',
      },
    },
    h1: {
      marginBottom: '1.6rem',
    },
    button: {
      marginTop: '3.2rem',
      padding: '.8rem 2.4rem',
      borderRadius: '.4rem',
      border: 'none',
      color: '#fff',
      backgroundColor: '#3654D1',
      fontSize: '1.6rem',
      fontWeight: 700,
      lineHeight: '2rem',
      transition: 'all .2s ease',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: lightenDarkenColor('#3654D1', -20),
      },
    },
  }
})
