import { Span } from '@src/components/core'
import { UploadFileModal } from '@src/components/_common'
import { useTextEditorContext } from '@src/contextes'
import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, useMemo, useState } from 'react'
import { StyledNavigationItem } from '../Header.styled'

type TProps = {}

export const ImportAction: FunctionComponent<TProps> = () => {
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false)

  const { query } = useRouter()
  const { editor } = useTextEditorContext()

  const publicationId = useMemo(() => query.publicationId as string, [query])

  return (
    <>
      <UploadFileModal
        isModalOpen={isFileUploadModalOpen}
        closeModal={() => setIsFileUploadModalOpen(false)}
        isEditorEmpty={editor?.isEmpty}
        publicationId={publicationId}
      />
      <StyledNavigationItem
        justify="center"
        align="center"
        onClick={() => setIsFileUploadModalOpen(true)}
      >
        <Span size="small">Import</Span>
      </StyledNavigationItem>
    </>
  )
}

export type TImportActionProps = TProps
