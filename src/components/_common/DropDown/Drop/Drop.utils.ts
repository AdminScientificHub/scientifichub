import React from 'react'

export const useCombinedRefs = (
  ...refs: (React.Ref<HTMLElement | null> | undefined)[]
): React.MutableRefObject<HTMLInputElement | null> => {
  const targetRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    const filteredRefs = refs.filter(ref => ref) as React.Ref<HTMLInputElement | null>[]

    filteredRefs.forEach((ref: React.Ref<HTMLInputElement | null>) => {
      if (!ref) {
        return
      }

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        // eslint-disable-next-line prettier/prettier
        ;(ref.current as HTMLInputElement | null) = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

export const findVisibleParent = (element: HTMLElement | null): HTMLElement | undefined => {
  if (element) {
    return element.offsetParent ? element : findVisibleParent(element.parentElement) || element
  }
  return undefined
}

export const findScrollParents = (element: Element, horizontal?: true) => {
  const result = []
  if (element) {
    let parent = element.parentNode as Element
    while (parent && parent.getBoundingClientRect) {
      const rect = parent.getBoundingClientRect()
      // 10px is to account for borders and scrollbars in a lazy way
      if (horizontal) {
        if (rect.width && parent.scrollWidth > rect.width + 10) {
          result.push(parent)
        }
      } else if (rect.height && parent.scrollHeight > rect.height + 10) {
        result.push(parent)
      }
      parent = parent.parentNode as Element
    }
    // last scrollable element will be the document
    // if nothing else is scrollable in the page
    if (result.length === 0) {
      result.push(document)
    } else if (result[0].tagName.toLowerCase() === 'body') {
      result.length = 0
      result.push(document)
    }
  }
  return result
}

type HorizontalAlign = 'left' | 'right'
type VerticalAlign = 'top' | 'bottom'

export type TAlign = {
  bottom?: VerticalAlign
  top?: VerticalAlign
  left?: HorizontalAlign
  right?: HorizontalAlign
}

interface Inputs {
  container: HTMLDivElement
  align: TAlign
  target: HTMLElement
  targetMargin?: number
  stretch?: boolean // TODO: add to component props
  preserveHeight?: boolean
  responsive?: boolean
  fitTarget: boolean
  maxHeight?: number
}

// We try to preserve the maxHeight as changing it causes any scroll position
// to be lost. We set the maxHeight on mount and if the window is resized.
export const placeDropContainer = ({
  container,
  preserveHeight,
  align,
  target,
  stretch,
  responsive,
  targetMargin = 4,
  fitTarget,
  maxHeight: propsMaxHeight,
}: Inputs): void => {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if (container && target) {
    // clear prior styling
    container.style.left = ''
    container.style.top = ''
    container.style.bottom = ''
    container.style.width = ''
    // get bounds
    const targetRect = findVisibleParent(target)?.getBoundingClientRect() || new DOMRect()
    const containerRect = container.getBoundingClientRect()
    // determine width

    const width = fitTarget
      ? targetRect.width
      : Math.min(
          stretch ? Math.max(targetRect.width, containerRect.width) : containerRect.width,
          windowWidth,
        )

    // set left position
    let left: number | null = 0
    if (align.left) {
      if (align.left === 'left') {
        ;({ left } = targetRect)

        left = targetRect.left + targetMargin
      } else if (align.left === 'right') {
        left = targetRect.left + targetRect.width + targetMargin
      }
    } else if (align.right) {
      if (align.right === 'left') {
        left = targetRect.left - width + targetMargin
      } else if (align.right === 'right') {
        left = targetRect.left + targetRect.width - width
      }
    } else {
      left = targetRect.left + targetRect.width / 2 - width / 2
    }
    if (left + width > windowWidth) {
      left -= left + width - windowWidth
    } else if (left < 0) {
      left = 0
    }

    // set top or bottom position
    let top: number | null = null
    let bottom: number | null = null
    let maxHeight = containerRect.height

    if (align.top) {
      if (align.top === 'top') {
        ;({ top } = targetRect)
      } else {
        top = targetRect.bottom + targetMargin
      }

      // Calculate visible area underneath the control w.r.t window height
      const percentVisibleAreaBelow = 100 - (targetRect.bottom / windowHeight) * 100

      // Check whether it is within 20% from bottom of the window or visible
      // area to flip the control
      // DropContainer doesn't fit well within visible area when
      // percentVisibleAreaBelow value<=20%
      // There is enough space from DropContainer to bottom of the window
      // when percentVisibleAreaBelow>20%.

      if (windowHeight === top || percentVisibleAreaBelow <= 20) {
        // We need more room than we have.
        // We put it below, but there's more room above, put it above
        top = null
        if (align.top === 'bottom') {
          bottom = targetRect.top
        } else {
          ;({ bottom } = targetRect)
        }
        maxHeight = bottom
        container.style.maxHeight = `${maxHeight}px`
      } else if (top > 0) {
        maxHeight = windowHeight - top
        container.style.maxHeight = `${maxHeight}px`
      } else {
        maxHeight = windowHeight - top
      }
    } else if (align.bottom) {
      if (align.bottom === 'bottom') {
        ;({ bottom } = targetRect)
      } else {
        bottom = targetRect.top + targetMargin
      }
      maxHeight = bottom
      container.style.maxHeight = `${maxHeight}px`
    } else {
      // center
      top = targetRect.top + targetRect.height / 2 - containerRect.height / 2
      maxHeight = windowHeight - top
    }
    // if we can't fit it all, or we're rather close,
    // see if there's more room the other direction
    if (responsive && (containerRect.height > maxHeight || maxHeight < windowHeight / 10)) {
      // We need more room than we have.
      if (align.top && top && top > windowHeight / 2) {
        // We put it below, but there's more room above, put it above
        top = null
        if (align.top === 'bottom') {
          // top = Math.max(targetRect.top - containerRect.height, 0);
          // maxHeight = targetRect.top - top;
          bottom = targetRect.top
        } else {
          // top = Math.max(targetRect.bottom - containerRect.height, 0);
          // maxHeight = targetRect.bottom - top;
          ;({ bottom } = targetRect)
        }
        maxHeight = bottom
      } else if (align.bottom && maxHeight < windowHeight / 2) {
        // We put it above but there's more room below, put it below
        bottom = null
        if (align.bottom === 'bottom') {
          ;({ top } = targetRect)
        } else {
          top = targetRect.bottom
        }
        maxHeight = windowHeight - top
      }
    }
    container.style.left = `${left}px`

    if (stretch) {
      // offset width by 0.1 to avoid a bug in ie11 that
      // unnecessarily wraps the text if width is the same
      // NOTE: turned off for now
      container.style.width = `${width + 0.1}px`
    }
    // the (position:absolute + scrollTop)
    // is presenting issues with desktop scroll flickering
    if (top !== null) {
      container.style.top = `${top}px`
    }
    if (bottom !== null) {
      container.style.bottom = `${windowHeight - bottom}px`
    }

    if (!preserveHeight) {
      // TODO
      // if (theme.drop && theme.drop.maxHeight) {
      //   maxHeight = Math.min(maxHeight, parseMetricToNum(theme.drop.maxHeight))
      // }
      container.style.maxHeight = `${maxHeight}px`
    }

    // If a maxHeight is explicitly passed in props, set it if smaller than previously computed maxHeight
    if (propsMaxHeight) {
      if (!container.style.maxHeight) {
        container.style.maxHeight = `${propsMaxHeight}px`
      } else {
        if (container.style.maxHeight.includes('px')) {
          maxHeight = Math.min(propsMaxHeight, parseInt(container.style.maxHeight, 10))
          container.style.maxHeight = `${maxHeight}px`
        } else if (container.style.maxHeight.includes('rem')) {
          // TODO: Handle other cases (rem, etc...)
        }
      }
    }
  }
}
