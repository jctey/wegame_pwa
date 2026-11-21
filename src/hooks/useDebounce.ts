// const search = useDebouncedCallback((keyword: string) => run(keyword), 300)
// const keyword = useDebouncedValue(input, 300)

import { useEffect, useMemo, useRef, useState } from 'react'
import { debounce, type Debounced } from '../utils/debounce.ts'

export function useDebouncedCallback<Args extends readonly unknown[]>(
  callback: (...args: Args) => void,
  wait: number,
): Debounced<Args> {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const debounced = useMemo(
    () => debounce((...args: Args) => callbackRef.current(...args), wait),
    [wait],
  )

  useEffect(() => {
    return () => {
      debounced.cancel()
    }
  }, [debounced])

  return debounced
}

export function useDebouncedValue<T>(value: T, wait: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
    }, wait)
    return () => {
      clearTimeout(timer)
    }
  }, [value, wait])

  return debounced
}
