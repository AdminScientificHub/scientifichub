import styled from '@emotion/styled'
import { AlertComponentProps } from 'react-alert'

type TType = { type: AlertComponentProps['options']['type'] }

export const StyledTitle = styled('p')<TType>(() => {
  return {
    fontSize: '1.4rem',
    lineHeight: '1.6rem',
    fontWeight: 600,
  }
})

export const StyledSubtitle = styled('p')<TType>(({ type }) => {
  let color = ''

  switch (type) {
    case 'error':
      color = '#E45C55'
      break
    case 'info':
      color = '#3254C4'
      break
    case 'success':
      color = '#5CBB6A'
      break
  }

  return {
    color,
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: 700,
  }
})
