import { motion } from 'motion/react'
import {
  teamUpAvatar03CoverScaleFrom,
  teamUpAvatar03CoverTransition,
  teamUpAvatarIconsTransition,
  teamUpHeroRevealTransition,
  teamUpHeroRevealYOffset,
} from './motion.ts'

const asset = (name: string) => `/images/teamUp/${name}`

const avatarIds = ['01', '02', '03', '04', '05'] as const

const avatarSlotClass = 'relative h-auto w-[max(14%,3.5rem)] min-w-0 flex-1 overflow-visible'
const avatarLayerClass = 'relative z-20 w-full'
const avatarImgClass = 'block h-auto w-full object-contain'
/** 与区段 --content-w 联动，拉窗口连续变（88/80/70vw）。 */
const avatarRowVars =
  '[--team-hero-h:clamp(8.5rem,min(48svh,calc(var(--content-w)*0.62)),64rem)] [--team-hero-shift:clamp(0.4rem,calc(var(--content-w)*0.024),3rem)] md:[--team-hero-h:clamp(11rem,min(70svh,calc(var(--content-w)*0.78)),64rem)] md:[--team-hero-shift:clamp(0.75rem,calc(var(--content-w)*0.038),3rem)]'
const heroClass =
  'pointer-events-none absolute bottom-[calc(-1*var(--team-hero-shift))] left-1/2 z-0 h-[var(--team-hero-h)] w-auto max-w-none -translate-x-1/2 object-contain object-bottom'

/** 仅立绘之间：数值须小于头像层 z-20。 */
const teamUpHeroZIndex: Record<(typeof avatarIds)[number], number> = {
  '03': 5,
  '02': 4,
  '04': 4,
  '01': 3,
  '05': 3,
}

type AvatarSectionProps = {
  motionRun: boolean
}

function HeroBehind({
  id,
  motionRun,
}: {
  id: (typeof avatarIds)[number]
  motionRun: boolean
}) {
  if (!motionRun) {
    return null
  }

  return (
    <motion.img
      key={`hero-${id}`}
      src={asset(`teamup-hero-${id}.png`)}
      alt=""
      aria-hidden
      className={heroClass}
      style={{ transformOrigin: 'center bottom', zIndex: teamUpHeroZIndex[id] }}
      initial={{ opacity: 0, y: teamUpHeroRevealYOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={teamUpHeroRevealTransition(id, true)}
    />
  )
}

function Avatar03Slot({ motionRun }: { motionRun: boolean }) {
  if (!motionRun) {
    return (
      <img
        src={asset('teamup-avatar-03.png')}
        alt=""
        className={avatarImgClass}
      />
    )
  }

  return (
    <div className="relative w-full">
      <img
        src={asset('teamup-avatar-03-plus.png')}
        alt=""
        className="block h-auto w-full object-contain"
      />
      <motion.img
        key="avatar-03-cover"
        src={asset('teamup-avatar-03.png')}
        alt=""
        className="absolute inset-0 m-auto h-full w-full max-h-full max-w-full object-contain"
        style={{ transformOrigin: 'center center' }}
        initial={{ opacity: 0, scale: teamUpAvatar03CoverScaleFrom }}
        animate={{ opacity: 1, scale: 1 }}
        transition={teamUpAvatar03CoverTransition(true)}
      />
    </div>
  )
}

function AvatarRowSlot({
  id,
  motionRun,
}: {
  id: (typeof avatarIds)[number]
  motionRun: boolean
}) {
  return (
    <div className={avatarSlotClass}>
      <HeroBehind id={id} motionRun={motionRun} />
      <div className={avatarLayerClass}>
        {id === '03' ? (
          <Avatar03Slot motionRun={motionRun} />
        ) : (
          <img
            src={asset(`teamup-avatar-${id}.png`)}
            alt=""
            className={avatarImgClass}
          />
        )}
      </div>
    </div>
  )
}

/** 头像一排 + 底栏 icon + 立绘。时间轴见 motion.ts。 */
export function AvatarSection({ motionRun }: AvatarSectionProps) {
  return (
    <div className="flex w-full flex-col items-center gap-[max(1.5vw,0.5rem)]">
      <div
        className={`flex w-full items-end justify-center gap-[max(0.6vw,0.2rem)] overflow-visible ${avatarRowVars}`}
      >
        {avatarIds.map((id) => (
          <AvatarRowSlot key={id} id={id} motionRun={motionRun} />
        ))}
      </div>
      <motion.div
        key={motionRun ? 'avatar-icons-run' : 'avatar-icons-idle'}
        className="flex w-full items-center justify-center gap-[max(0.6vw,0.2rem)]"
        initial={{ opacity: motionRun ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={teamUpAvatarIconsTransition(motionRun)}
      >
        {avatarIds.map((id) => (
          <div key={id} className="flex flex-1 justify-center">
            <img
              src={asset(`teamup-avatar-${id}-icon.png`)}
              alt=""
              className="h-auto w-[max(1.2rem,2.35vw)] max-w-[1.65rem] object-contain md:w-[max(1.75rem,3vw)] md:max-w-[2.25rem]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}