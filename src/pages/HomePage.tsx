import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useHomePager } from '../providers/homePager.tsx'
import { paths } from '../app/router/paths.ts'
import { GameCarousel } from '../components/home/gameCarousel/index.tsx'
import { HeroKv } from '../components/home/heroKv/index.tsx'
import { SectionAssistant } from '../components/home/sectionAssistant/index.tsx'
import { SectionCampus } from '../components/home/sectionCampus/index.tsx'
import { SectionMore } from '../components/home/sectionMore/index.tsx'
import { SectionRefresh } from '../components/home/sectionRefresh/index.tsx'
import { RefreshAfterScroll } from '../components/home/sectionRefresh/refreshAfterScroll.tsx'
import { SectionTeamUp } from '../components/home/sectionTeamUp/index.tsx'
import { useFullPageScroll } from '../hooks/useFullPageScroll.ts'

const pageWrapClass =
  'relative xl:flex xl:items-center xl:before:pointer-events-none xl:before:absolute xl:before:top-20 xl:before:left-[calc(0.8*var(--nav-unit))] xl:before:z-[11] xl:before:h-[calc(100vh-80px)] xl:before:w-px xl:before:bg-white/10 xl:before:content-[""] xl:after:pointer-events-none xl:after:absolute xl:after:top-20 xl:after:right-[calc(0.8*var(--nav-unit))] xl:after:z-[11] xl:after:h-[calc(100vh-80px)] xl:after:w-px xl:after:bg-white/10 xl:after:content-[""]'

export function HomePage() {
  const { step } = useHomePager()
  const scrollerRef = useFullPageScroll(step)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.hash) {
      return
    }

    navigate({ pathname: paths.home, search: location.search }, { replace: true })
  }, [location.hash, location.search, navigate])

  return (
    <div className={pageWrapClass}>
      <div ref={scrollerRef} className="relative z-0 w-full xl:h-svh xl:overflow-hidden">
        <main>
          <HeroKv />
          <GameCarousel />
          <SectionRefresh />
          <RefreshAfterScroll />
          <SectionAssistant />
          <SectionTeamUp />
          <SectionCampus />
          <SectionMore />
        </main>
      </div>
    </div>
  )
}
