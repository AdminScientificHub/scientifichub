import styled from '@emotion/styled'

import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledContainer = styled(Flex)(() => {
  return {
    '& > *': {
      flex: 1,
      '&:not(:last-child)': {
        marginRight: '3.2rem',
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
      alignSelf: 'flex-start',

      '&:hover': {
        backgroundColor: lightenDarkenColor('#3654D1', -20),
      },

      '& > *': {
        margin: '0',

        svg: {
          fill: '#fff',
        },
      },
    },
  }
})

export const StyledColumn = styled(Flex)(() => {
  return {
    h3: {
      marginBottom: '.8rem',
    },
    '& > *': {
      marginBottom: '2.4rem',
    },
  }
})

export const StyledCoverContainer = styled('div')(() => {
  return {
    p: {
      marginBottom: '.8rem',
      fontSize: '1.4rem',
      lineHeight: '1',
      fontWeight: 700,
    },
  }
})

export const StyledCover = styled('div')<{ src: string }>(({ src }) => {
  return {
    position: 'relative',
    background: `url(${src}) no-repeat`,
    height: '12.5rem',
    width: '100%',
    borderRadius: '.8rem',
  }
})

export const StyledRemoveCover = styled('div')(() => {
  return {
    position: 'absolute',
    backgroundColor: '#fff',
    right: '0',
    padding: '.8rem',
    borderRadius: '50%',
    boxShadow: '0 0.2rem 0.5rem rgb(0 0 0 / 10%)',
    margin: '-1rem',
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      backgroundColor: '#f2f2f2',
    },

    svg: {
      height: '.8rem',
    },
  }
})
