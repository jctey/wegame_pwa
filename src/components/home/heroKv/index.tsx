import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { homePageId } from '../../../data/homePages.ts'
import { usePageOn } from '../../../providers/homePager.tsx'
import { paths } from '../../../app/router/paths.ts'
import { heroContent } from '../../../data/hero.ts'
import { ActionButton } from '../../shared/ActionButton.tsx'
import { DownGuideIcon } from '../../shared/icon/DownGuideIcon.tsx'
import { DownloadIcon } from '../../shared/icon/DownloadIcon.tsx'
import { UndevelopedDialog } from '../../shared/UndevelopedDialog.tsx'
import {
  kvEnterTimes,
  kvEnterTransition,
  kvHoldUntil,
  kvLightHoldUntil,
} from './motion.ts'

// 手机：在顶栏（h-16）以下的可见区居中。平板起贴底，底距不小于引导箭头所占高度。
const kvStackClass =
  'absolute inset-x-0 top-[calc(50%_+_2rem)] z-20 flex -translate-y-1/2 flex-col items-center gap-[max(1.5rem,3.2vw)] md:top-auto md:bottom-[max(6.25vw,5vh_+_4rem)] md:translate-y-0'

const sloganClass = 'pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat'

type VideoStatus = 'loading' | 'ready' | 'empty' | 'error'

const noticeLabel: Record<Exclude<VideoStatus, 'ready'>, string> = {
  loading: heroContent.loadingLabel,
  empty: heroContent.emptyLabel,
  error: heroContent.errorLabel,
}

const pageId = homePageId.kv

// 手机（<768）不播放背景视频。与 Tailwind md 断点一致。
const tabletQuery = '(min-width: 48rem)'

const downloadOffset = '0.75rem'

export function HeroKv() {
  const on = usePageOn(pageId)
  const run = !useReducedMotion()
  const hasVideo = heroContent.videoSrc.length > 0
  const [tabletUp, setTabletUp] = useState(() => window.matchMedia(tabletQuery).matches)
  const showVideo = hasVideo && tabletUp
  const [status, setStatus] = useState<VideoStatus>(hasVideo ? 'loading' : 'empty')
  const [attempt, setAttempt] = useState(0)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const media = window.matchMedia(tabletQuery)
    const onChange = () => {
      setTabletUp(media.matches)
      if (media.matches && hasVideo) {
        setStatus('loading')
      }
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [hasVideo])

  function onReady() {
    setStatus('ready')
    if (!run) {
      videoRef.current?.pause()
    }
  }

  const enterTransition = {
    ...kvEnterTransition(run),
    times: run ? kvEnterTimes(kvHoldUntil) : undefined,
  }

  const lightTransition = {
    ...kvEnterTransition(run),
    times: run ? kvEnterTimes(kvLightHoldUntil) : undefined,
  }

  return (
    <section
      id={pageId}
      data-on={on || undefined}
      className="full-page-section grid aspect-[16/9] w-full overflow-hidden md:aspect-auto md:min-h-svh"
    >
      <div className="kv-bg relative col-start-1 row-start-1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,#3c4148_0%,#1a1c20_46%,#0c0c0e_82%)]" />
        {showVideo ? (
          <video
            ref={videoRef}
            key={attempt}
            className={`absolute inset-0 size-full object-cover ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
            src={heroContent.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedData={onReady}
            onError={() => setStatus('error')}
          />
        ) : null}
      </div>
      <div className="kv-main relative z-10 col-start-1 row-start-1 h-full">
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] md:block"
          initial={run ? { y: '-140vh' } : { y: 0 }}
          animate={run ? { y: ['-140vh', '-140vh', 0] } : { y: 0 }}
          transition={lightTransition}
        >
          <div className="size-full bg-black/30" />
          <div className="absolute -bottom-10 -left-[28%] aspect-[2376/700] w-[170%] bg-[url('/images/kv/kv-light.svg')] bg-contain bg-no-repeat md:-bottom-[15.625vw] md:-left-[15%] md:w-[130%]" />
          <div className="absolute bottom-0 -left-[20%] aspect-[1920/635] w-[220%] bg-[url('/images/kv/kv-code.svg')] bg-contain bg-no-repeat md:-bottom-[15.625vw] md:left-0 md:aspect-auto md:h-[45vw] md:w-full" />
        </motion.div>
        {status === 'ready' || (hasVideo && !tabletUp) ? null : (
          <VideoNotice
            status={status}
            onRetry={() => {
              setStatus('loading')
              setAttempt((current) => current + 1)
            }}
          />
        )}
        <h1 className="sr-only">
          {heroContent.title} {heroContent.version}
        </h1>
        <div className={kvStackClass}>
          <div className="relative aspect-[1024/160] w-[88%] md:w-[64vw] xl:w-[53.333vw]" aria-hidden="true">
            <motion.div
              className={`${sloganClass} bg-[url('/images/kv/slogan-2.svg')]`}
              initial={run ? { opacity: 1 } : { opacity: 0 }}
              animate={run ? { opacity: [1, 1, 0] } : { opacity: 0 }}
              transition={enterTransition}
            />
            <motion.div
              className={`${sloganClass} bg-[url('/images/kv/slogan-1.svg')]`}
              initial={run ? { opacity: 0 } : { opacity: 1 }}
              animate={run ? { opacity: [0, 0, 1] } : { opacity: 1 }}
              transition={enterTransition}
            />
          </div>
          <motion.div
            className="hidden md:flex"
            initial={run ? { opacity: 0, y: downloadOffset } : { opacity: 1, y: 0 }}
            animate={run ? { opacity: [0, 0, 1], y: [downloadOffset, downloadOffset, 0] } : { opacity: 1, y: 0 }}
            transition={enterTransition}
          >
            <ActionButton
              label={heroContent.actionLabel}
              icon={<DownloadIcon />}
              variant="custom-1"
              className="min-w-[max(13.542vw,10rem)] whitespace-nowrap py-6"
              onClick={() => setNoticeOpen(true)}
            />
          </motion.div>
        </div>
        <DownGuideIcon
          motionRun={run}
          className="absolute bottom-[5vh] left-1/2 z-20 -translate-x-1/2 hidden md:block"
        />
      </div>
      <UndevelopedDialog open={noticeOpen} onClose={() => setNoticeOpen(false)} />
    </section>
  )
}

function VideoNotice({ status, onRetry }: { status: Exclude<VideoStatus, 'ready'>; onRetry: () => void }) {
  return (
    <div className="absolute left-4 top-20 z-10 rounded bg-black/45 px-2 py-1 text-xs text-white/70 md:top-24">
      <p>{noticeLabel[status]}</p>
      {status === 'loading' ? null : (
        <p className="mt-1 flex gap-3">
          {status === 'error' ? (
            <button type="button" className="focus-ring" onClick={onRetry}>
              重试
            </button>
          ) : null}
          <Link to={paths.home} className="focus-ring">
            返回首页
          </Link>
        </p>
      )}
    </div>
  )
}