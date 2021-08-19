import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledContainer = styled(Flex)(() => {
  return {
    '& > *': {
      '&:first-child': {
        flex: '20%',
        marginRight: '2.4rem',
      },
      '&:last-child': {
        flex: '80%',
      },
    },
  }
})

export const StyledFormRow = styled(Flex)(() => {
  return {
    '& > *': {
      width: '100%',
      '&:not(:last-child)': {
        marginRight: '1.6rem',
      },
    },
  }
})

export const StyledForm = styled('form')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      '&:not(:last-child)': {
        marginBottom: '2.4rem',
      },
    },

    button: {
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
      alignSelf: 'flex-end',

      '&:hover': {
        backgroundColor: lightenDarkenColor('#3654D1', -20),
      },

      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.4,
      },
    },
  }
})

export const StyledProfile = styled(Flex)(() => {
  return {
    p: {
      marginTop: '.8rem',
    },
  }
})
