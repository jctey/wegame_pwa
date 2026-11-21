import { useEffect, useRef, useState } from 'react'
import { TabPanel } from './tabPanel.tsx'
import { assistantTabConfigs } from './tabConfigs.ts'
import { assistantTabs, AssistantTabBar, type AssistantTabId } from './tabBar.tsx'

const autoTabMs = 450000

type AssistantSliderProps = {
  /** slider 可见时每隔 autoTabMs 自动切下一 tab（循环）。 */
  autoPlay?: boolean
  /** init 预挂载时为 false，避免入场在隐藏时播完。 */
  motionRun?: boolean
}

export function AssistantSlider({
  autoPlay = false,
  motionRun = false,
}: AssistantSliderProps) {
  const [active, setActive] = useState(0)
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const tabCount = assistantTabs.length
  const current = assistantTabs[active]
  const tabId = current.id as AssistantTabId

  const clearAutoTabTimer = () => {
    if (autoTimerRef.current !== undefined) {
      clearTimeout(autoTimerRef.current)
      autoTimerRef.current = undefined
    }
  }

  useEffect(() => () => clearAutoTabTimer(), [])

  useEffect(() => {
    clearAutoTabTimer()
    if (!autoPlay) return

    autoTimerRef.current = setTimeout(() => {
      autoTimerRef.current = undefined
      setActive((i) => (i + 1) % tabCount)
    }, autoTabMs)

    return clearAutoTabTimer
  }, [autoPlay, active, tabCount])

  return (
    <div className="absolute inset-0 z-[3] flex min-h-0 flex-col bg-ink">
      <div
        className="flex min-h-0 flex-1 items-stretch justify-center overflow-hidden"
        role="tabpanel"
        id={`assistant-panel-${current.id}`}
        aria-labelledby={`assistant-tab-${current.id}`}
      >
        <TabPanel
          key={motionRun ? tabId : `${tabId}-hold`}
          config={assistantTabConfigs[tabId]}
          motionRun={motionRun}
        />
      </div>

      <AssistantTabBar active={active} onChange={setActive} />
    </div>
  )
}