import styled from "@emotion/styled"
import { COLOR, FONT_FAMILY, SIZE, TTokenColor, TTokenSize } from "@src/utils/styles/tokens"

type TProps = {
	size?: TTokenSize
	color?: TTokenColor
}

export const StyledContainer = styled('span')<TProps>(({ size = "regular", color = 'default' }) => {

	return {
		...SIZE[size],
		fontFamily: FONT_FAMILY,
		color: COLOR[color]
	}
})

export type TSpanStyles = TProps