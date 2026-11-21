import { motion } from 'motion/react'
import type { Transition } from 'motion/react'

type Side = 'left' | 'right'

const asset = (name: string) => `/images/assistant/${name}`

const clipFrom = 'polygon(0 0, 95% 0, 10% 100%, 0 100%)'
const clipTo = 'polygon(0 0, 70% 0, 30% 100%, 0 100%)'
const ease = [0.64, 1.15, 0.63, 1.06] as const
const duration = 0.6
const offScreenX = '105vw'

// 宽：窄屏有下限，桌面接近原来 52vw
const titleClass =
  'block w-[min(100%,max(18rem,70vw))] md:w-[min(100%,44vw)] xl:w-[min(100%,52vw)]'

const titles: { file: string; side: Side; rowClass: string; delay: number }[] = [
  {
    file: 'feature-title-init-1.svg',
    side: 'left',
    rowClass: 'self-start',
    delay: 0.2,
  },
  {
    file: 'feature-title-init-2.svg',
    side: 'right',
    rowClass: 'self-end',
    delay: 0.28,
  },
]

function offscreenX(side: Side) {
  return side === 'left' ? `-${offScreenX}` : offScreenX
}

function motionTransition(run: boolean, delay: number): Transition {
  return run ? { duration, ease, delay } : { duration: 0 }
}

type FrameInitProps = {
  run: boolean
  onComplete?: () => void
}

// 助手入场帧：斜切背景 + 两行标题（屏外水平滑入）。
export function FrameInit({ run, onComplete }: FrameInitProps) {
  const lastIndex = titles.length - 1

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
      <motion.div
        className="absolute inset-0 z-0 bg-[linear-gradient(165deg,#e07028,#c44510_50%,#9a3008)]"
        animate={run ? { clipPath: [clipFrom, clipTo] } : { clipPath: clipTo }}
        transition={motionTransition(run, 0.1)}
      />

      <div className="relative z-[1] flex h-full w-full flex-col items-center justify-center gap-6 px-4 md:gap-8">
        {titles.map(({ file, side, rowClass, delay }, index) => (
          <motion.img
            key={file}
            src={asset(file)}
            alt=""
            className={`${titleClass} ${rowClass}`}
            initial={run ? { opacity: 0, x: offscreenX(side) } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={motionTransition(run, delay)}
            onAnimationComplete={() => {
              if (run && index === lastIndex) onComplete?.()
            }}
          />
        ))}
      </div>
    </div>
  )
}