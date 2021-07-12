import styled, { CSSObject } from '@emotion/styled'

type TProps = {
  as: 'h1' | 'h2' | 'h3'
}

export const StyledHeading = styled('div')<TProps>(({ as }) => {
  const headingOneStyle: CSSObject = {
    fontWeight: 700,
    color: '#000',
    fontSize: '3rem',
    lineHeight: '3.9rem',
  }

  const headingTwoStyle: CSSObject = {
    fontWeight: 700,
    color: '#000',
    fontSize: '2.4rem',
    lineHeight: '3rem',
  }

  const headingThreeStyle: CSSObject = {
    fontWeight: 700,
    color: '#000',
    fontSize: '2rem',
    lineHeight: '2.6rem',
  }

  switch (as) {
    case 'h1':
      return headingOneStyle
    case 'h2':
      return headingTwoStyle
    case 'h3':
      return headingThreeStyle
    default:
      return {}
  }
})

export type TStyledHeadingProps = TProps
