import { createContext } from 'react'

import firebase from 'firebase/app'
import { TUser } from '../Auth/context'

export type TPublicationStatus = 'DRAFT' | 'PUBLISHED'
export type TPublicationType =
  | 'ARTICLE'
  | 'PAPER'
  | 'THESIS'
  | 'BOOK'
  | 'TALK'
  | 'TEACHING DOCUMENT'

export type TAuthorType = 'PRINCIPAL' | 'SECONDARY'

export type TPublication = {
  id: string
  authors: ({ type: TAuthorType } & TUser)[]
  content: string
  status: TPublicationStatus
  tags: any[]
  fields: any[]
  title: string
  createdAt: firebase.firestore.Timestamp
  publishedAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
  user: string
  description: string
  coverUrl: string
}

type TContext = {
  publication: TPublication | null
  publicationId: string
  fetchPublication: () => void
}

const initialValue: TContext = {
  publication: null,
  publicationId: '',
  fetchPublication: () => {
    {
    }
  },
}

export const PublicationContext = createContext(initialValue)

export type TPublicationContext = TContext
