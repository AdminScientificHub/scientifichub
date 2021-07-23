import styled from '@emotion/styled'
import { NodeViewWrapper } from '@tiptap/react'

export const StyledContainer = styled(NodeViewWrapper)(() => {
  return {
    display: 'inline-block',

    '.katex-editor': {
      display: 'inline-block',
    },

    '.katex-display': {
      margin: '0',
    },

    '.decoration-inline-math': {
      color: '#8e9297',
    },

    '.active': {
      position: 'static',
      width: 'auto',
      height: 'auto',
      margin: 0,
      clip: 'auto',
      overflow: 'visible',
    },

    '.hidden': {
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
