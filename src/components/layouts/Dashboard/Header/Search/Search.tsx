import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { StyledContainer, StyledInput } from './Search.styed'

import SearchIcon from '@src/assets/icons/search.svg'

type TProps = {}

export const HeaderSearch: FunctionComponent<TProps> = () => {
  const [isActive, setIsActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isActive, inputRef])

  // TODO
  return <div></div>

  return (
    <StyledContainer isActive={isActive} onClick={() => setIsActive(true)} align="center">
      <SearchIcon />
      <StyledInput
        placeholder="Search"
        ref={inputRef}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </StyledContainer>
  )
}

export type THeaderSearchhProps = TProps
