import { motion, useReducedMotion } from 'motion/react'
import { topicPosters } from '../../../data/gameCarousel.ts'
import { homePageId } from '../../../data/homePages.ts'
import { usePagePlaying } from '../../../hooks/usePagePlaying.ts'
import { usePageOn } from '../../../providers/homePager.tsx'
import {
  topicSlideTimes,
  topicSlideTransition,
  topicSlideY,
} from './motion.ts'

const pageId = homePageId.games

const topicFrames = [
  '/images/gameCarousel/search1.svg',
  '/images/gameCarousel/search2.svg',
  '/images/gameCarousel/search3.svg',
] as const

const topicBg =
  "absolute -top-[24vw] h-[98vw] w-[60vw] bg-[url('/images/gameCarousel/bg.svg')] bg-contain bg-no-repeat"

// 海报宽度单位、海报纵向位移单位、切换按钮宽度。手机这一屏是正方形，纵向按 vw 算。
const sizeVars =
  '[--poster-w:1.6vw] [--poster-y:1vw] [--switch-w:max(18vw,10rem)] md:[--poster-w:1.3vw] md:[--poster-y:1vh] xl:[--poster-w:1vw]'

// 桌面距顶 10vw；更窄时贴在切换按钮上方，不会被顶栏盖住，也不会离按钮太远。
const titleStackClass =
  'absolute bottom-[calc(50%_+_var(--switch-w)*0.125_+_1.25rem)] left-1/2 z-10 flex w-[88%] -translate-x-1/2 flex-col md:w-[72vw] xl:top-[10vw] xl:bottom-auto xl:w-[min(100%,62vw)]'

const posterBase =
  'absolute top-1/2 left-1/2 aspect-[380/500] overflow-hidden'

export function GameCarousel() {
  const on = usePageOn(pageId)
  const reducedMotion = useReducedMotion() === true
  const [sectionRef, playing] = usePagePlaying(pageId)
  const runMotion = playing && !reducedMotion

  return (
    <section
      ref={sectionRef}
      id={pageId}
      data-on={on || undefined}
      aria-label="大作云集"
      className={`full-page-section grid aspect-square w-full overflow-hidden bg-ink md:aspect-auto md:min-h-svh ${sizeVars}`}
    >
      <div aria-hidden="true" className="bg pointer-events-none relative col-start-1 row-start-1">
        <div className={topicBg} />
        <div className={`${topicBg} -right-[5vw] -scale-x-100`} />
      </div>

      <div className="main relative z-10 col-start-1 row-start-1 h-full md:min-h-svh">
        <TopicList playing={playing} reducedMotion={reducedMotion} />
        <div className={titleStackClass}>
          <img src="/images/gameCarousel/section-title.svg" alt="" className="w-full" />
          <img src="/images/gameCarousel/section-subtitle.svg" alt="" className="-mt-[0.32%] w-full" />
        </div>
        <TopicSwitch run={runMotion} />
      </div>
    </section>
  )
}

function TopicSwitch({ run }: { run: boolean }) {
  const frames = [...topicFrames, topicFrames[0]]

  return (
    <div
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 z-10 h-[calc(var(--switch-w)*0.25)] w-(--switch-w) -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-[#ff8f00] bg-black/80"
    >
      <motion.div
        className="absolute inset-x-0 top-0 flex w-full flex-col"
        initial={{ y: '0%' }}
        animate={run ? { y: [...topicSlideY] } : { y: '0%' }}
        transition={{
          ...topicSlideTransition(run),
          times: run ? [...topicSlideTimes] : undefined,
        }}
      >
        {frames.map((src, index) => (
          <div key={`${src}-${index}`} className="flex h-[calc(var(--switch-w)*0.25)] w-full shrink-0 items-center justify-center">
            <img src={src} alt="" className="h-[calc(var(--switch-w)*0.194)] w-[calc(var(--switch-w)*0.778)] object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function TopicList({ playing, reducedMotion }: { playing: boolean; reducedMotion: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {topicPosters.map((poster) => (
        <FlyingPoster
          key={poster.src}
          src={poster.src}
          size={poster.size}
          x={poster.x}
          y={poster.y}
          delay={poster.delay}
          playing={playing}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  )
}

function FlyingPoster({
  src,
  size,
  x,
  y,
  delay,
  playing,
  reducedMotion,
}: {
  src: string
  size: number
  x: number
  y: number
  delay: string
  playing: boolean
  reducedMotion: boolean
}) {
  const animatePoster = !reducedMotion

  return (
    <div
      className={`${posterBase} ${animatePoster ? 'animate-poster-out opacity-0' : 'opacity-0'}`}
      style={{
        width: `calc(${size} * var(--poster-w))`,
        ['--x' as string]: `${x}vw`,
        ['--y' as string]: `calc(${y} * var(--poster-y))`,
        animationDelay: delay,
        animationPlayState: playing ? 'running' : 'paused',
      }}
    >
      <img src={src} alt="" className="size-full object-cover" />
    </div>
  )
}