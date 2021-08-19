import styled from '@emotion/styled'
import { Flex, Paragraph } from '@src/components/core'
import { rgba } from 'emotion-rgba'

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

export const StyledContainer = styled(Flex)(() => {
  return {
    label: {
      marginBottom: '.8rem',
      fontSize: '1.4rem',
      lineHeight: '1',
      fontWeight: 700,
    },
  }
})

export const StyledDropZone = styled(Flex)<{ isActive: boolean }>(({ isActive }) => {
  return {
    border: '.1rem dashed #858DA8',
    borderRadius: '.8rem',
    height: '12.5rem',
    cursor: 'pointer',

    ...(isActive && {
      backgroundColor: rgba('#000', 0.05),
    }),

    '&:hover': {
      backgroundColor: rgba('#000', 0.05),
    },
  }
})

export const StyledErrorMessage = styled(Paragraph)(() => {
  return {
    color: '#FF6767',
    fontSize: '1.2rem',
    lineHeight: 1.2,
    position: 'absolute',
    bottom: '-1.6rem',
  }
})
