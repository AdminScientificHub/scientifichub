import styled from '@emotion/styled'
import { NodeViewWrapper } from '@tiptap/react'

export const StyledContainer = styled(NodeViewWrapper)(() => {
  return {
    fontSize: '1.6rem',
    lineHeight: '2.4rem',

    '.katex-editor': {
      display: 'inline-block',
    },

    '.katex-display': {
      margin: '0',
    },

    '.katex-render': {
      display: 'inline-block',
    },

    '.content': {
      position: 'absolute',
      width: '1px',
      height: '1px',
      margin: '-1px',
      border: 0,
      padding: 0,
      whiteSpace: 'nowrap',
      clipPath: 'inset(100%)',
      clip: 'rect(0 0 0 0)',
      overflow: 'hidden',
    },
  }
})
