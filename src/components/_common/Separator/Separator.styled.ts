import { Flex } from '@src/components/core'
import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const StyledContainer = styled(Flex)<{
  hasText?: boolean
  marginVertical?: number
  color: 'dark' | 'light'
  marginHorizontal?: number
}>(({ hasText, marginVertical = 0, color, marginHorizontal = 0 }) => {
  return {
    width: marginHorizontal ? `calc(100% - ${marginHorizontal}rem * 2)` : '100%',

    ...(hasText
      ? {
          '&:before': {
            content: "''",
            width: '100%',
            height: '1px',
            backgroundColor: rgba('#000', 0.1),
          },

          '&:after': {
            content: "''",
            width: '100%',
            height: '1px',
            backgroundColor: rgba('#000', 0.1),
          },

          p: {
            width: '100%',
            whiteSpace: 'pre',
            margin: '0 1rem',
          },
        }
      : {
          height: '.1rem',
          backgroundColor: rgba(color === 'dark' ? '#000' : '#fff', 0.1),
          margin: `${marginVertical}rem ${marginHorizontal}rem`,
        }),
  }
})
