import { rgba } from 'emotion-rgba'

import styled from '@emotion/styled'

import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)<{ isActive: boolean }>(({ isActive }) => {
  return {
    border: '.1rem dashed #858DA8',
    borderRadius: '.8rem',
    height: '30rem',
    cursor: 'pointer',

    svg: {
      height: '4rem',
      fill: '#97A2B6',
      marginBottom: '1.6rem',
    },

    ...(isActive && {
      backgroundColor: rgba('#000', 0.05),
    }),

    '&:hover': {
      backgroundColor: rgba('#000', 0.05),
    },
  }
})

export const StyledLoadingContainer = styled(Flex)(() => {
  return {
    p: {
      marginTop: '.8rem',
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
      height: '3rem',
      fill: '#858CA8',
    },
  }
})
