import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'
import { rgba } from 'emotion-rgba'

export const StyledContainer = styled(Flex)(() => {
  return {
    padding: '3.2rem 4.6rem 3.2rem 3.2rem',

    svg: {
      height: '1.4rem',
      marginBottom: '6.4rem',
    },

    h1: {
      marginBottom: '.4rem',
    },
  }
})

export const StyledGoogleButton = styled('button')(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '1.2rem',
    border: `.1rem solid ${rgba('#000', 0.1)}`,
    width: '100%',
    height: '5.6rem',
    cursor: 'pointer',
    transition: 'all .2s ease',
    marginTop: '4.8rem',

    '&:hover': {
      backgroundColor: rgba('#000', 0.05),
    },

    svg: {
      height: '1.6rem',
      margin: 0,
      marginRight: '.8rem',
    },
  }
})

export const StyledTopContent = styled(Flex)(() => {
  return {
    marginBottom: '3.2rem',
  }
})

export const StyledForm = styled('form')(() => {
  return {
    margin: '3.2rem 0',

    '& > *': {
      '&:not(:last-child)': {
        marginBottom: '2.4rem',
      },
    },
  }
})

export const StyledLogo = styled('div')(() => {
  return {
    position: 'absolute',
    top: '2rem',
    padding: '1.2rem',
    left: '2rem',

    svg: {
      margin: '0',
    },
  }
})

export const StyledButton = styled('button')(() => {
  return {
    fontSize: '1.4rem',
    lineHeight: '1.2',
    boxShadow: '0 .2rem .4rem .1rem rgba(0, 0, 0, 0.1)',
    backgroundColor: '#3654D1',
    border: 'none',
    height: '4.8rem',
    borderRadius: '1.2rem',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      backgroundColor: lightenDarkenColor('#3654D1', -20),
    },
  }
})

export const StyledLinkTo = styled(Flex)(() => {
  return {
    marginTop: '1.2rem',

    a: {
      fontSize: '1.4rem',
      lineHeight: '2rem',
      marginLeft: '1.2rem',
      cursor: 'pointer',
      textDecoration: 'underline',
      color: '#3654D1',
      transition: 'all .2 ease',

      '&:hover': {
        color: lightenDarkenColor('#3654D1', -30),
      },
    },
  }
})
