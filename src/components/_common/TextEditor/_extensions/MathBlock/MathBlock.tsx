import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

import { NodeViewContent, NodeView } from '@tiptap/react'

import katex from 'katex'
import 'katex/dist/katex.min.css'

import { StyledMathBlock, StyledRenderBlock } from './MathBlock.styled'

import { useClickOutside } from '@src/utils/hooks/useClickOutside'
import { useCallback } from 'react'
import { EMPTY_STATE_HTML } from './MathBlock.utils'
import { useGlobalContext } from '@src/contextes'

export const MathBlockComponent: FunctionComponent<NodeView<{}>> = ({ node, getPos, editor }) => {
  const [showEditor, setShowEditor] = useState(false)

  const render = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { isPreviewMode } = useGlobalContext()
  const { clickedOutside } = useClickOutside(containerRef)

  const isTextEmpty = useMemo(() => {
    const text = node.textContent

    return !text || !text.replace(/ /g, '')
  }, [node.textContent])

  useEffect(() => {
    if (!render.current) {
      return
    }

    const text = node.textContent

    if (isTextEmpty) {
      setTimeout(() => {
        if (!render.current) {
          return
        }

        render.current.innerHTML = EMPTY_STATE_HTML
      }, 1)

      return
    }

    const katexOutput = katex.renderToString(text, {
      throwOnError: false,
      displayMode: true,
    })

    render.current.innerHTML = katexOutput
  }, [node.textContent, isTextEmpty])

  const onUpdate = useCallback(() => {
    const anchor = editor.view.state.selection.anchor
    const shouldHide = getPos() <= anchor && anchor < node.nodeSize + getPos()

    setShowEditor(shouldHide)
  }, [editor.view.state.selection.anchor, getPos, node.nodeSize])

  useEffect(() => {
    editor.on('update', onUpdate)

    return () => {
      editor.off('update', onUpdate)
    }
  }, [editor, onUpdate])

  useEffect(() => {
    if (clickedOutside) {
      setShowEditor(false)
    }
  }, [clickedOutside])

  return (
    <StyledMathBlock className="MathBlock" ref={containerRef}>
      <StyledRenderBlock
        ref={render}
        contentEditable={false}
        className="katex-render"
        hasContent={!isTextEmpty}
        isPreviewMode={isPreviewMode}
        onClick={e => {
          if (isPreviewMode) {
            return
          }
          e.stopPropagation()
          setShowEditor(!showEditor)
        }}
        showEditor={showEditor}
      />
      <pre
        className={`katex-editor ${showEditor ? 'active' : 'hidden'}`}
        data-lang={node.attrs.lang}
      >
        <NodeViewContent as="code" className="content" />
        <button contentEditable={false} onClick={() => setShowEditor(false)}>
          Done
        </button>
      </pre>
    </StyledMathBlock>
  )
}
