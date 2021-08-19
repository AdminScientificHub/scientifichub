import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { StyledContainer } from './Drop.styled'

import { findScrollParents, placeDropContainer, TAlign, useCombinedRefs } from './Drop.utils'

export type DropProps = {
  dropTarget: HTMLElement
  onClickOutside?: () => void
  onEsc?: () => void
  targetMargin?: number
  fitTarget?: boolean
  forwardRef?: React.Ref<HTMLDivElement>
  dropAlign?: TAlign
  stretch?: boolean
}

export const Drop: FunctionComponent<DropProps> = ({
  dropAlign = {
    top: 'bottom',
    left: 'left',
  },
  onClickOutside,
  dropTarget,
  children,
  targetMargin,
  fitTarget = false,
  forwardRef,
  stretch = true,
  ...rest
}) => {
  const dropRef = useRef<HTMLDivElement | null>(
    forwardRef && typeof forwardRef !== 'function' ? forwardRef.current : null,
  )

  const combinedDropRef = useCombinedRefs(forwardRef, dropRef)

  const onClickDocument = useCallback(
    (event: MouseEvent) => {
      const dropTargetNode = dropTarget
      const dropNode = combinedDropRef.current
      const eventTarget = event.target as Node
      if (
        onClickOutside &&
        dropNode && // need this for ie11
        !dropTargetNode.contains(eventTarget) &&
        !dropNode.contains(eventTarget)
      ) {
        onClickOutside()
      }
    },
    [dropTarget, onClickOutside, combinedDropRef],
  )

  const scrollParents = useRef<(Element | Document | DocumentFragment)[]>([])
  const place = useCallback(
    (preserveHeight: boolean): void => {
      if (!combinedDropRef.current) {
        return
      }

      return placeDropContainer({
        container: combinedDropRef.current,
        align: dropAlign,
        target: dropTarget,
        preserveHeight,
        targetMargin,
        fitTarget,
        stretch,
      })
    },
    [dropAlign, dropTarget, fitTarget, targetMargin, combinedDropRef, stretch],
  )

  const scrollPlace = useCallback(() => {
    if (!combinedDropRef.current) {
      return
    }

    return placeDropContainer({
      container: combinedDropRef.current,
      align: dropAlign,
      target: dropTarget,
      preserveHeight: true,
      targetMargin,
      fitTarget,
      stretch,
    })
  }, [dropAlign, dropTarget, fitTarget, targetMargin, combinedDropRef, stretch])

  const addScrollListener = useCallback(() => {
    scrollParents.current = findScrollParents(dropTarget)
    scrollParents.current.forEach(scrollParent =>
      scrollParent.addEventListener('scroll', scrollPlace),
    )
  }, [dropTarget, scrollPlace])

  const removeScrollListener = useCallback(() => {
    scrollParents.current.forEach(scrollParent =>
      scrollParent.removeEventListener('scroll', scrollPlace),
    )
  }, [scrollParents, scrollPlace])

  const onResize = useCallback(() => {
    removeScrollListener()
    addScrollListener()
    place(false)
  }, [removeScrollListener, addScrollListener, place])

  useEffect(() => {
    document.addEventListener('mousedown', onClickDocument)
    window.addEventListener('resize', onResize)
    addScrollListener()

    place(true)
    return () => {
      document.removeEventListener('mousedown', onClickDocument)
      window.removeEventListener('resize', onResize)
      removeScrollListener()
    }
  }, [onClickDocument, onResize, addScrollListener, place, removeScrollListener])

  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      place(false)
    }
  })

  return (
    <StyledContainer ref={combinedDropRef} {...rest}>
      {children}
    </StyledContainer>
  )
}
