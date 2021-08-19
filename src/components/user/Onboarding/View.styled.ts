import styled from '@emotion/styled'

export const StyledForm = styled('form')(() => {
  return {
    '& > *': {
      '&:not(:last-child)': {
        marginBottom: '2.4rem',
      },
    },
  }
})
