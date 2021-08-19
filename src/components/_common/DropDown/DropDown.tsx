import React, { FunctionComponent, useRef, useState } from 'react'
import { StyledChevron, StyledContainer } from './Dropdown.styled'

import ChevronDownIcon from '@src/assets/icons/chevron-down.svg'
import { useClickOutside } from '@src/utils/hooks/useClickOutside'
import { useEffect } from 'react'
import { ReactElement } from 'react'
import { Drop, DropProps } from './Drop'
import { Flex } from '@src/components/core'

type TProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  header: ReactElement
  withChevron?: boolean
} & Omit<DropProps, 'dropTarget'>

export const DropDown: FunctionComponent<TProps> = ({
  isOpen,
  onOpenChange,
  header,
  children,
  withChevron = false,
  ...props
}) => {
  const [isDropShow, setIsDropShow] = useState(isOpen)

  const containerRef = useRef<HTMLDivElement>(null)

  const { clickedOutside } = useClickOutside(containerRef)

  useEffect(() => {
    setIsDropShow(isOpen)
  }, [isOpen, setIsDropShow])

  useEffect(() => {
    if (clickedOutside) {
      onOpenChange(false)
    }
  }, [clickedOutside, onOpenChange])

  return (
    <StyledContainer forwardRef={containerRef} justify="center" position="relative">
      <Flex align="center" justify="center" onClick={() => onOpenChange(!isDropShow)}>
        {header}
        {withChevron && (
          <StyledChevron>
            <ChevronDownIcon />
          </StyledChevron>
        )}
      </Flex>
      {containerRef.current && isDropShow && (
        <Drop {...props} dropTarget={containerRef.current}>
          {children}
        </Drop>
      )}
    </StyledContainer>
  )
}

export type TDropDownProps = TProps
