import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 200, exception?: T): [T, boolean, boolean] => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [isDebouncing, setIsDebouncing] = useState(false)
  const [isFirstDebouncing, setIsFirstDebouncing] = useState(true)

  useEffect(() => {
    if (exception !== undefined && value === exception) {
      setDebouncedValue(value)
      setIsDebouncing(false)
      setIsFirstDebouncing(false)
    } else {
      setIsDebouncing(true)

      const handler = setTimeout(() => {
        setDebouncedValue(value)
        setIsDebouncing(false)

        if (value) {
          setIsFirstDebouncing(false)
        }
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }
  }, [delay, exception, value])

  return [debouncedValue, isDebouncing, isFirstDebouncing]
}

export const useDebounceBoolean = (
  value: boolean,
  delay?: number,
  exception?: boolean,
): [boolean, boolean, boolean] => useDebounce<boolean>(value, delay, exception)

export const useDebounceNumber = (value: number, delay?: number): [number, boolean, boolean] =>
  useDebounce<number>(value, delay)

export const useDebounceString = (value: string, delay?: number): [string, boolean, boolean] =>
  useDebounce<string>(value, delay)
