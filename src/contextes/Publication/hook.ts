import { useRouter } from 'next/dist/client/router'
import { useEffect, useMemo, useState } from 'react'
import { TPublication, TPublicationContext } from './context'

import firebase from 'firebase/app'
import { getPublication } from '@src/services'

export const usePublication = (): TPublicationContext => {
  const [publication, setPublication] = useState<TPublication | null>(null)

  const { query, push } = useRouter()

  const publicationId = useMemo(() => query.publicationId as string, [query])
  const db = useMemo(() => firebase.firestore(), [])

  useEffect(() => {
    let cancel = false

    async function fetchPublication() {
      if (cancel) {
        return
      }

      const fetchedPublication = await getPublication(publicationId, () =>
        push('/publication/error'),
      )

      setPublication(fetchedPublication)
    }

    fetchPublication()

    return () => {
      cancel = true
    }
  }, [query, db, publicationId, setPublication, push])

  const fetchPublication = async () => {
    const fetchedPublication = await getPublication(publicationId, () => push('/publication/error'))

    setPublication(fetchedPublication)
  }

  return {
    publication,
    publicationId,
    fetchPublication,
  }
}
