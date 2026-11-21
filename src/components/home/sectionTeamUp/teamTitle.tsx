import { motion } from 'motion/react'
import { teamUpTitle02RevealTransition, teamUpTitleFadeTransition } from './motion.ts'
import { AvatarSection } from './avatarList.tsx'

const asset = (name: string) => `/images/teamUp/${name}`

type TeamTitleProps = {
  motionRun: boolean
}

/** 开黑前景：title-01 淡出 → title-02 淡入，下面是头像。时间轴见 motion.ts。 */
export function TeamTitle({ motionRun }: TeamTitleProps) {
  return (
    <div className="flex min-h-[40svh] w-[min(100%,var(--content-w))] flex-1 flex-col items-center justify-around gap-[max(2.5vw,1rem)] md:min-h-[36svh] md:w-[min(100%,60vw)]">
      <div className="relative w-full">
        <motion.div
          key={motionRun ? 'teamup-title-01-run' : 'teamup-title-01-idle'}
          className="flex w-full flex-col items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: motionRun ? 0 : 1 }}
          transition={teamUpTitleFadeTransition(motionRun)}
        >
          <img src={asset('teamup-title-01.svg')} alt="" className="block w-full" />
          <img src={asset('teamup-subtitle-01.svg')} alt="" className="block w-full" />
        </motion.div>
        <motion.div
          key={motionRun ? 'teamup-title-02-run' : 'teamup-title-02-idle'}
          className="pointer-events-none absolute inset-x-0 top-0 flex w-full flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: motionRun ? 1 : 0 }}
          transition={teamUpTitle02RevealTransition(motionRun)}
        >
          <img src={asset('teamup-title-02.svg')} alt="" className="block w-full" />
          <img src={asset('teamup-subtitle-02.svg')} alt="" className="block w-full" />
        </motion.div>
      </div>

      <AvatarSection motionRun={motionRun} />
    </div>
  )
}