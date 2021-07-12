import styled from '@emotion/styled'

import { Flex } from '@src/components/core'
import { FONT_FAMILY } from '@src/utils/styles/tokens'

export const StyledContainer = styled(Flex)(() => {
  return {
    padding: '20% 6.4rem 0',
    height: '100%',

    '@media only screen and (max-width: 900px)': {
      padding: '4rem 6.4rem 0',
    },

    '@media only screen and (max-width: 550px)': {
      padding: '4rem 3.2rem 0',
    },

    '& > *': {
      width: '100%',
    },
  }
})

export const StyledEditor = styled('div')(() => {
  return {
    paddingBottom: '12rem',

    '.ProseMirror': {
      fontFamily: FONT_FAMILY,
      outline: 'none !important',

      '& > *': {
        '&:first-child': {
          marginTop: '0',
        },
      },

      'p.is-editor-empty:first-child::before': {
        content: ' attr(data-placeholder)',
        float: 'left',
        color: '#ced4da',
        pointerEvents: 'none',
        height: 0,
      },

      strong: {
        fontWeight: 700,
      },

      em: {
        fontStyle: 'italic',
      },

      h1: {
        fontSize: '3rem',
        lineHeight: '3.9rem',
        fontWeight: 700,
        margin: '1.2rem 0 .8rem',
      },

      h2: {
        fontSize: '2.4rem',
        lineHeight: '3rem',
        fontWeight: 700,
        margin: '1.2rem 0 .8rem',
      },

      h3: {
        fontSize: '2rem',
        lineHeight: '2.6rem',
        fontWeight: 700,
        margin: '1.2rem 0 .8rem',
      },

      p: {
        fontSize: '1.6rem',
        lineHeight: '2.4rem',
        fontWeight: 500,
        margin: '.8rem 0',
      },

      a: {
        color: '#668AAA',
      },

      blockquote: {
        backgroundColor: '#F5F5F5',
        padding: '1.6rem 2.4rem',
        borderRadius: '1.2rem',
        margin: '2.4rem 0',
      },

      u: {
        textDecoration: 'underline',
      },

      ul: {
        li: {
          position: 'relative',

          '&:before': {
            content: '""',
            width: '.4rem',
            height: '.4rem',
            backgroundColor: '#000',
            borderRadius: '50%',
            position: 'absolute',
            top: '1.1rem',
            left: '.4rem',
          },

          p: {
            marginLeft: '2rem',
          },
        },
      },

      ol: {
        counterReset: 'ol-counter',

        li: {
          counterIncrement: 'ol-counter',
          position: 'relative',

          '&:before': {
            content: 'counter(ol-counter) "."',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.6rem',
            lineHeight: '2.4rem',
            fontWeight: 500,
          },

          p: {
            marginLeft: '2rem',
          },
        },
      },
    },
  }
})
