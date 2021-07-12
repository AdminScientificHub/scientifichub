import styled from '@emotion/styled'
import { Flex, Paragraph } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledContainer = styled('div')(() => {
  return {
    h2: {
      marginBottom: '.8rem',
    },
    p: {
      marginBottom: '1.6rem',
    },
    input: {
      fontSize: '1.4rem',
      lineHeight: '2rem',
      borderRadius: '.4rem',
      border: '1px solid #E5E5E5',
      padding: '.6rem 1rem',
      width: '80%',

      '&::placeholder': {
        color: '#CDCDCD',
      },
    },
  }
})

export const StyledPublishContainer = styled(Flex)(() => {
  return {
    h2: {
      marginBottom: '.8rem',
    },
    p: {
      marginBottom: '3.2rem',
    },
    button: {
      padding: '.8rem 3.2rem',
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

    svg: {
      height: '10rem',
      alignSelf: 'flex-start',
      marginBottom: '2.4rem',
    },
  }
})

export const StyledLoadingSpinner = styled(Flex)(() => {
  return {
    '@keyframes rotating': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
    animation: 'rotating 2s linear infinite',

    svg: {
      margin: 0,
      height: '2rem',
      fill: '#fff',
    },
  }
})

export const StyledPublishedSuccessfull = styled(Flex)(() => {
  return {
    h2: {
      marginBottom: '1.6rem',
    },

    input: {
      fontSize: '1.4rem',
      lineHeight: '2rem',
      borderRadius: '.4rem',
      border: '1px solid #E5E5E5',
      padding: '.6rem 1rem',
      width: '100%',
      backgroundColor: '#fff',
      marginRight: '1.6rem',

      '&::placeholder': {
        color: '#626262',
      },
    },
    h3: {
      marginBottom: '.8rem',
      marginTop: '2.4rem',
    },

    a: {
      marginTop: '1.6rem',
    },

    button: {
      padding: '.8rem 3.2rem',
      alignSelf: 'flex-end',
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

export const StyledCopyKeyboardContainer = styled(Flex)(() => {
  return {
    flex: '0 0 80%',
  }
})

export const StyledCopiedToKeyboard = styled(Paragraph)<{ active: boolean }>(({ active }) => {
  return {
    opacity: active ? 1 : 0,
    transition: 'all .5s ease',
  }
})
