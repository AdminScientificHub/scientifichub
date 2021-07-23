import { Node } from '@tiptap/core'
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react'
import { InputRule } from 'prosemirror-inputrules'
import { Editor } from '@tiptap/react'
import { MathInlineComponent } from './MathInline'
import { deleteMath } from './MathInline.utils'

export const MathInline = Node.create({
  name: 'mathInline',
  content: 'inline*',
  group: 'inline',
  // code: true,
  marks: '',
  inline: true,
  selectable: true,

  parseHTML() {
    return [{ tag: 'math-inline' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['math-inline', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(MathInlineComponent)
  },
  addInputRules() {
    const { type } = this as any

    return [
      new InputRule(/(?:\$)([^\$\s]+(?:\s+[^\$\s]+)*)(?:\$)$/, (state, match, start, end) => {
        const attrs = type.attrs

        const [matchedText, content] = match
        const { tr, schema } = state

        if (matchedText) {
          tr.replaceWith(start, end, type.create(attrs, schema.text(content)))
        }

        return tr
      }),
    ]
  },
  addKeyboardShortcuts(): any {
    return {
      Backspace: ({ editor }: { editor: Editor }) => {
        return deleteMath(editor.view.state, editor.view.dispatch, null)
      },
    }
  },
})
