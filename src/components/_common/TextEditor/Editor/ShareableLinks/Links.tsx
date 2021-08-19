import React, { FunctionComponent, useMemo } from 'react'
import ReactTooltip from 'react-tooltip'

import FacebookIcon from '@src/assets/icons/facebook.svg'
import LinkedinIcon from '@src/assets/icons/linkedin.svg'
import TwitterIcon from '@src/assets/icons/twitter.svg'
import { useGlobalContext, usePublicationContext } from '@src/contextes'

import { StyledContainer } from './Links.styled'

type TProps = {
  place?: 'top' | 'right' | 'bottom' | 'left'
}

export const ShareableLinks: FunctionComponent<TProps> = ({ place = 'bottom' }) => {
  const { isLiveMode } = useGlobalContext()

  const { publication, publicationId } = usePublicationContext()

  const twitterLink = useMemo(() => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${publication?.title} ${`https://app.scientifichub.io/publication/${publicationId}`}`,
    )}`
  }, [publication?.title, publicationId])

  const linkedinLink = useMemo(() => {
    return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      `https://app.scientifichub.io/publication/${publicationId}`,
    )}&title=${encodeURIComponent(publication?.title || '')}&summary=${
      publication?.description
    }&source=LinkedIn`
  }, [publicationId, publication?.title, publication?.description])

  const facebookLink = useMemo(() => {
    return `https://www.facebook.com/sharer.php?t=${encodeURIComponent(
      publication?.title || '',
    )}&u=${encodeURIComponent(`https://app.scientifichub.io/publication/${publicationId}`)}`
  }, [publication?.title, publicationId])

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
