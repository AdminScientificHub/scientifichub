import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledContainer = styled('div')(() => {
  return {}
})

export const StyledList = styled('div')(() => {
  return {
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 2fr)',
    gridAutoColumns: 'minmax(100px,1fr)',
    gridColumnGap: '1.6rem',
    height: '4rem',
    alignItems: 'center',
    borderRadius: '1.2rem',
    padding: '0 1.2rem',
    margin: '0 -1.2rem',
    backgroundColor: 'transparent',
    transition: 'all .2s ease',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#DAEBF7',
    },

    '& > *': {
      gridRow: '1/1',
      userSelect: 'none',
    },
  }
})

export const StyledFakeItem = styled(Flex)(() => {
  return {
    alignItems: 'center',
    height: '4rem',

    span: {
      fontStyle: 'italic',
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

    marginRight: '.8rem',

    svg: {
      height: '1.6rem',
    },
  }
})
