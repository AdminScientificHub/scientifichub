import { NodeView, NodeViewContent } from '@tiptap/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FunctionComponent } from 'react'
import { StyledContainer } from './MathInline.styled'

import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useClickOutside } from '@src/utils/hooks/useClickOutside'

export const MathInlineComponent: FunctionComponent<NodeView<{}>> = ({ node, editor, getPos }) => {
  const [showEditor, setShowEditor] = useState(false)

  const render = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { clickedOutside } = useClickOutside(containerRef)

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

  const onUpdate = useCallback(() => {
    const anchor = editor.view.state.selection.anchor
    const shouldHide = getPos() <= anchor && anchor < node.nodeSize + getPos()

    setShowEditor(shouldHide)
  }, [editor.view.state.selection.anchor, getPos, node.nodeSize])

  useEffect(() => {
    if (clickedOutside) {
      setShowEditor(false)
    }
  }, [clickedOutside])

  useEffect(() => {
    editor.on('update', onUpdate)

    return () => {
      editor.off('update', onUpdate)
    }
  }, [editor, onUpdate])

  return (
    <StyledContainer as="span" className="MathInline" ref={containerRef}>
      <span
        ref={render}
        contentEditable={true}
        className={`katex-render ${showEditor ? 'hidden' : 'active'}`}
      />
      {showEditor && (
        <span
          contentEditable={false}
          className={`decoration-inline-math ${showEditor ? 'active' : 'hidden'}`}
        >
          $
        </span>
      )}

      <NodeViewContent as="span" className={`katex-editor ${showEditor ? 'active' : 'hidden'}`} />
      {showEditor && (
        <span
          contentEditable={false}
          className={`decoration-inline-math ${showEditor ? 'active' : 'hidden'}`}
        >
          $
        </span>
      )}
    </StyledContainer>
  )
}
