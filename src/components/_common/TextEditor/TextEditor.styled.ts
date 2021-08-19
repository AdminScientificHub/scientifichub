import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { rgba } from 'emotion-rgba'

export const StyledSidebar = styled(Flex)<{ showSidebar: boolean }>(({ showSidebar }) => {
  return {
    '& > *': {
      transition: 'opacity .3s ease',
      opacity: showSidebar ? 1 : 0,
      transform: showSidebar ? 'translate(0)' : 'translate(999rem)',

      '&:not(:last-child)': {
        paddingBottom: '2.4rem',
        marginBottom: '2.4rem',
        borderBottom: `.1rem solid ${rgba('#000', 0.1)}`,
      },
    },
  }
})
