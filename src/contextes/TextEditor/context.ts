import { Editor } from '@tiptap/react'
import { createContext } from 'react'

type TContext = {
  editor: Editor | null
  title: string
  isSaving: boolean
  setEditor: (editor: Editor | null) => void
  setTitle: (title: string) => void
}

const initialValue: TContext = {
  title: '',
  editor: null,
  isSaving: false,
  setTitle: () => {
    {
    }
  },
  setEditor: () => {
    {
    }
  },
}

export const TextEditorContext = createContext(initialValue)

export type TTextEditorContext = TContext
