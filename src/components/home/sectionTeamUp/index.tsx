import { useReducedMotion } from 'motion/react'
import { homePageId } from '../../../data/homePages.ts'
import { useIsDesktop } from '../../../hooks/useFullPageScroll.ts'
import { usePagePlaying } from '../../../hooks/usePagePlaying.ts'
import { usePageOn } from '../../../providers/homePager.tsx'
import { TeamUpBg } from './bgTeamUp.tsx'
import { TeamTitle } from './teamTitle.tsx'

/**
 * 窄屏区块高：等同原 aspect-[6/5]（100vw×5/6），再与助手一样在 md 用 svh 下限。
 * @see sectionAssistant stackRowClass
 */
const teamStackRowClass =
  'relative flex h-[max(22rem,calc(100vw*5/6))] w-full flex-col items-center overflow-visible md:h-auto md:min-h-[min(70svh,40rem)]'

const sectionBaseClass =
  'full-page-section grid w-full bg-ink [--content-w:88vw] md:[--content-w:80vw] xl:[--content-w:70vw]'

const foregroundDesktopClass =
  'pointer-events-none absolute inset-0 z-10 flex flex-col items-center gap-[max(3vw,1.25rem)] pt-[max(5vw,5rem)] md:gap-[max(4vw,2rem)] md:pt-[max(5vw,6rem)] md:max-xl:justify-center md:max-xl:gap-[8vw]'

const foregroundMobileClass =
  'pointer-events-none relative z-10 flex min-h-[max(22rem,calc(100vw*5/6))] w-full flex-col items-center px-[6vw] pb-[max(3vw,1.25rem)] pt-[max(4vw,3rem)] md:min-h-[min(70svh,40rem)]'

/** 开黑整屏。入场流程见 motion.ts；背景 bgTeamUp，前景 teamTitle。 */
export function SectionTeamUp() {
  const isDesktop = useIsDesktop()
  const on = usePageOn(homePageId.team)
  const [sectionRef, playing] = usePagePlaying(homePageId.team)
  const reducedMotion = useReducedMotion() === true
  const runMotion = playing && !reducedMotion

  return (
    <section
      ref={sectionRef}
      id={homePageId.team}
      data-on={on || undefined}
      aria-label="开黑"
      className={`${sectionBaseClass} ${
        isDesktop
          ? 'aspect-[6/5] overflow-hidden md:aspect-auto md:min-h-svh'
          : 'aspect-auto min-h-[max(22rem,calc(100vw*5/6))] overflow-visible md:min-h-[min(70svh,40rem)]'
      }`}
    >
      <TeamUpBg motionRun={runMotion} />
      {isDesktop ? (
        <div className={foregroundDesktopClass}>
          <TeamTitle motionRun={runMotion} />
        </div>
      ) : (
        <div className={foregroundMobileClass}>
          <div className={teamStackRowClass}>
            <TeamTitle motionRun={runMotion} />
          </div>
        </div>
      )}
    </section>
  )
}