import { useEffect, useRef, useSyncExternalStore } from 'react'

// 桌面（≥1200px）滚轮一次切一屏。更窄的宽度不处理。
export const desktopQuery = '(min-width: 75rem)'

function isDesktop() {
  return window.matchMedia(desktopQuery).matches
}

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(desktopQuery)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/** 与整页滚轮同一断点：≥1200 为桌面，以下为手机+平板。 */
export function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, isDesktop, () => false)
}

// 搜索下拉自己能滚时，不切屏。
function inNestedScroller(target: EventTarget | null, scroller: HTMLElement) {
  if (!(target instanceof Element)) {
    return false
  }

  let node: Element | null = target
  while (node && node !== scroller) {
    const overflowY = getComputedStyle(node).overflowY
    if (/(auto|scroll)/.test(overflowY) && node.scrollHeight > node.clientHeight + 1) {
      return true
    }
    node = node.parentElement
  }

  return false
}

export function useFullPageScroll(onStep: (delta: number) => void) {
  const ref = useRef<HTMLDivElement>(null)
  const onStepRef = useRef(onStep)
  onStepRef.current = onStep

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }
    const scroller: HTMLDivElement = node

    function onWheel(event: WheelEvent) {
      if (!isDesktop() || event.ctrlKey || inNestedScroller(event.target, scroller)) {
        return
      }

      event.preventDefault()
      if (event.deltaY === 0) {
        return
      }

      onStepRef.current(event.deltaY > 0 ? 1 : -1)
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      scroller.removeEventListener('wheel', onWheel)
    }
  }, [])

  return ref
}
