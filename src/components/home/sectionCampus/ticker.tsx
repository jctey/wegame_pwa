import { motion } from 'motion/react'
import { campusRiseMotionProps } from './motion.ts'

const campusTickerMessages = [
  '蛋蛋君已完成高校认证',
  '小鹿酱通过了学籍审核',
  '企鹅学长领取了校园礼包',
  '某同学激活了学生优惠',
  '开黑小队加入了本校频道',
  '玩家在高校排行上升 3 名',
  '宿舍区匹配到新队友',
  '本周本校签到人数破千',
  '校友卡皮肤已发放',
  '图书馆副本通关打卡成功',
] as const

type CampusTickerProps = {
  motionRun: boolean
  /** 桌面且区块在播时才竖滚 */
  active: boolean
}

const tickerRiseOrder = 9

/** 中间一条全显，上下渐隐为浅 */
const tickerMask =
  '[-webkit-mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.15)_18%,rgba(0,0,0,0.45)_34%,#000_46%,#000_54%,rgba(0,0,0,0.45)_66%,rgba(0,0,0,0.15)_82%,transparent_100%)] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.15)_18%,rgba(0,0,0,0.45)_34%,#000_46%,#000_54%,rgba(0,0,0,0.45)_66%,rgba(0,0,0,0.15)_82%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]'

/** 字号随 frame 宽度（cqw），标签用 em 保持比例 */
const tickerChipClass =
  'inline-block max-w-full truncate px-[0.52em] py-[0.34em] text-[1em] font-bold leading-none text-[#ff8111] bg-white/20 rounded-[0.04em] [clip-path:polygon(0_0,calc(100%-0.2em)_0,100%_0.2em,100%_100%,0.2em_100%,0_calc(100%-0.2em))]'

/**
 * 定位/窗口：相对 frame 的 %（与卡片一致）
 * 行高：em，随根字号 text-[3.2cqw] 缩放（不用 cqh，避免 container 跑位）
 */
export function CampusTicker({ motionRun, active }: CampusTickerProps) {
  const lines = [...campusTickerMessages, ...campusTickerMessages]

  return (
    <motion.div
      className="pointer-events-none absolute bottom-[6%] right-[-108%] h-[62%] w-[100%] text-[3.2cqw] leading-none"
      aria-live="polite"
      {...campusRiseMotionProps(motionRun, tickerRiseOrder)}
    >
      <div className={`relative h-full overflow-hidden ${tickerMask}`}>
        <div
          className={`flex w-full flex-col items-start transform-gpu will-change-transform backface-hidden ${active ? 'motion-safe:animate-campus-ticker-scroll' : ''} motion-reduce:animate-none`}
        >
          {lines.map((text, index) => (
            <p
              key={`${index}-${text}`}
              className="flex h-[3.1em] w-full shrink-0 items-center justify-start"
            >
              <span className={tickerChipClass}>{text}</span>
            </p>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/25 opacity-35 mix-blend-screen"
        />
      </div>
    </motion.div>
  )
}