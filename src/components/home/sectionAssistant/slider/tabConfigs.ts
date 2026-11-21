/**
 * 助手区三屏 Tab 的静态配置（图、布局 class、入场动效）。
 * 渲染见 tabPanel.tsx：texture + 左右 TabSide（items / groups / stacks）。
 */

// ── 类型 ─────────────────────────────────────────────────────────────────────

/** 整块或单图入场：横向滑入 / 自下浮起 */
export type TabEnter =
  | { kind: 'slide'; from: string }
  | { kind: 'rise'; offset?: string }

export type TabMediaItem = {
  file: string
  alt: string
  className: string
  /** 与 tabPanelItemDelay 叠加，控制错峰 */
  delay?: number
  /** Tab3 框内文案自上而下露出 */
  clipReveal?: { delay: number; duration: number }
  /** 外包 div class（如头像浮动动画） */
  wrapClass?: string
  /** true 时叠在画框内，由 tabPanel 裁剪 */
  clipToFrame?: boolean
}

/** 右侧多条要点等同壳分组 */
export type TabItemGroup = {
  shell: string
  itemEnter?: TabEnter
  items: readonly TabMediaItem[]
}

/** 左侧多层叠图（画框 + 绝对定位装饰） */
export type TabStack = {
  shell: string
  items: readonly TabMediaItem[]
}

export type TabSide = {
  shell: string
  items: readonly TabMediaItem[]
  zoneEnter?: TabEnter
  zoneDelay?: number
  itemEnter?: TabEnter
  groups?: readonly TabItemGroup[]
  stacks?: readonly TabStack[]
}

export type AssistantTabConfig = {
  texture: string
  left: TabSide
  right: TabSide
}

// ── 左右半栏基座（相对 canvas 绝对定位，边距随 md / xl 递进） ─────────────────

const halfLeft =
  'absolute inset-y-0 left-[2%] z-0 flex w-1/2 flex-col items-center justify-center px-2 leading-none md:left-[4%] xl:left-[5%]'
const halfRight =
  'absolute inset-y-0 right-[2%] z-0 flex w-1/2 flex-col items-center justify-center px-2 leading-none md:right-[4%] xl:right-[5%]'

const shellLeftBottom = halfLeft.replace('items-center', 'items-end')
const shellRightTopScaled = [
  halfRight.replace('items-center', 'items-start'),
  'justify-center scale-[0.78] origin-center md:scale-[0.80] xl:scale-[0.65]',
  'translate-y-[50%] md:translate-y-[20%] xl:translate-y-[30%]',
].join(' ')
const shellRightEndScaled = [
  halfRight.replace('items-center', 'items-end'),
  'justify-center scale-[0.78] origin-right md:scale-[0.80] xl:scale-[0.65]',
].join(' ')
const shellLeftAiStack = [
  halfLeft,
  'origin-center max-md:translate-y-0 max-md:scale-[0.88]',
  'md:translate-y-[4%] md:scale-95 xl:translate-y-[8%] xl:scale-100',
].join(' ')

// ── 入场预设（与 tabs.ts 动效参数配合） ─────────────────────────────────────

const enterRise = { kind: 'rise' as const }
const enterRise10 = { kind: 'rise' as const, offset: '10%' }
const enterSlideLeft = { kind: 'slide' as const, from: '-8%' }
const enterSlideRight = { kind: 'slide' as const, from: '8%' }
const enterSlideRight10 = { kind: 'slide' as const, from: '10%' }

// ── 重复出现的标题行宽度 ─────────────────────────────────────────────────────

const lineStartWide =
  'block w-[320%] md:w-[200%] xl:w-[170%] max-w-none self-start'
const lineStartTitle =
  'block w-[300%] md:w-[200%] xl:w-[170%] max-w-none self-start'
const lineEndWide = 'block w-[320%] max-w-none self-end md:w-[200%] xl:w-[170%]'
const lineEndTitle =
  'block w-[300%] max-w-none self-end md:w-[200%] xl:w-[170%] mb-[10%]'

const imgBlockFull = 'block w-full'
const imgBlockFullMax = 'block w-full max-w-none'

// ── feature-1：首屏能力 ──────────────────────────────────────────────────────

const tab1: AssistantTabConfig = {
  texture: 'feature-texture-2.png',
  left: {
    shell: halfLeft,
    zoneEnter: enterRise,
    itemEnter: enterRise10,
    items: [
      { file: 'feature-t1-subtitle.svg', alt: '能力副标题', className: imgBlockFull, delay: 0.22 },
      { file: 'feature-t1-title.svg', alt: '能力标题', className: imgBlockFull, delay: 0.34 },
      { file: 'feature-t1-frame.png', alt: '', className: imgBlockFull, delay: 0.1 },
    ],
  },
  right: {
    shell: halfRight,
    zoneEnter: enterSlideRight,
    items: [{ file: 'feature-t1-role.png', alt: '', className: 'w-full' }],
  },
}

