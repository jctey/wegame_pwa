// const onScroll = useThrottledCallback(() => sync(), 100)
// const offset = useThrottledValue(scrollTop, 100)

import { useEffect, useMemo, useRef, useState } from 'react'
import { throttle, type Throttled } from '../utils/throttle.ts'

export function useThrottledCallback<Args extends readonly unknown[]>(
  callback: (...args: Args) => void,
  wait: number,
): Throttled<Args> {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const throttled = useMemo(
    () => throttle((...args: Args) => callbackRef.current(...args), wait),
    [wait],
  )

  useEffect(() => {
    return () => {
      throttled.cancel()
    }
  }, [throttled])

  return throttled
}

export function useThrottledValue<T>(value: T, wait: number) {
  const [throttled, setThrottled] = useState(value)
  const update = useThrottledCallback(setThrottled, wait)

  useEffect(() => {
    update(value)
  }, [update, value])

  return throttled
}
