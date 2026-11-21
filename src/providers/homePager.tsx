import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { homePageId, homePages, type HomePageId } from '../data/homePages.ts'

// 首页当前屏。锚点在布局里，各屏在页面里，共用这一份。
const fadeMs = 500

type HomePagerValue = {
  activeId: HomePageId
  goTo: (id: HomePageId) => void
  step: (delta: number) => void
}

const HomePagerContext = createContext<HomePagerValue | null>(null)

export function HomePagerProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<HomePageId>(homePageId.kv)
  const activeRef = useRef<HomePageId>(homePageId.kv)
  const lockedRef = useRef(false)
  const timerRef = useRef(0)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  // 切到某一屏，并在淡入期间锁住滚轮。
  function go(id: HomePageId) {
    if (id === activeRef.current) {
      return
    }

    activeRef.current = id
    setActiveId(id)
    lockedRef.current = true
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      lockedRef.current = false
    }, fadeMs)
  }

  const value: HomePagerValue = {
    activeId,
    // 锚点点击：跳到指定屏。
    goTo(id) {
      go(id)
    },
    // 滚轮：1 下一屏，-1 上一屏。
    step(delta) {
      if (lockedRef.current || delta === 0) {
        return
      }

      const index = homePages.indexOf(activeRef.current)
      const next = homePages[Math.min(homePages.length - 1, Math.max(0, index + delta))]
      if (next) {
        go(next)
      }
    },
  }

  return <HomePagerContext.Provider value={value}>{children}</HomePagerContext.Provider>
}

export function useHomePager() {
  const value = useContext(HomePagerContext)
  if (!value) {
    throw new Error('useHomePager must be used within HomePagerProvider')
  }
  return value
}

// 这一屏是不是当前屏，用来淡入。
export function usePageOn(id?: HomePageId) {
  const { activeId } = useHomePager()
  return id !== undefined && activeId === id
}
