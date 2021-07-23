import { NodeView, NodeViewContent } from '@tiptap/react'
import React, { FunctionComponent, useEffect, useRef } from 'react'

import katex from 'katex'
import 'katex/dist/katex.min.css'
import { StyledContainer } from './MathInlineMark.styled'

export const MathInlineMarkComponent: FunctionComponent<NodeView<{}>> = ({ node, editor }) => {
  const render = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editor) {
      return
    }

    const text = node.textContent

    if (!render.current) {
      return
    }

    const katexOutput = katex.renderToString(text, {
      throwOnError: false,
      displayMode: true,
    })

    render.current.innerHTML = katexOutput
  }, [node.textContent, render, editor])

  return (
    <StyledContainer as="span" className="MathInlineMark">
      <span ref={render} className={`katex-render`} />
      <NodeViewContent as="span" className="content" />
    </StyledContainer>
  )
}
