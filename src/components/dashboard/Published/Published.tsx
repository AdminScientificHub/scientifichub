import { Flex } from '@src/components/core'
import { useAuthContext } from '@src/contextes'
import { TPublication } from '@src/contextes/Publication/context'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { PUBLISHED_COLUMNS } from '../Drafts/constants'
import firebase from 'firebase'

import { DashboardSection, DashboardTable } from '../_common'
import { formatToFromNow } from '@src/utils/text/formatDate'
import moment from 'moment'

import { orderPublications, TOrder } from '../Drafts/View.utils'
import { getUserPublicationSnapShotByStatus } from '@src/services'

type TProps = {}

export const PublishedView: FunctionComponent<TProps> = () => {
  const [orderSelected, setOrderSelected] = useState<TOrder | null>(null)
  const [userPublications, setUserPublications] = useState<TPublication[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuthContext()

  const db = useMemo(() => firebase.firestore(), [])

  useEffect(() => {
    if (!user?.uid) {
      return
    }

    setIsLoading(true)

    getUserPublicationSnapShotByStatus({
      userUid: user.uid,
      status: 'PUBLISHED',
      callback: data => {
        setUserPublications(data)
        setIsLoading(false)
      },
    })
  }, [user?.uid, db])

  const formattedPublications = useMemo(() => {
    const publications = userPublications.map(publication => {
      return {
        fileName: publication.title,
        publishedAt: formatToFromNow(moment.utc(publication.publishedAt.toDate()).toString()),
        fields: publication.fields?.length
          ? publication.fields.map(field => field.label).join(', ')
          : 'Not defined',
        tags: publication.tags?.length
          ? publication.tags.map(tag => tag.label).join(', ')
          : 'Not defined',
        authors: publication.authors.map(author => author.firstName),
        id: publication.id,
      }
    })

    if (!orderSelected) {
      return publications
    }

    return orderPublications(orderSelected, publications)
  }, [orderSelected, userPublications])

  const updateOrder = (key: string) => {
    if (orderSelected && orderSelected.key === key) {
      setOrderSelected({
        ...orderSelected,
        order: orderSelected.order === 'ASC' ? 'DESC' : 'ASC',
      })

      return
    }

    if ((orderSelected && orderSelected.key !== key) || !orderSelected) {
      setOrderSelected({
        key,
        order: 'ASC',
      })

      return
    }
  }

  return (
    <Flex direction="column">
      <DashboardSection title="Published">
        <DashboardTable
          onOrder={updateOrder}
          columns={PUBLISHED_COLUMNS}
          rows={formattedPublications}
          orderSelected={orderSelected}
          isLoading={isLoading}
        />
      </DashboardSection>
    </Flex>
  )
}

export type TPublishedViewProps = TProps
