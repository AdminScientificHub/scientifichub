import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent, useMemo } from 'react'
import ReactTooltip from 'react-tooltip'

import FacebookIcon from '@src/assets/icons/facebook.svg'
import LinkedinIcon from '@src/assets/icons/linkedin.svg'
import TwitterIcon from '@src/assets/icons/twitter.svg'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { StyledContainer } from './Links.styled'

type TProps = {
  place?: 'top' | 'right' | 'bottom' | 'left'
}

export const ShareableLinks: FunctionComponent<TProps> = ({ place = 'bottom' }) => {
  const { isEditorPreview } = useGlobalContext()
  const { title, editor } = useTextEditorContext()

  const { query } = useRouter()

  const publicationId = useMemo(() => {
    return query.publicationId
  }, [query.publicationId])

  return (
    <StyledContainer direction="row" areLinksActive={!isEditorPreview}>
      <ReactTooltip place={place} className="tooltip" id="shareable-links" />
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${title} ${`https://app.scientifichub.io/publication/${publicationId}`}`,
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        <TwitterIcon
          data-tip={isEditorPreview ? 'Not shareable in preview' : 'Share on Twitter'}
          data-for="shareable-links"
        />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          `https://app.scientifichub.io/publication/${publicationId}`,
        )}&title=${encodeURIComponent(title)}&summary=${editor?.getHTML()}&source=LinkedIn`}
        target="_blank"
        rel="noreferrer"
      >
        <LinkedinIcon
          data-tip={isEditorPreview ? 'Not shareable in preview' : 'Share on Linkedin'}
          data-for="shareable-links"
        />
      </a>
      <a
        href={`https://www.facebook.com/sharer.php?t=${encodeURIComponent(
          title,
        )}&u=${encodeURIComponent(`https://app.scientifichub.io/publication/${publicationId}`)}`}
        target="_blank"
        rel="noreferrer"
      >
        <FacebookIcon
          data-tip={isEditorPreview ? 'Not shareable in preview' : 'Share on Facebook'}
          data-for="shareable-links"
        />
      </a>
    </StyledContainer>
  )
}

export type TShareableLinksProps = TProps
