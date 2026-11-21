/**
 * 助手整屏：桌面一轮播，手机/平板纵向四块（入场 + 三个 Tab）。
 *
 * - useIsDesktop：≥1200 与整页滚轮同断点
 * - playing：桌面=当前屏；窄屏=区块滚进视口（只管动效，窄屏内容始终挂载）
 */
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { homePageId } from '../../../data/homePages.ts'
import { useIsDesktop } from '../../../hooks/useFullPageScroll.ts'
import { usePagePlaying } from '../../../hooks/usePagePlaying.ts'
import { usePageOn } from '../../../providers/homePager.tsx'
import { FrameInit } from './frameInit.tsx'
import { AssistantSlider } from './slider/index.tsx'
import { TabPanel } from './slider/tabPanel.tsx'
import { assistantTabConfigs } from './slider/tabConfigs.ts'
import { assistantTabs, type AssistantTabId } from './slider/tabBar.tsx'

type Phase = 'init' | 'slider'

/** 入场播完后稍停再切 slider */
const initHoldMs = 200

const sectionBaseClass =
  'full-page-section grid w-full bg-ink [--start-team-delay:0s] [--start-team-base:0.8s] [--start-feature-title:0.6s] [--start-feature-member:0.3s] [--clip-1:30%] [--clip-2:70%] [--animation-cezier:cubic-bezier(.64,1.15,.63,1.06)]'

/** 窄屏每一块高度：手机固定高（aspect 会按屏宽拉高，盖掉 min-h） */
const stackRowClass =
  'relative h-[14rem] w-full overflow-hidden md:h-auto md:min-h-[min(70svh,40rem)]'

export function SectionAssistant() {
  const isDesktop = useIsDesktop()
  const on = usePageOn(homePageId.assistant)
  const [sectionRef, playing] = usePagePlaying(homePageId.assistant)
  const reducedMotion = useReducedMotion()
  const run = playing && !reducedMotion
  const [phase, setPhase] = useState<Phase>('init')
  const playingRef = useRef(playing)
  const sliderTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  playingRef.current = playing

  const clearSliderTimer = () => {
    if (sliderTimerRef.current !== undefined) {
      clearTimeout(sliderTimerRef.current)
      sliderTimerRef.current = undefined
    }
  }

  useEffect(() => () => clearSliderTimer(), [])

  useEffect(() => {
    if (!isDesktop || !playing) {
      setPhase('init')
      clearSliderTimer()
      return
    }
    if (reducedMotion) {
      clearSliderTimer()
      setPhase('slider')
    }
  }, [isDesktop, playing, reducedMotion])

  const showSlider = isDesktop && playing && phase === 'slider'

  return (
    <section
      ref={sectionRef}
      id={homePageId.assistant}
      data-on={on || undefined}
      aria-label="助手"
      className={`${sectionBaseClass} ${
        isDesktop
          ? 'aspect-[6/5] overflow-hidden md:aspect-auto xl:min-h-svh'
          : 'aspect-auto overflow-visible'
      }`}
    >
      {isDesktop ? (
        // 桌面：单屏内 入场 → 底栏三 Tab 轮播（仅当前屏时播放）
        playing ? (
          <>
            <div
              className={`absolute inset-0 z-[3] transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                showSlider ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <AssistantSlider autoPlay={showSlider} motionRun={showSlider} />
            </div>
            {!showSlider ? (
              <FrameInit
                run={run}
                onComplete={() => {
                  clearSliderTimer()
                  sliderTimerRef.current = setTimeout(() => {
                    sliderTimerRef.current = undefined
                    if (playingRef.current) setPhase('slider')
                  }, initHoldMs)
                }}
              />
            ) : null}
          </>
        ) : null
      ) : (
        // 手机/平板：四段长页，无 slider、无自动切 tab
        <div className="relative z-[3] flex w-full flex-col">
          <section aria-label="助手入场" className={stackRowClass}>
            <FrameInit run={run} />
          </section>
          {assistantTabs.map(({ id, label }) => (
            <section key={id} aria-label={label} className={stackRowClass}>
              <TabPanel
                config={assistantTabConfigs[id as AssistantTabId]}
                motionRun={playing}
              />
            </section>
          ))}
        </div>
      )}
    </section>
  )
}