import styled from '@emotion/styled'

import { COLOR, FONT_FAMILY, SIZE, TTokenColor, TTokenSize } from '@src/utils/styles/tokens'

type TProps = {
  size?: TTokenSize
  color?: TTokenColor
  textDecoration?: 'underline' | 'none'
  weight?: 500 | 700
}

export const StyledContainer = styled('span')<TProps>(
  ({ size = 'regular', color = 'default', textDecoration = 'none', weight }) => {
    return {
      textDecoration,
      ...SIZE[size],
      fontWeight: weight,
      fontFamily: FONT_FAMILY,
      color: COLOR[color],
    }
  },
)

export type TSpanStyles = TProps
