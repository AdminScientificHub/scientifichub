import styled from '@emotion/styled'

import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)<{ areLinksActive: boolean }>(({ areLinksActive }) => {
  return {
    marginBottom: '1.6rem',
    '& > *': {
      '&:not(:last-child)': {
        marginRight: '.8rem',
      },
    },
    svg: {
      height: '2rem',
      fill: '#757575',
      cursor: 'pointer',
      transition: 'all .2s ease',

      '&:focus': {
        outline: 'none',
      },

      ...(!areLinksActive
        ? {
            cursor: 'auto',
          }
        : {
            '&:hover': {
              fill: '#000',
            },
          }),
    },

    a: {
      '&:focus': {
        outline: 'none',
      },
    },
  }
})
