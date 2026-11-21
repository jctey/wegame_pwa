import type { Transition } from 'motion/react'

/**
 * 开黑入场时间轴。进屏 t=0，后面的 delay 都由上面加出来。
 * 开关：index.tsx 的 motionRun。reduced-motion 时 duration=0，直接定格。
 *
 *   0.00–1.00  箭头上移，停住不循环     bgTeamUp
 *   1.50–2.40  03 从 2 倍缩到 1，盖住 plus  avatarList
 *   1.85–2.45  底栏 icon 淡入（盖住未完就开始）
 *   3.45–4.25  title-01 淡出            teamTitle
 *   4.25–5.05  换 webp 背景             bgTeamUp
 *   5.05–5.85  title-02 淡入            teamTitle
 *   6.00–7.03  立绘 03 → 02/04 → 01/05  avatarList
 */

// --- 箭头叠图：三张上移一格后停住 ---

export const teamUpArrowBgCount = 3

/** 单张高度，须与 bgTeamUp 的 `min(78svh,100%)` 一致。 */
export const teamUpArrowLayerVh = 78

/** 第二张起向上叠，缩小箭阵缝隙。 */
export const teamUpArrowOverlapVh = 6

export const teamUpArrowBgOverlap = `${teamUpArrowOverlapVh}svh`

const teamUpArrowStackVh =
  teamUpArrowBgCount * teamUpArrowLayerVh - (teamUpArrowBgCount - 1) * teamUpArrowOverlapVh
const teamUpArrowStepVh = teamUpArrowLayerVh - teamUpArrowOverlapVh

export const teamUpArrowRiseEnd = `-${(teamUpArrowStepVh / teamUpArrowStackVh) * 100}%`

/** 0.00–1.00 箭头上移。 */
export const teamUpArrowRiseDuration = 1

export function teamUpArrowRiseTransition(run: boolean): Transition {
  return run ? { duration: teamUpArrowRiseDuration, ease: 'linear' } : { duration: 0 }
}

// --- 03 盖住 plus ---

/** 1.50–2.40  opacity 0→1、scale 2→1。 */
export const teamUpAvatar03CoverDelay = 1.5
export const teamUpAvatar03CoverDuration = 0.9
export const teamUpAvatar03CoverScaleFrom = 2

export function teamUpAvatar03CoverTransition(run: boolean): Transition {
  return run
    ? { delay: teamUpAvatar03CoverDelay, duration: teamUpAvatar03CoverDuration, ease: 'easeOut' }
    : { duration: 0 }
}

// --- 底栏 icon（叠在盖住上，不等盖完）---

/** 1.85–2.45  比盖住结束提早 0.55s。 */
export const teamUpAvatarIconsFadeDuration = 0.6
export const teamUpAvatarIconsRevealEarlyBy = 0.55

export const teamUpAvatarIconsRevealDelay =
  teamUpAvatar03CoverDelay + teamUpAvatar03CoverDuration - teamUpAvatarIconsRevealEarlyBy

export function teamUpAvatarIconsTransition(run: boolean): Transition {
  return run
    ? {
        delay: teamUpAvatarIconsRevealDelay,
        duration: teamUpAvatarIconsFadeDuration,
        ease: 'easeOut',
      }
    : { duration: 0 }
}

// --- 标题 01 淡出 → 换 webp ---

/** 3.45–4.25  icon 出齐后再停 1s，才淡出 title-01。 */
export const teamUpTitleFadeDuration = 0.8
export const teamUpTitleHoldBeforeFade = 1

export const teamUpTitleFadeDelay =
  teamUpAvatarIconsRevealDelay + teamUpAvatarIconsFadeDuration + teamUpTitleHoldBeforeFade

export function teamUpTitleFadeTransition(run: boolean): Transition {
  return run
    ? {
        delay: teamUpTitleFadeDelay,
        duration: teamUpTitleFadeDuration,
        ease: 'easeOut',
      }
    : { duration: 0 }
}

/** 4.25–5.05  标题没了再挂载并淡入 teamup-bg.webp。 */
export const teamUpBgSwitchDuration = 0.8
export const teamUpBgSwitchDelay = teamUpTitleFadeDelay + teamUpTitleFadeDuration

export function teamUpBgSwitchTransition(run: boolean): Transition {
  return run
    ? {
        delay: teamUpBgSwitchDelay,
        duration: teamUpBgSwitchDuration,
        ease: 'easeOut',
      }
    : { duration: 0 }
}

// --- 标题 02 ---

/** 5.05–5.85  webp 切好后，同位置淡入 title-02 / subtitle-02。 */
export const teamUpTitle02RevealDuration = 0.8
export const teamUpTitle02RevealDelay = teamUpBgSwitchDelay + teamUpBgSwitchDuration

export function teamUpTitle02RevealTransition(run: boolean): Transition {
  return run
    ? {
        delay: teamUpTitle02RevealDelay,
        duration: teamUpTitle02RevealDuration,
        ease: 'easeOut',
      }
    : { duration: 0 }
}

// --- 立绘：中间先出，再两侧；自下往上 ---

/** 6.00 起  title-02 出齐后再停 0.15s。 */
export const teamUpHeroHoldAfterTitle02 = 0.15
export const teamUpHeroRevealDuration = 0.75
export const teamUpHeroRevealStagger = 0.14
export const teamUpHeroRevealYOffset = '14%'

export const teamUpHeroRevealBaseDelay =
  teamUpTitle02RevealDelay + teamUpTitle02RevealDuration + teamUpHeroHoldAfterTitle02

/** 03 → 02/04 → 01/05 */
const teamUpHeroRevealWaveById: Record<'01' | '02' | '03' | '04' | '05', number> = {
  '03': 0,
  '02': 1,
  '04': 1,
  '01': 2,
  '05': 2,
}

export function teamUpHeroRevealTransition(
  id: keyof typeof teamUpHeroRevealWaveById,
  run: boolean,
): Transition {
  if (!run) {
    return { duration: 0 }
  }
  const wave = teamUpHeroRevealWaveById[id]
  return {
    delay: teamUpHeroRevealBaseDelay + wave * teamUpHeroRevealStagger,
    duration: teamUpHeroRevealDuration,
    ease: 'easeOut',
  }
}
