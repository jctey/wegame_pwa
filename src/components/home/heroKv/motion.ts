import type { Transition } from 'motion/react'

/** 与原先 CSS 动画一致：1s ease-in-out，延迟 0.1s。 */
export const kvEnterDuration = 1
export const kvEnterDelay = 0.1
export const kvHoldUntil = 0.82
export const kvLightHoldUntil = 0.78

const kvEnterEase: Transition['ease'] = 'easeInOut'

export function kvEnterTransition(run: boolean): Transition {
  return run ? { duration: kvEnterDuration, ease: kvEnterEase, delay: kvEnterDelay } : { duration: 0 }
}

export function kvEnterTimes(holdUntil: number): number[] {
  return [0, holdUntil, 1]
}

/** 引导箭头循环：2s linear，与原 kvGuide* 关键帧一致。 */
export const kvGuideDuration = 2

export function kvGuideLoopTransition(run: boolean, delay: number): Transition {
  return run
    ? {
        duration: kvGuideDuration,
        ease: 'linear',
        repeat: Infinity,
        delay,
      }
    : { duration: 0 }
}