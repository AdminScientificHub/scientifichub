import { Command, Extension } from '@tiptap/core'
import { IndentProps, updateIndentLevel } from './Indent.utils'

// @src https://github.com/ueberdosis/tiptap/issues/1036

type IndentOptions = {
  types: string[]
  indentLevels: number[]
  defaultIndentLevel: number
}

declare module '@tiptap/core' {
  interface Commands {
    indent: {
      /**
       * Set the indent attribute
       */
      indent: () => Command
      /**
       * Unset the indent attribute
       */
      outdent: () => Command
    }
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  defaultOptions: {
    types: ['heading', 'paragraph'],
    indentLevels: [0, 12, 24, 36, 48, 60],
    defaultIndentLevel: 0,
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: this.options.defaultIndentLevel,
            renderHTML: attributes => ({
              ...(attributes.indent !== 0 && { style: `margin-left: ${attributes.indent}px` }),
            }),
            parseHTML: element => ({
              indent: parseInt(element.style.marginLeft) || this.options.defaultIndentLevel,
            }),
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state
          tr = tr.setSelection(selection)
          tr = updateIndentLevel(tr, IndentProps.more)

          if (tr.docChanged) {
            // eslint-disable-next-line no-unused-expressions
            dispatch && dispatch(tr)
            return true
          }

          return false
        },
      outdent:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state
          tr = tr.setSelection(selection)
          tr = updateIndentLevel(tr, IndentProps.less)

          if (tr.docChanged) {
            // eslint-disable-next-line no-unused-expressions
            dispatch && dispatch(tr)
            return true
          }

          return false
        },
    }
  },

  addKeyboardShortcuts(): any {
    return {
      Tab: () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent(),
    }
  },
})
