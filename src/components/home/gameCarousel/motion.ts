import type { Transition } from 'motion/react'

/** 与原先 topicSlideUp 一致：9s ease-in-out 循环。 */
export const topicSlideDuration = 9

export const topicSlideY = ['0%', '0%', '-25%', '-25%', '-50%', '-50%', '-75%', '-75%'] as const

export const topicSlideTimes = [0, 0.2, 0.28, 0.48, 0.56, 0.76, 0.84, 1] as const

const topicSlideEase: Transition['ease'] = 'easeInOut'

export function topicSlideTransition(run: boolean): Transition {
  return run ? { duration: topicSlideDuration, ease: topicSlideEase, repeat: Infinity } : { duration: 0 }
}