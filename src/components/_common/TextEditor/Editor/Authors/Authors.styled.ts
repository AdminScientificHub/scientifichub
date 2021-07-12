import styled from '@emotion/styled'

import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledContainer = styled(Flex)(() => {
  return {
    marginBottom: '2.4rem',

    span: {
      marginRight: '.2rem',
    },
  }
})

export const StyledAddAuthorBtn = styled('div')(() => {
  return {
    position: 'absolute',
    height: '1.6rem',
    width: '1.6rem',
    borderRadius: '50%',
    border: '1px solid #858DA8',
    left: '-2.4rem',
    top: '.2rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      borderColor: lightenDarkenColor('#858DA8', -100),

      svg: {
        fill: lightenDarkenColor('#858DA8', -100),
      },
    },

    svg: {
      fill: '#858DA8',
      height: '.8rem',
      transition: 'all .2s ease',
    },
  }
})

export const StyledAuthorModal = styled(Flex)(() => {
  return {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: '1.2rem',
    height: 'initial',
    border: '1px solid #E5E5E5',
    borderRadius: '1.2rem',
    top: '-1.8rem',
    minWidth: '20rem',
    zIndex: 1,

    input: {
      fontSize: '1.4rem',
      lineHeight: '2rem',
      borderRadius: '.4rem',
      border: '1px solid #E5E5E5',
      padding: '.3rem .6rem',
      minWidth: '25rem',

      '&::placeholder': {
        color: '#CDCDCD',
      },
    },

    '& > *': {
      '&:not(:last-child)': {
        marginBottom: '1.2rem',
      },
    },
  }
})
