export type TTokenSize = 'regular' | 'small' | 'xsmall' | 'large'

export const SIZE: {
  [keyof in NonNullable<TTokenSize>]: { fontSize: string; lineHeight: string }
} = {
  large: {
    fontSize: '2rem',
    lineHeight: '3rem',
  },
  regular: {
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
  },
  small: {
    fontSize: '1.4rem',
    lineHeight: '2rem',
  },
  xsmall: {
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
  },
}

export type TTokenColor = 'default' | 'text-light' | 'text-lighter' | 'error'

export const COLOR: { [keyof in NonNullable<TTokenColor>]: string } = {
  default: '#000',
  'text-light': '#858CA8',
  'text-lighter': '#ced4da',
  error: '#F14336',
}

export const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'
