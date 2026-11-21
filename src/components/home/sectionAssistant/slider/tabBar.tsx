import { tabAsset } from './tabs.ts'

export const assistantTabs = [
  { id: 'feature-1', icon: 'feature-item-1.svg', label: '助手能力一' },
  { id: 'feature-2', icon: 'feature-item-2.svg', label: '助手能力二' },
  { id: 'feature-3', icon: 'feature-item-3.svg', label: '助手能力三' },
] as const

export type AssistantTabId = (typeof assistantTabs)[number]['id']

type TabBarProps = {
  active: number
  onChange: (index: number) => void
}

// 选中项底部光晕；mix-blend-screen 去掉 PNG 黑底。
function TabLight() {
  return (
    <img
      src={tabAsset('feature-item-lights.png')}
      alt=""
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[125%] max-w-none -translate-x-1/2 object-bottom mix-blend-screen"
    />
  )
}

// 外链 SVG 的 currentColor 不生效，用 mask 喷白色图形。
function TabIcon({ file }: { file: string }) {
  const src = tabAsset(file)
  return (
    <span
      aria-hidden
      className="relative z-[1] block aspect-[180/57] h-[min(9vh,3.25rem)] w-full max-w-[10rem] bg-white mask-contain mask-center mask-no-repeat"
      style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
    />
  )
}

// 底栏 Tab：三等分宽；图标在栏内竖直居中，选中光仍贴各列底边。
export function AssistantTabBar({ active, onChange }: TabBarProps) {
  return (
    <div
      className="relative flex h-auto min-h-[6.5rem] max-h-[24%] w-full shrink-0 items-stretch overflow-visible border-t border-white/10 px-16 pb-0 pt-2"
      role="tablist"
      aria-label="助手功能"
    >
      {assistantTabs.map(({ id, icon, label }, index) => {
        const selected = active === index
        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`assistant-tab-${id}`}
            aria-selected={selected}
            aria-controls={`assistant-panel-${id}`}
            onClick={() => onChange(index)}
            className={`focus-ring relative flex h-full min-w-0 flex-1 items-center justify-center overflow-visible px-2 pb-0 transition-opacity duration-200 ${selected ? '' : 'opacity-45 hover:opacity-80'}`}
          >
            {selected ? <TabLight /> : null}
            <TabIcon file={icon} />
            <span className="sr-only">{label}</span>
          </button>
        )
      })}
    </div>
  )
}