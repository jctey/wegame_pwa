import type { Transition, Variants } from 'motion/react'

export const campusRiseY = 28

const itemEase = 'easeOut' as const
const itemDuration = 0.9
export const campusStagger = 0.22

export function campusRiseTransition(run: boolean, delay = 0): Transition {
  return run ? { duration: itemDuration, ease: itemEase, delay } : { duration: 0 }
}

/** 逐项 delay，不改动 flex 分组布局 */
export function campusRiseMotionProps(motionRun: boolean, order: number) {
  return {
    initial: { opacity: motionRun ? 0 : 1, y: motionRun ? campusRiseY : 0 },
    animate: { opacity: 1, y: 0 },
    transition: campusRiseTransition(motionRun, motionRun ? order * campusStagger : 0),
  }
}

export const campusRiseContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0, staggerDirection: 1 },
  },
  show: {
    transition: { staggerChildren: campusStagger, staggerDirection: 1 },
  },
}

export const campusRiseItemVariants: Variants = {
  hidden: { opacity: 0, y: campusRiseY },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: itemDuration, ease: itemEase },
  },
}