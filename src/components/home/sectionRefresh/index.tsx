import { useReducedMotion } from 'motion/react'
import { homePageId } from '../../../data/homePages.ts'
import { usePagePlaying } from '../../../hooks/usePagePlaying.ts'
import { usePageOn } from '../../../providers/homePager.tsx'

const asset = (name: string) => `/images/refreshSection/${name}`

const layer = 'absolute inset-0 h-full w-full'

const topicBg =
  "absolute top-[5vw] h-[98vw] w-[60vw] bg-[url('/images/gameCarousel/bg.svg')] bg-contain bg-no-repeat"

export function RefreshSideBg() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative rotate-180">
      <div className={`${topicBg} -left-[15vw]`} />
      <div className={`${topicBg} -right-[15vw] -scale-x-100`} />
    </div>
  )
}

// 焕新 CSS 时间线：进屏挂 animate-*，离屏 idle，减少动态时用 reducedEnd 终态。
export function refreshPlay(
  playing: boolean,
  reduced: boolean,
  animation: string,
  idle = '',
  reducedEnd = '',
): string {
  if (!playing) {
    return idle
  }
  if (reduced) {
    return reducedEnd || idle
  }
  return animation
}

export function SectionRefresh() {
  const on = usePageOn(homePageId.refresh)
  const [sectionRef, playing] = usePagePlaying(homePageId.refresh)
  const reduced = useReducedMotion() === true

  return (
    <section
      ref={sectionRef}
      id={homePageId.refresh}
      data-on={on || undefined}
      aria-label="焕新"
      className="full-page-section grid aspect-[6/5] w-full overflow-hidden bg-ink [--frame-w:88vw] md:aspect-auto md:min-h-svh md:[--frame-w:80vw] xl:[--frame-w:70vw]"
    >
      <RefreshSideBg />

      {/* 平板满屏但主框不贴底：标题与主框成组垂直居中，间距留给主框上沿的代码半圆 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center gap-[0.1vw] pt-[max(5vw,5rem)] md:pt-[max(5vw,6rem)] md:max-xl:justify-center md:max-xl:gap-[8vw]"
      >
        {/* 标题：02 先被 3.0 盖上，再整组换成 03 */}
        <div className="relative w-[80vw] shrink-0 md:w-[min(100%,60vw)]">
          <div className={`relative ${refreshPlay(playing, reduced, 'animate-refresh-swap-out', '', 'opacity-0')}`}>
            <img src={asset('section-title-02.svg')} alt="" className="block w-full" />
            <img
              src={asset('3.0.svg')}
              alt=""
              className={`${layer} ${refreshPlay(playing, reduced, 'animate-refresh-badge', '[clip-path:inset(100%_0_0_0)]')}`}
            />
          </div>
          <img
            src={asset('section-title-03.svg')}
            alt=""
            className={`${layer} ${refreshPlay(playing, reduced, 'animate-refresh-title-in', 'opacity-0')}`}
          />
        </div>

        {/* 主框：整体上移。图层按 DOM 顺序从下往上叠 */}
        <div
          className={`relative bottom-[-2vh] flex min-h-0 w-full flex-1 items-end justify-center md:max-xl:bottom-0 md:max-xl:flex-none ${refreshPlay(playing, reduced, 'animate-refresh-rise')}`}
        >
          <div className="relative max-h-full w-[min(100%,var(--frame-w))] rounded-t-[max(0.5rem,calc(var(--frame-w)*0.016))] rounded-b-none border border-white/20 bg-white/5">
            {/* 窗口：商店图换成 off 图加内容块 */}
            <img
              src={asset('frame-main-store.png')}
              alt=""
              className={`block h-auto max-h-full w-full object-fill ${refreshPlay(playing, reduced, 'animate-refresh-swap-out', '', 'opacity-0')}`}
            />
            <img
              src={asset('frame-main-store-off.png')}
              alt=""
              className={`${layer} object-fill ${refreshPlay(playing, reduced, 'animate-refresh-swap-in', 'opacity-0')}`}
            />
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={asset('frame-main-store-block.png')}
                alt=""
                className={`absolute top-[13.5%] left-[15%] w-[72.8%] max-w-none ${refreshPlay(playing, reduced, 'animate-refresh-swap-in', 'opacity-0')}`}
              />
            </div>

            {/* 窗口 UI：滑入，切换时淡出 */}
            <img
              src={asset('sidebar-key.png')}
              alt=""
              className={`absolute top-[12.3%] left-[1.6%] w-[11.84%] ${refreshPlay(playing, reduced, 'animate-refresh-sidebar', '', 'opacity-0')}`}
            />
            <img
              src={asset('sidebar-game.png')}
              alt=""
              className={`absolute top-[30%] left-[1.6%] w-[11.84%] ${refreshPlay(playing, reduced, 'animate-refresh-sidebar', '', 'opacity-0')}`}
            />
            <img
              src={asset('search.svg')}
              alt=""
              className={`absolute top-[3.5%] left-[25%] w-[28.57%] ${refreshPlay(playing, reduced, 'animate-refresh-search', '', 'opacity-0')}`}
            />

            {/* 扫光：只在窗口范围内掠过 */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={asset('frame-refresh-light.svg')}
                alt=""
                className={`h-full w-full object-cover object-top ${refreshPlay(playing, reduced, 'animate-refresh-scan', 'translate-y-full', 'hidden')}`}
              />
            </div>

            {/* 窗口上沿：代码半圆与光条，底边对齐窗口顶边 */}
            <div className="absolute bottom-full left-0 h-0 w-full">
              <img
                src={asset('frame-code.png')}
                alt=""
                className={`absolute bottom-[calc(var(--frame-w)*-0.1)] left-1/2 w-[120%] max-w-none -translate-x-1/2 ${refreshPlay(playing, reduced, 'animate-refresh-arc', 'opacity-0')}`}
              />
              <img
                src={asset('frame-light.png')}
                alt=""
                className={`absolute bottom-[calc(var(--frame-w)*-0.1)] left-1/2 w-[120%] max-w-none -translate-x-1/2 ${refreshPlay(playing, reduced, 'animate-refresh-arc', 'opacity-0')}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}