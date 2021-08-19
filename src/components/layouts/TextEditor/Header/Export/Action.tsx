import { Span } from '@src/components/core'
import React, { FunctionComponent } from 'react'
import { StyledNavigationItem } from '../Header.styled'
import HTMLtoDOCX from 'html-to-docx'
import { useTextEditorContext } from '@src/contextes'

type TProps = {}

export const ExportAction: FunctionComponent<TProps> = () => {
  const { title, editor } = useTextEditorContext()

  const downloadDocument = async () => {
    await HTMLtoDOCX(JSON.stringify(editor?.getHTML()), title).then((data: any) => {
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(data)

      a.style.display = 'none'
      a.href = url
      a.download = title ? `${title}.docx` : 'scientifichub-publication.docx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  }

  return (
    <StyledNavigationItem justify="center" align="center" onClick={downloadDocument}>
      <Span size="small">Export</Span>
    </StyledNavigationItem>
  )
}

export type TExportActionProps = TProps
