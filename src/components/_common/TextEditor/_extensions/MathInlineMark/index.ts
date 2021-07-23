import { Node } from '@tiptap/core'
import { ChainedCommands, Editor, mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react'
import { MathInlineMarkComponent } from './MathInlineMark'

declare module '@tiptap/core' {
  interface Commands {
    mathInlineMark: {
      /**
       * Set the indent attribute
       */
      setMathInlineMark: () => ChainedCommands
      /**
       * Unset the indent attribute
       */
      toggleMathInlineMark: () => ChainedCommands
    }
  }
}

export const MathInlineMark = Node.create({
  name: 'mathInlineMark',
  content: 'text*',
  group: 'block',
  code: true,
  marks: '',
  selectable: true,
  defining: true,
  defaultOptions: {
    HTMLAttributes: {},
  },

  parseHTML() {
    return [{ tag: 'span' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },
  addNodeView() {
    return ReactNodeViewRenderer(MathInlineMarkComponent)
  },
  addCommands(): any {
    return {
      toggleMathInlineMark:
        (attributes: any) =>
        ({ commands }: Editor) => {
          return commands.toggleNode('mathInlineMark', 'paragraph', attributes)
        },
    }
  },
})
