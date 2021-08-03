import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { rgba } from 'emotion-rgba'
import { AlertComponentProps } from 'react-alert'

export const StyledContainer = styled(Flex)(() => {
  return {
    backgroundColor: '#fff',
    borderRadius: '4rem',
    height: '5.2rem',
    padding: '.4rem',
    marginBottom: '1.2rem',
  }
})

export const StyledIconContainer = styled(Flex)<{ type: AlertComponentProps['options']['type'] }>(
  ({ type }) => {
    return {
      height: '4.4rem',
      width: '4.4rem',
      borderRadius: '4rem',

      ...(type === 'error' && {
        backgroundColor: 'rgb(253, 242, 242)',
      }),

      svg: {
        height: '3rem',
        width: '3rem',
      },
    }
  },
)

export const StyledContentContainer = styled(Flex)(() => {
  return {
    marginLeft: '.8rem',
    marginRight: '1.6rem',
  }
})

export const StyledCloseContainer = styled(Flex)(() => {
  return {
    height: '3.2rem',
    width: '3.2rem',
    borderRadius: '3.2rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      backgroundColor: rgba('#000', 0.1),
    },

    svg: {
      height: '1rem',
      fill: '#858CA8',
    },
  }
})
