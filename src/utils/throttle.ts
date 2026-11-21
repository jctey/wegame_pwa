// 一段时间内最多执行一次。滚动、缩放用这个。
// const onScroll = throttle(() => sync(), 100)
// onScroll()
// onScroll.cancel()

import type { Debounced } from './debounce.ts'

export type Throttled<Args extends readonly unknown[]> = Debounced<Args>

export function throttle<Args extends readonly unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): Throttled<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined
  let last = 0
  let pending: Args | undefined

  const throttled: Throttled<Args> = (...args) => {
    const now = Date.now()
    pending = args
    const remain = wait - (now - last)

    if (remain <= 0) {
      clearTimeout(timer)
      timer = undefined
      last = now
      pending = undefined
      fn(...args)
      return
    }

    if (timer !== undefined) {
      return
    }

    timer = setTimeout(() => {
      last = Date.now()
      timer = undefined
      const next = pending
      pending = undefined
      if (next) {
        fn(...next)
      }
    }, remain)
  }

  throttled.cancel = () => {
    clearTimeout(timer)
    timer = undefined
    pending = undefined
  }

  return throttled
}
