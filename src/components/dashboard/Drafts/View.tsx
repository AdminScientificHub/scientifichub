import { Flex } from '@src/components/core'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import firebase from 'firebase'
import { DashboardCard, DashboardSection, DashboardTable } from '../_common'

import { StyledCardList, StyledDownloadIcon } from './View.styled'

import DownloadIcon from '@src/assets/icons/download.svg'
import NewPublicationIcon from '@src/assets/icons/new-publication.svg'
import TemplateColorIcon from '@src/assets/icons/template-color.svg'

import { DRAFTS_COLUMNS } from './constants'
import { useAuthContext } from '@src/contextes'

import { PAPER_TEMPLATE } from '@src/components/_common/Modal/_variants/NewDocumentModal/constant'
import { formatToFromNow } from '@src/utils/text/formatDate'
import moment from 'moment'
import { TPublication, TPublicationStatus } from '@src/contextes/Publication/context'
import { UploadFileModal } from '@src/components/_common'
import ReactTooltip from 'react-tooltip'
import { orderPublications, TOrder } from './View.utils'
import { createPublication, getUserPublicationSnapShotByStatus } from '@src/services'

import { useRouter } from 'next/dist/client/router'

type TProps = {}

export const PUBLICATION_STATUS_TO_STR: { [key in TPublicationStatus]: string } = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
}

export const DraftsView: FunctionComponent<TProps> = () => {
  const [userPublications, setUserPublications] = useState<TPublication[]>([])
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false)
  const [orderSelected, setOrderSelected] = useState<TOrder | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuthContext()
  const router = useRouter()

  const db = useMemo(() => firebase.firestore(), [])

  useEffect(() => {
    if (!user?.uid) {
      return
    }

    setIsLoading(true)

    getUserPublicationSnapShotByStatus({
      userUid: user.uid,
      status: 'DRAFT',
      callback: data => {
        setUserPublications(data)
        setIsLoading(false)
      },
    })
  }, [user?.uid, db])

  const formattedPublications = useMemo(() => {
    const publications = userPublications.map(publication => {
      return {
        fileName: publication.title || 'Untitled',
        lastModified:
          publication.updatedAt &&
          formatToFromNow(moment.utc(publication.updatedAt.toDate()).toString()),
        created:
          publication.createdAt &&
          formatToFromNow(moment.utc(publication.createdAt.toDate()).toString()),
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

  const createEmptyPublication = () => {
    if (!user) {
      return
    }

    createPublication({
      userUid: user.uid,
      authors: [{ type: 'PRINCIPAL', id: user.id }],
      callback: ({ id }) => {
        router.push(`/publication/${id}/edit`)
      },
    })
  }

  const createPublicationFromTemplate = () => {
    if (!user) {
      return
    }

    createPublication({
      userUid: user.uid,
      authors: [{ type: 'PRINCIPAL', id: user.id }],
      content: PAPER_TEMPLATE,
      callback: ({ id }) => {
        router.push(`/publication/${id}/edit`)
      },
    })
  }

  return (
    <Flex direction="column">
      <ReactTooltip place="left" className="tooltip" id="drafts-view" />
      <UploadFileModal
        isModalOpen={isFileUploadModalOpen}
        closeModal={() => setIsFileUploadModalOpen(false)}
      />
      <DashboardSection
        title="New File"
        sideAction={
          <StyledDownloadIcon
            data-tip="Upload a new document"
            data-for="drafts-view"
            onClick={() => setIsFileUploadModalOpen(true)}
          >
            <DownloadIcon />
          </StyledDownloadIcon>
        }
      >
        <StyledCardList direction="row">
          <DashboardCard
            title="Blank document"
            icon={<NewPublicationIcon />}
            description="Begin from a fresh empty publication"
            onClick={createEmptyPublication}
          />
          <DashboardCard
            title="Paper template"
            icon={<TemplateColorIcon />}
            description="Start with a section ready paper template"
            onClick={createPublicationFromTemplate}
          />
        </StyledCardList>
      </DashboardSection>
      <DashboardSection title="Drafts">
        <DashboardTable
          onOrder={updateOrder}
          columns={DRAFTS_COLUMNS}
          orderSelected={orderSelected}
          rows={formattedPublications}
          isLoading={isLoading}
        />
      </DashboardSection>
    </Flex>
  )
}

export type TDraftsViewProps = TProps
