import styled from '@emotion/styled'

import { COLOR, FONT_FAMILY, SIZE, TTokenColor, TTokenSize } from '@src/utils/styles/tokens'

type TProps = {
  size?: TTokenSize
  color?: TTokenColor
  textDecoration?: 'underline' | 'none'
}

export const StyledContainer = styled('span')<TProps>(
  ({ size = 'regular', color = 'default', textDecoration = 'none' }) => {
    return {
      textDecoration,
      ...SIZE[size],
      fontFamily: FONT_FAMILY,
      color: COLOR[color],
    }
  },
)

export type TSpanStyles = TProps