// ── feature-2：对局助手 ──────────────────────────────────────────────────────

const tab2: AssistantTabConfig = {
  texture: 'feature-texture-1.png',
  left: {
    shell: shellLeftBottom,
    zoneEnter: enterSlideLeft,
    items: [
      {
        file: 'feature-role-1.png',
        alt: 'hero image',
        className:
          'block w-full max-w-none scale-140 translate-x-[16%] md:translate-x-[18%] translate-y-[10%]',
      },
    ],
  },
  right: {
    shell: shellRightTopScaled,
    itemEnter: enterRise,
    items: [
      {
        file: 'feature-subtitle-1.svg',
        alt: '英雄联盟助手',
        className: lineStartWide,
        delay: 0.34,
      },
      {
        file: 'feature-title-1.svg',
        alt: '符文与装备推荐',
        className: lineStartTitle,
        delay: 0.22,
      },
      {
        file: 'feature-inner-1.png',
        alt: '对局助手',
        className: 'block w-[120%] md:w-[110%] xl:w-[110%] max-w-none self-start',
        delay: 0.1,
      },
    ],
  },
}

// ── feature-3：AI 复盘 ───────────────────────────────────────────────────────

/** 画框壳：底层 frame，上层用 % 相对本壳定位 */
const aiFrameStackShell =
  'relative w-full max-w-none self-center overflow-visible md:w-[95%]'

const aiHdClass =
  'pointer-events-none absolute z-10 w-[40%] max-w-[11rem] max-md:left-[4%] max-md:top-0 max-md:-translate-y-[38%] md:left-[-1.5rem] md:top-[1.25rem] md:w-[46%] md:max-w-[12rem] md:-translate-y-[62%] xl:left-[-6rem] xl:top-[3rem] xl:w-[50%] xl:max-w-[13rem] xl:-translate-y-[80%]'

const aiFrameTextClass =
  'absolute left-[5%] top-[18%] h-[72%] w-[90%] max-w-none object-left-top max-md:top-[17%] max-md:h-[70%]'

const aiAvatarWrapClass =
  'pointer-events-none absolute w-[48%] max-md:right-[-4%] max-md:bottom-[52%] md:right-[-8%] md:bottom-[54%] md:w-[50%] xl:right-[-10%] xl:bottom-[55%] xl:w-[52%] motion-safe:animate-assistant-avatar-float motion-reduce:animate-none'

const tab3: AssistantTabConfig = {
  texture: 'feature-texture-1.png',
  left: {
    shell: shellLeftAiStack,
    zoneEnter: enterSlideLeft,
    items: [],
    stacks: [
      {
        shell: aiFrameStackShell,
        items: [
          { file: 'feature-ai-frame.png', alt: '', className: imgBlockFull },
          { file: 'feature-ai-hd.png', alt: '', className: aiHdClass },
          {
            file: 'feature-ai-frame-text.png',
            alt: 'AI 本局复盘',
            clipToFrame: true,
            className: aiFrameTextClass,
            clipReveal: { delay: 0.68, duration: 4 },
          },
          {
            file: 'feature-ai-avatar.png',
            alt: '',
            className: 'w-full scale-80',
            wrapClass: aiAvatarWrapClass,
          },
        ],
      },
    ],
  },
  right: {
    shell: shellRightEndScaled,
    zoneEnter: enterSlideRight10,
    zoneDelay: 0.1,
    itemEnter: enterSlideRight,
    items: [
      { file: 'feature-ai-subtitle.svg', alt: '英雄联盟', className: lineEndWide, delay: 0.34 },
      { file: 'feature-ai-title.svg', alt: 'AI 对局分析', className: lineEndTitle, delay: 0.22 },
    ],
    groups: [
      {
        shell: 'flex w-[55%] flex-col gap-5 self-start md:w-[50%] xl:w-[48%]',
        itemEnter: enterSlideRight,
        items: [
          { file: 'feature-ai-text1.svg', alt: '', className: imgBlockFullMax, delay: 0.1 },
          { file: 'feature-ai-text2.svg', alt: '', className: imgBlockFullMax, delay: 0.16 },
          { file: 'feature-ai-text3.svg', alt: '', className: imgBlockFullMax, delay: 0.22 },
        ],
      },
    ],
  },
}

export const assistantTabConfigs = {
  'feature-1': tab1,
  'feature-2': tab2,
  'feature-3': tab3,
} as const satisfies Record<'feature-1' | 'feature-2' | 'feature-3', AssistantTabConfig>