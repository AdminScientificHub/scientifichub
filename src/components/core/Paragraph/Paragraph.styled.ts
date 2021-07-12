import styled from '@emotion/styled'

import { COLOR, FONT_FAMILY, SIZE, TTokenColor, TTokenSize } from '@src/utils/styles/tokens'

type TProps = {
  size?: TTokenSize
  color?: TTokenColor
  textAlign?: 'center' | 'right' | 'left'
  weight?: 500 | 700
}

export const StyledContainer = styled('p')<TProps>(
  ({ size = 'regular', color = 'default', textAlign, weight }) => {
    return {
      textAlign,
      ...SIZE[size],
      fontWeight: weight,
      fontFamily: FONT_FAMILY,
      color: COLOR[color],
    }
  },
)

export type TParagraphStyles = TProps
