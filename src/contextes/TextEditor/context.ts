import { TAuthor } from '@src/components/_common/TextEditor/Editor/Authors'
import { Editor } from '@tiptap/react'
import { createContext } from 'react'

type TContext = {
  editor: Editor | null
  authors: TAuthor[]
  title: string
  isNewDocumentModalOpen: boolean
  setEditor: (editor: Editor | null) => void
  setTitle: (title: string) => void
  setAuthors: (authors: TAuthor[]) => void
  setContent: (content: string) => void
  setIsNewDocumentModalOpen: (isOpen: boolean) => void
}

const initialValue: TContext = {
  title: '',
  authors: [],
  editor: null,
  isNewDocumentModalOpen: false,
  setAuthors: () => {
    {
    }
  },
  setTitle: () => {
    {
    }
  },
  setEditor: () => {
    {
    }
  },
  setContent: () => {
    {
    }
  },
  setIsNewDocumentModalOpen: () => {
    {
    }
  },
}

export const TextEditorContext = createContext(initialValue)

export type TTextEditorContext = TContext
