/**
 * 助手 Tab 内容壳（三屏共用）。
 * tabConfigs 管左右区与图；此处只管整块留白。canvas 是相对定位根，tab 内 absolute 都跟它走。
 */
import { motion } from 'motion/react'
import type {
  AssistantTabConfig,
  TabEnter,
  TabMediaItem,
  TabSide,
} from './tabConfigs.ts'
import {
  tabAsset,
  tabPanelClipFrom,
  tabPanelClipTo,
  tabPanelEnterDone,
  tabPanelEnterInitial,
  tabPanelItemDelay,
  tabPanelZoneDelay,
  useTabPanelMotion,
} from './tabs.ts'

/** 外壳留白：少 vw，三 tab 共用 */
const shellClass =
  'relative flex h-full w-full min-h-0 items-stretch justify-center px-3 pb-2 pt-3 md:px-6 md:pt-4 xl:px-10'
/** 每屏全幅纹理底图。 */
const textureClass =
  'pointer-events-none absolute inset-0 scale-110 bg-cover bg-left bg-no-repeat'
/** absolute 定位根；左右区 top/left 的 % 都相对本层 */
const canvasClass = 'relative h-full w-full px-2 md:px-6 xl:px-10'

/**
 * 单张素材。
 * - 默认：静态 img
 * - itemEnter：slide / rise 错峰入场
 * - clipReveal：Tab3 框内文案自上而下露出
 * - wrapClass：外包 div，用于头像 CSS 上下浮动
 */
function TabImage({
  item,
  itemEnter,
  motionRun,
}: {
  item: TabMediaItem
  itemEnter?: TabEnter
  motionRun: boolean
}) {
  const { run, transition } = useTabPanelMotion(motionRun)

  let node = (
    <img
      src={tabAsset(item.file)}
      alt={item.alt}
      aria-hidden={!item.alt}
      className={item.className}
    />
  )

  if (item.clipReveal) {
    const { delay, duration } = item.clipReveal
    node = (
      <motion.img
        src={tabAsset(item.file)}
        alt={item.alt}
        className={item.className}
        initial={run ? { clipPath: tabPanelClipFrom } : false}
        animate={{ clipPath: tabPanelClipTo }}
        transition={transition(delay, duration)}
      />
    )
  } else if (itemEnter) {
    node = (
      <motion.div
        initial={tabPanelEnterInitial(run, itemEnter)}
        animate={tabPanelEnterDone}
        transition={transition(tabPanelItemDelay(item.delay))}
      >
        <img
          src={tabAsset(item.file)}
          alt={item.alt}
          aria-hidden={!item.alt}
          className={item.className}
        />
      </motion.div>
    )
  }

  if (item.wrapClass) {
    return (
      <div aria-hidden className={item.wrapClass}>
        {node}
      </div>
    )
  }

  return node
}

/**
 * 一侧（左或右）：shell 来自配置里的绝对定位 class。
 * items → 主图列表；stacks → 叠图（Tab3 画框）；groups → 嵌套一排（Tab3 三条要点）。
 * zoneEnter 时整块侧栏先入场。
 */
function TabSideView({
  side,
  label,
  motionRun,
}: {
  side: TabSide
  label: 'left' | 'right'
  motionRun: boolean
}) {
  const { run, transition } = useTabPanelMotion(motionRun)

  const body = (
    <>
      {side.items.map((item) => (
        <div key={`${label}-${item.file}`}>
          <TabImage item={item} itemEnter={side.itemEnter} motionRun={motionRun} />
        </div>
      ))}
      {side.stacks?.map((stack, index) => {
        const frameItem = stack.items[0]
        const inFrame = stack.items.filter((item) => item.clipToFrame)
        const outside = stack.items.filter(
          (item, i) => i !== 0 && !item.clipToFrame,
        )
        const useFrameClip = inFrame.length > 0 && frameItem

        return (
          <div key={`${label}-stack-${index}`} className={stack.shell}>
            {useFrameClip ? (
              <div className="relative w-full overflow-hidden">
                <div key={`${label}-${frameItem.file}`}>
                  <TabImage item={frameItem} motionRun={motionRun} />
                </div>
                {inFrame.map((item) => (
                  <div key={`${label}-${item.file}`}>
                    <TabImage item={item} motionRun={motionRun} />
                  </div>
                ))}
              </div>
            ) : null}
            {!useFrameClip
              ? stack.items.map((item) => (
                  <div key={`${label}-${item.file}`}>
                    <TabImage item={item} motionRun={motionRun} />
                  </div>
                ))
              : outside.map((item) => (
                  <div key={`${label}-${item.file}`}>
                    <TabImage item={item} motionRun={motionRun} />
                  </div>
                ))}
          </div>
        )
      })}
      {side.groups?.map((group, index) => (
        <div key={`${label}-group-${index}`} className={group.shell}>
          {group.items.map((item) => (
            <div key={`${label}-${item.file}`}>
              <TabImage item={item} itemEnter={group.itemEnter} motionRun={motionRun} />
            </div>
          ))}
        </div>
      ))}
    </>
  )

  if (side.zoneEnter) {
    return (
      <motion.div
        className={side.shell}
        initial={tabPanelEnterInitial(run, side.zoneEnter)}
        animate={tabPanelEnterDone}
        transition={transition(tabPanelZoneDelay(side.zoneDelay))}
      >
        {body}
      </motion.div>
    )
  }

  return <div className={side.shell}>{body}</div>
}

type TabPanelProps = {
  config: AssistantTabConfig
  /** false 时停在终态，避免 init 预挂载时把入场动画跑完。 */
  motionRun?: boolean
}

/** index 根据当前底栏 tab 传入 assistantTabConfigs 中对应一项。 */
export function TabPanel({ config, motionRun = true }: TabPanelProps) {
  return (
    <div className={shellClass}>
      <div
        aria-hidden
        className={textureClass}
        style={{ backgroundImage: `url(${tabAsset(config.texture)})` }}
      />
      <div className={canvasClass}>
        <TabSideView side={config.left} label="left" motionRun={motionRun} />
        <TabSideView side={config.right} label="right" motionRun={motionRun} />
      </div>
    </div>
  )
}