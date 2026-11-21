import { motion, useReducedMotion } from 'motion/react'
import { kvGuideLoopTransition } from '../../home/heroKv/motion.ts'

const delays = [0, 0.5, 1, 1.5] as const

const guideMoveTimes = [0, 1 / 3, 2 / 3, 1] as const
const guideScaleTimes = [0, 0.2, 0.2, 0.6, 0.6, 1] as const

type DownGuideIconProps = {
  className?: string
  motionRun?: boolean
}

export function DownGuideIcon({ className, motionRun = true }: DownGuideIconProps) {
  const run = motionRun && !useReducedMotion()

  return (
    <div className={`pointer-events-none w-[2vw] min-w-3 ${className ?? ''}`} aria-hidden="true">
      {delays.map((delay) => (
        <motion.div
          key={delay}
          className="absolute inset-x-0 top-[-2vh] origin-center"
          initial={
            run
              ? { opacity: 0, y: '-2vh' }
              : { opacity: 1, y: 0 }
          }
          animate={
            run
              ? {
                  opacity: [0, 1, 0, 0],
                  y: ['-2vh', 0, '2vh', '2vh'],
                }
              : { opacity: 1, y: 0 }
          }
          transition={{
            ...kvGuideLoopTransition(run, delay),
            times: run ? [...guideMoveTimes] : undefined,
          }}
        >
          <motion.div
            className="aspect-[44/25] w-full origin-center bg-[url('/images/kv/icon-arrow-down.svg')] bg-contain bg-no-repeat"
            initial={run ? { scaleX: 0, scaleY: 0 } : { scaleX: 1, scaleY: 1 }}
            animate={
              run
                ? {
                    scaleX: [0, 0, 1, 1, 0, 0],
                    scaleY: [0, 0, 1, 1, 0, 0],
                  }
                : { scaleX: 1, scaleY: 1 }
            }
            transition={{
              ...kvGuideLoopTransition(run, delay),
              times: run ? [...guideScaleTimes] : undefined,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}