import { Node } from '@tiptap/core'
import { ChainedCommands, Editor, mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react'
import { textblockTypeInputRule } from 'tiptap-commands'
import { deleteMathBlock, getLinesFromSelection } from '../../utils'
import { MathBlockComponent } from './MathBlock'
export interface BlockquoteOptions {
  HTMLAttributes: Record<string, {}>
}

declare module '@tiptap/core' {
  interface Commands {
    mathBlock: {
      /**
       * Set the indent attribute
       */
      setMathBlock: () => ChainedCommands
      /**
       * Unset the indent attribute
       */
      toggleMathBlock: () => ChainedCommands
    }
  }
}

export const MathBlock = Node.create({
  name: 'mathBlock',
  content: 'text*',
  group: 'block',
  defining: true,
  selectable: true,
  code: true,
  marks: '',
  defaultOptions: {
    types: ['heading', 'paragraph'],
  },
  parseDOM: [{ tag: 'div', class: 'MathBlock' }],
  parseHTML() {
    return [
      {
        tag: 'math-block',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'math-block',
      mergeAttributes(HTMLAttributes),
      ['div', { class: 'katex-render', contenteditable: 'false' }],
      ['pre', { class: 'katex-editor active', 'data-lang': 'stex' }, ['code', 0]],
    ]
  },
  addCommands(): any {
    return {
      setMathBlock:
        (attributes: any) =>
        ({ commands, chain }: Editor) => {
          return commands.toggleNode('mathBlock', 'paragraph', attributes)
        },
      toggleMathBlock:
        (attributes: any) =>
        ({ commands, chain }: Editor) => {
          return commands.toggleNode('mathBlock', 'paragraph', attributes)
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathBlockComponent)
  },

  addInputRules(): any {
    return [textblockTypeInputRule(/^\$\$\$$/, this.type)]
  },

  addKeyboardShortcuts(): any {
    return {
      Enter: ({ editor }: { editor: Editor }) => {
        const { state } = editor

        const { end } = getLinesFromSelection(state)

        const blockSelected = state.selection.$from.parent.type

        if (blockSelected.name === 'mathBlock') {
          editor
            .chain()
            .focus(end + 1)
            .run()
        }
      },
      Backspace: ({ editor }: { editor: Editor }) => {
        return deleteMathBlock(editor.view.state, editor.view.dispatch, null)
      },
    }
  },
})
