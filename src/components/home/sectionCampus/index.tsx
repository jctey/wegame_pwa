import { useReducedMotion } from 'motion/react'
import { homePageId } from '../../../data/homePages.ts'
import { useIsDesktop } from '../../../hooks/useFullPageScroll.ts'
import { usePagePlaying } from '../../../hooks/usePagePlaying.ts'
import { usePageOn } from '../../../providers/homePager.tsx'
import { CampusBg } from './bgCampus.tsx'
import { CampusContent } from './campusContent.tsx'

const sectionBaseClass =
  'full-page-section grid w-full bg-ink [--content-w:88vw] md:[--content-w:80vw] xl:[--content-w:80vw]'

/** 高校整屏：背景 campus/bg.svg；前景短句等待后续补全。 */
export function SectionCampus() {
  const isDesktop = useIsDesktop()
  const on = usePageOn(homePageId.campus)
  const [sectionRef, playing] = usePagePlaying(homePageId.campus)
  const reducedMotion = useReducedMotion() === true
  const motionRun = playing && !reducedMotion

  return (
    <section
      ref={sectionRef}
      id={homePageId.campus}
      data-on={on || undefined}
      aria-label="高校"
      className={`${sectionBaseClass} ${
        isDesktop
          ? 'aspect-[6/5] overflow-hidden md:aspect-auto md:min-h-svh'
          : 'aspect-auto min-h-[max(22rem,calc(100vw*5/6))] overflow-visible md:min-h-[min(70svh,40rem)]'
      }`}
    >
      <CampusBg />
      <CampusContent motionRun={motionRun} isDesktop={isDesktop} />
    </section>
  )
}