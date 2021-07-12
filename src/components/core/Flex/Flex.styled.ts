import styled from '@emotion/styled'

type TProps = {
  direction?: 'column' | 'row'
  justify?: 'end' | 'start' | 'between' | 'default' | 'center'
  align?: 'end' | 'start' | 'default' | 'center'
  position?: 'relative'
}

const convertToAlignProps = (align: TProps['justify'] | TProps['align']) => {
  switch (align) {
    case 'between':
      return 'space-between'
    case 'end':
      return 'flex-end'
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'default':
      return 'initial'
  }
}

export const StyledContainer = styled('div')<TProps>(({ position, direction, justify, align }) => {
  return {
    position,
    display: 'flex',
    flexDirection: direction,
    justifyContent: convertToAlignProps(justify),
    alignItems: convertToAlignProps(align),
  }
})

export type TFlexStyles = TProps
