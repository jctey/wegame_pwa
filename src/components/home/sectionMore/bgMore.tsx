const moreBgSrc = '/images/more/bg.avif'
const titleSrc = '/images/more/title.svg'
const maskSrc = '/images/more/mask.png'

/** 双帧各占滚动轨道一半，-50% 位移与可视区等高，避免手机端按图高滚动露黑边。 */
const moreBgFrameClass = 'block h-1/2 w-full shrink-0 object-cover object-top'
const moreBgTrackClass =
  'flex h-[200%] w-full flex-col transform-gpu will-change-transform backface-hidden'

const titleShellClass =
  'absolute inset-x-0 top-[max(10vw,6.5rem)] z-[3] px-[6vw] md:top-[max(15vw,7.5rem)] md:px-0'

type MoreBgProps = {
  active: boolean
}

/** more 区块：滚动背景、标题、底部遮罩 */
export function MoreBg({ active }: MoreBgProps) {
  const frames = [moreBgSrc, moreBgSrc]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div aria-hidden className="absolute inset-0 z-0 h-full overflow-hidden">
        <div
          className={`${moreBgTrackClass} ${active ? 'motion-safe:animate-more-bg-scroll' : ''} motion-reduce:animate-none`}
        >
          {frames.map((src, index) => (
            <img key={index} src={src} alt="" className={moreBgFrameClass} />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <img
        src={maskSrc}
        alt=""
        className="absolute inset-x-0 bottom-0 z-[2] w-full object-cover object-bottom"
      />
      <div className={titleShellClass}>
        <h2 id="more-section-title" className="sr-only">
          more
        </h2>
        <img
          src={titleSrc}
          alt=""
          className="pointer-events-none mx-auto block w-[88vw] md:w-(--content-w) md:max-w-full"
        />
      </div>
    </div>
  )
}