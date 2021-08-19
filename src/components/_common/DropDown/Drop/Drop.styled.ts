import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const dropKeyFrames = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

export const StyledContainer = styled('div')(() => {
  return {
    position: 'fixed',
    zIndex: 1000,
    opacity: 0,
    animation: `${dropKeyFrames} 0.1s forwards`,
    animationDelay: '0.01s',
    userSelect: 'none',
  }
})
