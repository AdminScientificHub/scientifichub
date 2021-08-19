import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

type TProps = {
  size?: 'regular' | 'medium' | 'xlarge'
}

export const SIZES: {
  [key in NonNullable<TProps['size']>]: { height: string; width: string; fontSize: string }
} = {
  regular: {
    height: '2rem',
    width: '2rem',
    fontSize: '1rem',
  },
  medium: {
    height: '2.4rem',
    width: '2.4rem',
    fontSize: '1.2rem',
  },
  xlarge: {
    height: '6rem',
    width: '6rem',
    fontSize: '3rem',
  },
}

export const StyledContainer = styled(Flex)<TProps>(({ size = 'regular' }) => {
  return {
    ...SIZES[size],
    borderRadius: '50%',
    backgroundColor: '#FF8577',
    color: '#fff',
    fontWeight: 600,
    lineHeight: 1,
  }
})

export type TStyledDropdownProps = TProps
