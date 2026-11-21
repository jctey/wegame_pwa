import { motion } from 'motion/react'
import { campusRiseMotionProps } from './motion.ts'
import { CampusTicker } from './ticker.tsx'

const asset = (name: string) => `/images/campus/${name}`

const featureIds = ['01', '02', '03'] as const

/** 水平：section 的 --content-w + mx-auto；垂直：padding 避开顶栏 */
const shellClass =
  'pointer-events-none absolute inset-0 z-10 flex h-full pt-[max(5vw,5rem)] pb-[max(3vw,1.25rem)] md:pt-[max(5vw,6rem)]'

const rowClass =
  'mx-auto flex h-full min-h-0 w-full max-w-(--content-w) gap-[max(2vw,0.5rem)] md:gap-[max(2.5vw,0.75rem)]'

type CampusMotionProps = {
  motionRun: boolean
  isDesktop: boolean
}

type CampusContentProps = CampusMotionProps

/** 左侧：标题区 1/3 高，特性区 2/3 */
function CampusContentLeft({ motionRun }: CampusMotionProps) {
  return (
    <div
      key={motionRun ? 'campus-left-run' : 'campus-left-idle'}
      className="flex min-h-0 min-w-0 flex-[2] flex-col [--campus-desc-w:94%] [--campus-feature-w:72%] md:[--campus-feature-w:55%]"
    >
      <h2 className="sr-only">高校</h2>
      <div className="flex min-h-0 flex-[1] flex-col justify-end w-[220%] md:w-[200%] xl:w-[160%]">
        <motion.img
          src={asset('college-title-01.svg')}
          alt=""
          className="block w-full"
          {...campusRiseMotionProps(motionRun, 0)}
        />
        <motion.img
          src={asset('college-desc-01.svg')}
          alt=""
          className="block w-(--campus-desc-w) max-w-full"
          {...campusRiseMotionProps(motionRun, 1)}
        />
      </div>
      <div className="flex min-h-0 flex-[2] flex-col justify-center gap-[max(2.5vh,0.75rem)] md:gap-[max(3vh,1rem)]">
        {featureIds.map((id, index) => (
          <motion.img
            key={id}
            src={asset(`college-feature-${id}.svg`)}
            alt=""
            className="block w-(--campus-feature-w) max-w-full"
            {...campusRiseMotionProps(motionRun, 2 + index)}
          />
        ))}
      </div>
    </div>
  )
}

/** 右侧：框 + 卡片叠层 + 球；尺寸跟右栏宽度 */
function CampusContentRight({ motionRun, isDesktop }: CampusMotionProps) {
  return (
    <div
      className="relative flex min-h-0 min-w-0 flex-[3] items-center justify-center [--campus-right-ball-w:38%] [--campus-right-frame-w:62%] md:[--campus-right-ball-w:26%] md:[--campus-right-frame-w:56%]"
    >
      <div
        key={motionRun ? 'campus-right-run' : 'campus-right-idle'}
        className="@container/campus-frame relative mx-auto w-(--campus-right-frame-w) max-w-full"
      >
        <motion.img
          src={asset('college-right-frame.jpg')}
          alt=""
          className="block h-auto w-full object-contain"
          {...campusRiseMotionProps(motionRun, 5)}
        />
        <motion.img
          src={asset('college-right-card-01.png')}
          alt=""
          className="absolute top-[34%] left-[-35%] w-[84%] max-w-none object-contain"
          {...campusRiseMotionProps(motionRun, 6)}
        />
        <motion.img
          src={asset('college-right-card-02.png')}
          alt=""
          className="absolute top-[10%] left-[65%] w-[80%] max-w-none object-contain"
          {...campusRiseMotionProps(motionRun, 7)}
        />
        <div className="pointer-events-none absolute right-[4%] bottom-[45%] w-(--campus-right-ball-w) motion-safe:animate-campus-ball-float motion-reduce:animate-none">
          <motion.img
            src={asset('college-right-ball.png')}
            alt=""
            className="block w-full max-w-none object-contain scale-130 md:scale-175"
            {...campusRiseMotionProps(motionRun, 8)}
          />
        </div>

        <CampusTicker motionRun={motionRun} active={motionRun && isDesktop} />
      </div>
    </div>
  )
}

/** 高校前景：左 2/5 文案+特性，右 3/5 留短句 */
export function CampusContent({ motionRun, isDesktop }: CampusContentProps) {
  return (
    <div className={shellClass}>
      <div className={rowClass}>
        <CampusContentLeft motionRun={motionRun} isDesktop={isDesktop} />
        <CampusContentRight motionRun={motionRun} isDesktop={isDesktop} />
      </div>
    </div>
  )
}