import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { rgba } from 'emotion-rgba'

export const StyledContainer = styled(Flex)<{ isActive: boolean }>(({ isActive }) => {
  return {
    transition: 'all .2s ease',
    margin: '.8rem 2.4rem',
    backgroundColor: isActive ? rgba('#fff', 0.1) : '#2C2C2C',
    borderRadius: '.4rem',
    maxWidth: '25rem',

    svg: {
      transition: 'all .2s ease',
      height: '1.6rem',
      fill: rgba('#fff', 0.3),
      margin: '0 1.2rem',
    },
  }
})

export const StyledInput = styled('input')(() => {
  return {
    border: 'none',
    color: '#fff',
    height: '100%',
    backgroundColor: 'transparent',

    '&:focus': {
      outline: 'none',
    },
  }
})
