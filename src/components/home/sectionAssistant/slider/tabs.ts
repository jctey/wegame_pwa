/**
 * 助手 slider 纯逻辑：素材路径 + TabPanel 动效（无 JSX）。
 *
 * tabPanel.tsx / tabBar.tsx 从此处取 tabAsset 与入场工具。
 */
import { useReducedMotion } from 'motion/react'
import type { TabEnter } from './tabConfigs.ts'

const TAB_IMAGE_DIR = '/images/assistant/tab'

/** 助手 tab 区静态资源路径。 */
export const tabAsset = (name: string) => `${TAB_IMAGE_DIR}/${name}`

/** 与 WeGame 助手区一致的入场缓动。 */
export const tabPanelEase = [0.64, 1.15, 0.63, 1.06] as const

/** 单段入场动画默认时长（秒）。 */
export const tabPanelEnterDuration = 0.6

/** slide / rise 结束态。 */
export const tabPanelEnterDone = { opacity: 1, x: 0, y: 0 } as const

/** Tab3 框内文案：从完全遮挡到底部逐步露出。 */
export const tabPanelClipFrom = 'inset(0 0 100% 0)'
export const tabPanelClipTo = 'inset(0 0 0 0)'

/**
 * 将配置中的 TabEnter 转为 motion initial。
 * prefers-reduced-motion 时返回 false，视为无入场动画。
 */
export function tabPanelEnterInitial(
  run: boolean,
  enter: TabEnter | undefined,
) {
  if (!run || !enter) return false
  if (enter.kind === 'slide') {
    return { opacity: 0, x: enter.from } as const
  }
  return { opacity: 0, y: enter.offset ?? '12%' } as const
}

/** 读取系统减动效 + 生成带 delay/duration 的 transition。 */
export function useTabPanelMotion(motionRun = true) {
  const run = motionRun && !useReducedMotion()
  const transition = (delay: number, duration = tabPanelEnterDuration) =>
    run
      ? { duration, ease: tabPanelEase, delay }
      : { duration: 0 }
  return { run, transition }
}

/** items / groups 内单图未写 delay 时的默认值。 */
export function tabPanelItemDelay(delay?: number) {
  return delay ?? 0.1
}

/** zone 容器未写 zoneDelay 时的默认值。 */
export function tabPanelZoneDelay(delay?: number) {
  return delay ?? 0.08
}