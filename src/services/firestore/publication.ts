import { TAuthorType, TPublication, TPublicationStatus } from '@src/contextes/Publication/context'
import firebase from 'firebase'

type TDBAuthor = { id: string; type: TAuthorType }
type TDBPublication = Omit<TPublication, 'authors'> & { authors: TDBAuthor[] }

/**
 * =============================
 * ======== QUERIES ==========
 * =============================
 */
const getPublicationAuthors = async (
  authors: { id: string; type: TAuthorType }[],
): Promise<any> => {
  const db = firebase.firestore()

  return Promise.all(
    authors.map(async ({ id, type }) => {
      const authorRes = await db.collection('users').doc(id).get()

      return {
        ...authorRes.data(),
        type,
        id: authorRes.id,
      }
    }),
  )
}

export const getPublication = async (
  publicationId: string,
  onError: () => void,
): Promise<TPublication | null> => {
  const db = firebase.firestore()

  const res = await db.collection('publications').doc(publicationId).get()
  const publication = res.data() as TDBPublication

  if (publication) {
    const authors = await getPublicationAuthors(publication.authors)

    return { ...publication, authors, id: res.id }
  } else {
    onError()

    return null
  }
}

export const getUserPublicationSnapShotByStatus = ({
  userUid,
  status,
  callback,
}: {
  userUid: string
  status: TPublicationStatus
  callback: (publications: TPublication[]) => void
}): void => {
  const db = firebase.firestore()

  db.collection('publications')
    .where('user', '==', userUid)
    .where('status', '==', status)
    .onSnapshot(({ docs }) => {
      Promise.all(
        docs.map(async doc => {
          const publication = doc.data()
          const authors = await getPublicationAuthors(publication.authors)

          return {
            ...publication,
            id: doc.id,
            authors,
          } as TPublication
        }),
      ).then(callback)
    })
}

/**
 * =============================
 * ======== MUTATIONS ==========
 * =============================
 */
export const createPublication = ({
  content = '',
  title = 'Untitled',
  userUid,
  authors = [],
  callback,
}: {
  userUid: string
  title?: TPublication['title']
  content?: TPublication['content']
  authors?: { id: string; type: TAuthorType }[]
  callback?: (value: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>) => void
}): void => {
  const db = firebase.firestore()

  db.collection('publications')
    .add({
      title,
      authors,
      status: 'DRAFT',
      type: null,
      user: userUid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      publishedAt: null,
      content,
      tags: [],
      fields: [],
      coverUrl: '',
      description: '',
    })
    .then(callback)
}

export const publishPublication = ({
  publicationId,
  callback,
  publication,
}: {
  publicationId: string
  publication: Omit<Partial<TPublication>, 'status' | 'publishedAt'>
  callback?: () => void
}): void => {
  const db = firebase.firestore()

  db.collection('publications')
    .doc(publicationId)
    .update({
      ...publication,

      status: 'PUBLISHED',
      publishedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(callback)
}

export const updatePublication = ({
  publicationId,
  publication,
  callback,
}: {
  publicationId: string
  publication: Partial<TPublication>
  callback?: () => void
}): void => {
  if (!publication) {
    return
  }

  const db = firebase.firestore()

  db.collection('publications')
    .doc(publicationId)
    .update({
      ...publication,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(callback)
}

export const deletePublication = ({
  publicationId,
  callback,
}: {
  publicationId: string
  callback?: () => void
}): void => {
  const db = firebase.firestore()

  db.collection('publications').doc(publicationId).delete().then(callback)
}
