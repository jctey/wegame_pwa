import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { homePageId } from '../../../data/homePages.ts'
import { usePagePlaying } from '../../../hooks/usePagePlaying.ts'
import { usePageOn } from '../../../providers/homePager.tsx'
import { RefreshSideBg, refreshPlay } from './index.tsx'

const asset = (name: string) => `/images/refreshSection/${name}`

const videoSrc = '/videos/frame-mingchao.mp4'

type VideoStatus = 'loading' | 'ready' | 'error'

// 焕新第二屏：滚轮可达，不进侧栏，停留时侧栏仍高亮“焕新”。
export function RefreshAfterScroll() {
  const on = usePageOn(homePageId.refreshNext)
  const [sectionRef, playing] = usePagePlaying(homePageId.refreshNext)
  const reduced = useReducedMotion() === true
  const videoRef = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState<VideoStatus>('loading')
  const [attempt, setAttempt] = useState(0)

  // 只在本屏可见时播放；减少动态效果时停在首帧。
  useEffect(() => {
    const video = videoRef.current
    if (!video || status !== 'ready') {
      return
    }

    if (playing && !reduced) {
      video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [playing, reduced, status])

  return (
    <section
      ref={sectionRef}
      id={homePageId.refreshNext}
      data-on={on || undefined}
      aria-label="焕新"
      className="full-page-section grid aspect-[6/5] w-full overflow-hidden bg-ink [--frame-w:88vw] md:aspect-auto md:min-h-svh md:[--frame-w:80vw] xl:[--frame-w:70vw]"
    >
      <RefreshSideBg />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center gap-[0.1vw] pt-[max(5vw,5rem)] md:pt-[max(5vw,6rem)] md:max-xl:justify-center md:max-xl:gap-[8vw]"
      >
        <div className="relative z-20 w-[80vw] shrink-0 md:w-[min(100%,60vw)]">
          <img src={asset('section-title-refresh.svg')} alt="" className="block w-full" />
          <img
            src={asset('frame-refresh-subtitle.png')}
            alt=""
            className={`absolute top-full left-1/2 mt-[max(0.6vw,0.25rem)] w-[55%] max-w-full -translate-x-1/2 ${refreshPlay(
              playing,
              reduced,
              'animate-refresh-next-subtitle',
              'opacity-0',
              'opacity-100',
            )}`}
          />
        </div>

        {/* 主框：位置与焕新第一屏的商店窗口一致 */}
        <div className="relative z-0 flex min-h-0 w-full flex-1 items-end justify-center perspective-distant perspective-origin-center md:max-xl:bottom-[2vh] md:max-xl:flex-none">
          <div
            className={`relative max-h-full w-[min(100%,var(--frame-w))] rounded-t-[max(0.5rem,calc(var(--frame-w)*0.016))] rounded-b-none border border-white/20 bg-white/5 will-change-transform ${refreshPlay(
              playing,
              reduced,
              'animate-refresh-next-tilt',
              'refresh-next-tilt-held',
              'refresh-next-tilt-held',
            )}`}
          >
            {/* 视频垫在窗口透明区下面，范围按图上的窗口像素（27,27 到 2777,1600，图宽 2804×1600） */}
            <div className="absolute top-[1.69%] right-[0.96%] bottom-0 left-[0.96%] overflow-hidden rounded-t-[calc(var(--frame-w)*0.007)] bg-black">
              <video
                ref={videoRef}
                key={attempt}
                src={videoSrc}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                onLoadedData={() => setStatus('ready')}
                onError={() => setStatus('error')}
                className={`size-full object-cover transition-opacity duration-300 ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black ${
                  status === 'ready'
                    ? refreshPlay(playing, reduced, 'animate-refresh-next-gradient', 'opacity-100', 'opacity-100')
                    : 'opacity-0'
                }`}
              />
            </div>

            <img src={asset('frame-sidebar-off.png')} alt="" className="relative block h-auto max-h-full w-full object-fill" />

            {status === 'ready' ? null : (
              <div className="pointer-events-auto absolute inset-0 flex items-center justify-center text-sm text-white/60">
                {status === 'loading' ? (
                  <p>…</p>
                ) : (
                  <p className="flex gap-3">
                    视频加载失败
                    <button
                      type="button"
                      className="focus-ring text-white"
                      onClick={() => {
                        setStatus('loading')
                        setAttempt((current) => current + 1)
                      }}
                    >
                      重试
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}