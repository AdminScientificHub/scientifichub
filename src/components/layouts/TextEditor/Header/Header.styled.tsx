import { rgba } from 'emotion-rgba'

import styled from '@emotion/styled'

import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledHeader = styled(Flex)(() => {
  return {
    gridRow: '1/1',
    borderBottom: `0.1rem solid #E5E5E5`,
    minHeight: '4rem',
  }
})

export const StyledNewDocumentBtn = styled('button')(() => {
  return {
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    color: '#FFFFFF',
    fontWeight: 700,
    border: 'none',
    backgroundColor: '#3654D1',
    borderRadius: '.4rem',
    padding: '.4rem .8rem',
    marginRight: '2.4rem',
    transition: 'all .2s ease',
    cursor: 'pointer',

    span: {
      fontWeight: 500,
    },

    '&:hover': {
      backgroundColor: lightenDarkenColor('#3654D1', -20),
    },
  }
})

export const StyledLogo = styled('a')(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2.4rem',

    '& > svg': {
      height: '2rem',
    },
  }
})

export const StyledNavigationItem = styled(Flex)<{ inactive?: boolean }>(({ inactive }) => {
  return {
    width: '40px',
    height: '40px',
    borderLeft: `1px solid #E5E5E5`,
    transition: 'all .2s ease',
    cursor: 'pointer',

    ...(inactive
      ? {
          cursor: 'not-allowed',
          '& > *': {
            opacity: '.4',
          },
        }
      : {
          '&:hover': {
            backgroundColor: rgba('#000', 0.1),
          },
        }),

    '& > svg': {
      height: '1.6rem',
    },
  }
})
