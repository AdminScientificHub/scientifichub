import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { rgba } from 'emotion-rgba'

export const StyledDownloadIcon = styled(Flex)(() => {
  return {
    cursor: 'pointer',
    padding: '.8rem',
    borderRadius: '.4rem',
    marginRight: '-.8rem',
    transition: 'all .2s ease',

    '&:hover': {
      backgroundColor: rgba('#000', 0.1),
    },

    svg: {
      height: '1.6rem',
    },
  }
})

export const StyledCardList = styled(Flex)(() => {
  return {
    '& > *': {
      '&:not(:last-child)': {
        marginRight: '1.6rem',
      },
    },
  }
})
