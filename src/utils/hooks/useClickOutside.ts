import React, { useState } from 'react'
import { useEffect } from 'react'

export const useClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  refsToExclude?: (HTMLElement | null)[],
): { clickedOutside: boolean } => {
  const [clickedOutside, setClickedOutside] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
      const elementClickedIsExclude = (refsToExclude || []).find(refToExclude =>
        refToExclude?.contains(event.target as any),
      )

      if (ref.current && !ref.current.contains(event.target as any) && !elementClickedIsExclude) {
        setClickedOutside(true)
      } else {
        setClickedOutside(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside as any)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any)
    }
  }, [ref, refsToExclude])

  return {
    clickedOutside,
  }
}
