import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledHeader = styled(Flex)(() => {
  return {
    height: '4.8rem',
    borderBottom: '.1rem solid #E5E5E5',
    padding: '0 3.2rem',
  }
})

export const StyledContent = styled(Flex)(() => {
  return {
    padding: '3.2rem',
    width: '80%',
    minWidth: '40rem',
  }
})

export const StyledTitle = styled('h1')(() => {
  return {
    fontSize: '5rem',
    lineHeight: 1.2,
    fontWeight: 700,
    marginBottom: '1.2rem',
  }
})

export const StyledForm = styled(Flex)(() => {
  return {
    padding: '4.8rem 0',
  }
})

export const StyledButton = styled('button')(() => {
  return {
    padding: '0 3.2rem',
    height: '4.2rem',
    alignSelf: 'flex-start',
    borderRadius: '.4rem',
    border: 'none',
    color: '#fff',
    backgroundColor: '#3654D1',
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: '2rem',
    transition: 'all .2s ease',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '20rem',

    '&:hover': {
      backgroundColor: lightenDarkenColor('#3654D1', -20),
    },
  }
})
