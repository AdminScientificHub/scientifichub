import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledContainer = styled(Flex)(() => {
  return {
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    overflow: 'hidden',
  }
})

export const StyledBackgroundContainer = styled(Flex)(() => {
  return {
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/images/auth-background.png")',
    backgroundSize: 'cover',
  }
})

export const StyledImage = styled('img')(() => {
  return {
    minHeight: '20rem',
    height: '60%',
    maxHeight: '45rem',
  }
})
