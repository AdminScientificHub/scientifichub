import styled from '@emotion/styled'
import { NodeViewWrapper } from '@tiptap/react'

import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'
import { FONT_FAMILY } from '@src/utils/styles/tokens'

export const StyledContainer = styled(Flex)(() => {
  return {
    '& > *': {
      minHeight: '60%',
      maxHeight: '80%',
      padding: '0 6.4rem',

      '@media only screen and (max-width: 900px)': {
        minHeight: 'initial',
        maxHeight: 'initial',
      },
    },

    '@media only screen and (max-width: 900px)': {
      margin: '0 6.4rem',
      padding: '4rem 0',
      borderBottom: '1px solid #E5E5E5',
      overflow: 'initial !important',

      h2: {
        marginBottom: '2rem',
      },

      '& > *': {
        padding: 0,
        alignItems: 'flex-start',
      },
    },

    '@media only screen and (max-width: 550px)': {
      margin: '0 3.2rem',
    },
  }
})

export const StyledListContainer = styled(NodeViewWrapper)(() => {
  return {
    overflow: 'auto',
  }
})

export const StyledItem = styled('a')(() => {
  return {
    display: 'block',
    fontFamily: FONT_FAMILY,
    color: '#858DA8',
    fontSize: '1.4rem',
    lineHeight: '1.6rem',
    textDecoration: 'underline',
    transition: 'all .2s ease',
    margin: '.8rem 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:first-child': {
      marginTop: '0',
    },

    '&[data-position="2"]': {
      marginLeft: '1.2rem',
    },

    '&[data-position="3"]': {
      marginLeft: '2.4rem',
    },

    '&:hover': {
      color: lightenDarkenColor('#858DA8', -40),
    },
  }
})

export const StyledNoTableOfContentContainer = styled(Flex)(() => {
  return {
    '& > *': {
      whiteSpace: 'initial',

      '&:first-child': {
        marginBottom: '2.4rem',
      },

      '&:nth-child(2)': {
        marginBottom: '.4rem',
      },
    },
  }
})
