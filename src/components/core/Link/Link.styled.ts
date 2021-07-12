import styled from '@emotion/styled'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'
import { SIZE } from '@src/utils/styles/tokens'

import { TParagraphStyles } from '../Paragraph/Paragraph.styled'

type TProps = {} & TParagraphStyles

export const StyledContainer = styled('a')<TProps>(({ size }) => {
  return {
    textDecoration: 'underline',
    cursor: 'pointer',
    transition: 'all .2s ease',
    ...(size
      ? SIZE[size]
      : {
          fontSize: '1.4rem',
          lineHeight: '2rem',
        }),

    color: '#858DA8',

    '&:hover': {
      color: lightenDarkenColor('#858DA8', -100),
    },
  }
})

export type TLinkStyles = TProps
