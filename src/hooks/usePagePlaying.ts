import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { HomePageId } from '../data/homePages.ts'
import { usePageOn } from '../providers/homePager.tsx'
import { desktopQuery } from './useFullPageScroll.ts'

// 首页区块是否播放入场动画。桌面整屏时各屏叠在一起，只看当前屏；平板和手机是长页，看区块是否露出视口。
export function usePagePlaying<T extends Element = HTMLElement>(id: HomePageId) {
  const on = usePageOn(id)
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktop)
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (desktop || !node) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), {
      threshold: 0.35,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [desktop])

  return [ref, desktop ? on : inView] as const
}

function isDesktop() {
  return window.matchMedia(desktopQuery).matches
}

function subscribeDesktop(onChange: () => void) {
  const media = window.matchMedia(desktopQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
