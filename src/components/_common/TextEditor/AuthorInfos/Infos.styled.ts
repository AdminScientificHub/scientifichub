import styled from '@emotion/styled'
import { Flex } from '@src/components/core'

export const StyledItem = styled('div')(() => {
  return {
    backgroundColor: '#C4C4C4',
    padding: '.4rem .8rem',
    fontSize: '1rem',
    lineHeight: 1,
    borderRadius: '.4rem',
    marginTop: '.8rem',
  }
})

export const StyledItemsContainer = styled(Flex)(() => {
  return {
    flexWrap: 'wrap',

    '& > *': {
      '&:not(:last-child)': {
        marginRight: '.4rem',
      },
    },
  }
})
