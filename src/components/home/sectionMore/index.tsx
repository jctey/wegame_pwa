import { useReducedMotion } from 'motion/react'
import { homePageId } from '../../../data/homePages.ts'
import { usePagePlaying } from '../../../hooks/usePagePlaying.ts'
import { usePageOn } from '../../../providers/homePager.tsx'
import { Footer } from '../../layout/Footer.tsx'
import { MoreBg } from './bgMore.tsx'

const pageId = homePageId.more

export function SectionMore() {
  const on = usePageOn(pageId)
  const [sectionRef, playing] = usePagePlaying<HTMLDivElement>(pageId)
  const reducedMotion = useReducedMotion() === true
  const scrollActive = playing && !reducedMotion

  return (
    <div
      ref={sectionRef}
      id={pageId}
      data-on={on || undefined}
      className="full-page-section flex flex-col bg-ink [--content-w:88vw] md:[--content-w:80vw] xl:[--content-w:70vw]"
    >
      <section
        aria-labelledby="more-section-title"
        className="relative min-h-[max(22rem,calc(100vw*5/6))] flex-1 overflow-hidden md:min-h-[min(70svh,40rem)] xl:min-h-0"
      >
        <MoreBg active={scrollActive} />
      </section>
      <Footer />
    </div>
  )
}