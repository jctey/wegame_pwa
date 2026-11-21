import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  teamUpArrowBgCount,
  teamUpArrowBgOverlap,
  teamUpArrowRiseEnd,
  teamUpArrowRiseTransition,
  teamUpBgSwitchDelay,
  teamUpBgSwitchDuration,
  teamUpBgSwitchTransition,
} from './motion.ts'

const teamUpArrowBg = '/images/teamUp/teamup-arrow-bg.svg'
const teamUpStageBg = '/images/teamUp/teamup-bg.webp'

const teamUpBgLayerH = 'min(100svh,100%)'

type TeamUpBgRunProps = {
  motionRun: boolean
}

/** 箭头上移（0–1s）。时间轴见 motion.ts。 */
export function TeamUpArrowBg({ run }: { run: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full overflow-hidden"
      style={{ height: teamUpBgLayerH }}
    >
      <motion.div
        key={run ? 'team-up-bg-run' : 'team-up-bg-idle'}
        className="flex w-full flex-col leading-none"
        initial={{ y: '0%' }}
        animate={{ y: run ? teamUpArrowRiseEnd : '0%' }}
        transition={teamUpArrowRiseTransition(run)}
      >
        {Array.from({ length: teamUpArrowBgCount }, (_, index) => (
          <img
            key={index}
            src={teamUpArrowBg}
            alt=""
            className="block w-full shrink-0 object-cover object-bottom"
            style={{
              height: teamUpBgLayerH,
              marginTop: index > 0 ? `calc(-1 * ${teamUpArrowBgOverlap})` : 0,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

/** 标题淡出后再挂载 webp（4.25s）。时间轴见 motion.ts。 */
export function TeamUpFinalBg({ motionRun }: TeamUpBgRunProps) {
  const [mounted, setMounted] = useState(!motionRun)

  useEffect(() => {
    if (!motionRun) {
      setMounted(true)
      return
    }

    setMounted(false)
    const timer = window.setTimeout(() => setMounted(true), teamUpBgSwitchDelay * 1000)
    return () => window.clearTimeout(timer)
  }, [motionRun])

  if (!mounted) {
    return null
  }

  return (
    <motion.img
      key={motionRun ? 'final-bg-run' : 'final-bg-idle'}
      src={teamUpStageBg}
      alt=""
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
      initial={{ opacity: motionRun ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={
        motionRun
          ? { duration: teamUpBgSwitchDuration, ease: 'easeOut' }
          : teamUpBgSwitchTransition(false)
      }
    />
  )
}

/** 开黑背景：先箭头，后 webp。时间轴见 motion.ts。 */
export function TeamUpBg({ motionRun }: TeamUpBgRunProps) {
  return (
    <>
      <TeamUpArrowBg run={motionRun} />
      <TeamUpFinalBg motionRun={motionRun} />
    </>
  )
}