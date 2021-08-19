import { TextEditor } from '@src/components/_common'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { StyledContainer } from './Content.styled'

type TProps = {}

export const Content: FunctionComponent<TProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const containerRef = ref.current
    let oldScroll = 0

    const handleScroll = (e: any) => {
      if (e.target.scrollTop < oldScroll) {
        setShowSidebar(true)
      } else {
        setShowSidebar(false)
      }

      oldScroll = e.target.scrollTop
    }

    containerRef.addEventListener('scroll', handleScroll)

    return () => containerRef.removeEventListener('scroll', handleScroll)
  }, [ref])

  return (
    <StyledContainer ref={ref}>
      {children}
      <TextEditor showSidebar={showSidebar} />
    </StyledContainer>
  )
}

export type TContentProps = TProps
