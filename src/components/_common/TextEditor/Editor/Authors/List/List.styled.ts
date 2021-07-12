import styled from '@emotion/styled'

import { Flex } from '@src/components/core'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'

export const StyledAuthorsContainer = styled(Flex)<{ isPreviewMode: boolean }>(
  ({ isPreviewMode }) => {
    return {
      '& > *': {
        ...(!isPreviewMode && {
          '&:not(span)': {
            cursor: 'pointer',
            transition: 'all .2s ease',

            p: {
              transition: 'all .2s ease',
            },

            '&:hover': {
              p: {
                color: lightenDarkenColor('#858DA8', -100),
              },
              textDecoration: 'underline',
            },
          },
        }),
      },
    }
  },
)
