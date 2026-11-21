import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ActionButtonVariant = 'default' | 'custom-1'

// 两种样式共用：高度、文字、悬停变白。
const sharedClass =
  'group relative inline-flex h-8 shrink-0 items-center justify-center text-[15px] leading-8 font-bold text-white/80 transition duration-150 ease-in-out hover:text-white'

// 图标叠在填充层上面，悬停时更亮。
const iconClass =
  'relative z-10 size-[18px] opacity-80 transition duration-150 ease-in-out group-hover:opacity-100 [&_svg]:size-full'

// 左上、右下各切掉 5px。
const cutCorner5 =
  '[clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]'
// 左上、右下各切掉 12px。
const cutCorner12 =
  '[clip-path:polygon(12px_0,calc(100%_-_2px)_0,100%_2px,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,2px_100%,0_calc(100%_-_2px),0_12px)]'

// default：半透明底，悬停放大并变成橙色。
const defaultClass =
  `after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-white/10 after:transition after:duration-200 after:ease-linear after:content-[""] after:${cutCorner5} hover:after:scale-[1.01] hover:after:bg-[#ff8f00]`

// custom-1：橙色从左填到右；离开时也从左褪到右。
const custom1Class =
  `overflow-hidden bg-white/10 ${cutCorner12} before:pointer-events-none before:absolute before:inset-0 before:origin-right before:[transform:scaleX(0)] before:bg-gradient-to-r before:from-[#ff8433] before:to-[#cc4100] before:transition-transform before:duration-300 before:ease-in-out before:content-[""] hover:before:origin-left hover:before:[transform:scaleX(1)]`

// custom-1：贴着缺角的 1px 浅色细边，让切角更清楚。
const custom1EdgeClass =
  'pointer-events-none absolute inset-0 z-[1] bg-white/15 [clip-path:polygon(evenodd,12px_0,calc(100%_-_2px)_0,100%_2px,100%_calc(100%_-_12px),calc(100%_-_12px)_100%,2px_100%,0_calc(100%_-_2px),0_12px,12px_0,13px_1px,calc(100%_-_3px)_1px,calc(100%_-_1px)_3px,calc(100%_-_1px)_calc(100%_-_13px),calc(100%_-_13px)_calc(100%_-_1px),3px_calc(100%_-_1px),1px_calc(100%_-_3px),1px_13px,13px_1px)]'

type ActionButtonProps = {
  label: string
  icon: ReactNode
  variant?: ActionButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

function variantClass(variant: ActionButtonVariant) {
  switch (variant) {
    case 'custom-1':
      return custom1Class
    case 'default':
      return defaultClass
  }
}

export function ActionButton({
  label,
  icon,
  variant = 'default',
  className,
  type = 'button',
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`${sharedClass} ${variantClass(variant)} ${className ?? ''} focus-ring`}
      {...props}
    >
      {variant === 'custom-1' ? <span className={custom1EdgeClass} aria-hidden="true" /> : null}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        <span className={iconClass}>{icon}</span>
        {label}
      </span>
    </button>
  )
}
