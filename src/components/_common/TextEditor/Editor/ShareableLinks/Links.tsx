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
  const { isLiveMode } = useGlobalContext()
  const { title, editor } = useTextEditorContext()

  const { query } = useRouter()

  const publicationId = useMemo(() => {
    return query.publicationId
  }, [query.publicationId])

  const twitterLink = useMemo(() => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${title} ${`https://app.scientifichub.io/publication/${publicationId}`}`,
    )}`
  }, [title, publicationId])

  const linkedinLink = useMemo(() => {
    const value = editor?.getJSON() as any

    if (!value) return ''

    const firstParagraph = value.content.find(({ type }: any) => type === 'paragraph')

    return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      `https://app.scientifichub.io/publication/${publicationId}`,
    )}&title=${encodeURIComponent(title)}${
      firstParagraph.content ? `&summary=${firstParagraph.content[0].text}` : ''
    }&source=LinkedIn`
  }, [publicationId, title, editor])

  const facebookLink = useMemo(() => {
    return `https://www.facebook.com/sharer.php?t=${encodeURIComponent(
      title,
    )}&u=${encodeURIComponent(`https://app.scientifichub.io/publication/${publicationId}`)}`
  }, [publicationId, title])

  return (
    <StyledContainer direction="row" areLinksActive={isLiveMode}>
      <ReactTooltip place={place} className="tooltip" id="shareable-links" />
      <a href={isLiveMode ? twitterLink : undefined} target="_blank" rel="noreferrer">
        <TwitterIcon
          data-tip={isLiveMode ? 'Share on Twitter' : 'Not shareable in preview'}
          data-for="shareable-links"
        />
      </a>
      <a href={isLiveMode ? linkedinLink : undefined} target="_blank" rel="noreferrer">
        <LinkedinIcon
          data-tip={isLiveMode ? 'Share on Linkedin' : 'Not shareable in preview'}
          data-for="shareable-links"
        />
      </a>
      <a href={isLiveMode ? facebookLink : undefined} target="_blank" rel="noreferrer">
        <FacebookIcon
          data-tip={isLiveMode ? 'Share on Facebook' : 'Not shareable in preview'}
          data-for="shareable-links"
        />
      </a>
    </StyledContainer>
  )
}

export type TShareableLinksProps = TProps
