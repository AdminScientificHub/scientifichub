import styled from '@emotion/styled'

export const StyledContainer = styled('div')<{ isPreviewMode: boolean }>(({ isPreviewMode }) => {
  return {
    display: 'grid',
    height: '100vh',
    width: '100%',
    ...(!isPreviewMode
      ? {
          gridTemplateRows: '4rem 1fr 5rem',
          '@media only screen and (max-width: 550px)': {
            gridTemplateRows: '4rem 1fr 4rem',
          },
        }
      : { gridTemplateRows: '4rem 1fr' }),
  }
})
