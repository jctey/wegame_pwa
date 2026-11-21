import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from 'motion/react'
import {
  fetchLocationDetect,
  type LocationInfo,
} from '../../api/home/locationDetact.api.ts'

/** 与首页 WeGame 橙 accent 一致，收起 / 展开共用 */
const ACCENT = '#ff8f00'
const SURFACE = '#111111'
const FAB_GRADIENT = `radial-gradient(circle at center, #000000 0%, ${ACCENT} 100%)`

const SIZE = 56
const PANEL_WIDTH = 300
const PANEL_HEIGHT = 280
const PADDING = 12
const PANEL_LIFT = PANEL_HEIGHT - SIZE

const SPRING_SNAP = { type: 'spring' as const, stiffness: 300, damping: 25 }
const SPRING_PANEL = { ...SPRING_SNAP, damping: 28 }

const ROWS: { label: string; key: keyof LocationInfo }[] = [
  { label: 'Location', key: 'location' },
  { label: 'Country Code', key: 'countryCode' },
  { label: 'Currency', key: 'currency' },
  { label: 'Longitude', key: 'longitude' },
  { label: 'Latitude', key: 'latitude' },
]

type PanelState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: LocationInfo }
  | { status: 'error'; message: string }

type DragBounds = {
  left: number
  right: number
  top: number
  bottom: number
}

/**
 * fixed + translate(x,y) 相对布局视口定位，不使用 visualViewport offset，
 * 否则页面滚动时 offsetTop 变化会把挂件带着一起挪。
 * 高度取 visualViewport.height（仅 resize 时更新），适配地址栏伸缩。
 */
function readViewportEdges(): DragBounds {
  if (typeof window === 'undefined') {
    return { left: PADDING, right: PADDING, top: PADDING, bottom: PADDING }
  }

  const width = window.innerWidth
  const height = window.visualViewport?.height ?? window.innerHeight

  return {
    left: PADDING,
    right: width - SIZE - PADDING,
    top: PADDING,
    bottom: height - SIZE - PADDING,
  }
}

function clampAlongEdge(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}

function shouldExpandUp(yPos: number, bounds: DragBounds): boolean {
  const midY = (bounds.top + bounds.bottom) / 2
  return yPos + SIZE / 2 >= midY
}

/** P2 悬浮定位挂件：可拖拽吸附左右，点击展开拉取 mock 地理信息 */
export default function FloatingWidget() {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('right')
  /** 挂件在屏幕下半区时，面板向上长，避免左下/右下展开时被裁出视口 */
  const [expandUp, setExpandUp] = useState(true)
  const [panel, setPanel] = useState<PanelState>({ status: 'idle' })

  const initialBounds = readViewportEdges()
  const x = useMotionValue(initialBounds.right)
  const y = useMotionValue(initialBounds.bottom)
  const [dragBounds, setDragBounds] = useState<DragBounds>(initialBounds)
  const controls = useDragControls()
  const didDrag = useRef(false)

  // 仅 resize / 地址栏伸缩时更新约束；不监听 visualViewport scroll（会与页面滚动联动）
  useEffect(() => {
    const syncBounds = () => {
      setDragBounds(readViewportEdges())
    }

    const syncBoundsAndClamp = () => {
      const bounds = readViewportEdges()
      setDragBounds(bounds)
      // 须等 motion 节点挂载后再改 MotionValue，否则会在 passiveEffect 上报错并拖垮整页
      requestAnimationFrame(() => {
        const cx = x.get()
        const cy = y.get()
        if (cx < bounds.left || cx > bounds.right) {
          void animate(x, clampAlongEdge(cx, bounds.left, bounds.right), { duration: 0 })
        }
        if (cy < bounds.top || cy > bounds.bottom) {
          void animate(y, clampAlongEdge(cy, bounds.top, bounds.bottom), { duration: 0 })
        }
      })
    }

    syncBounds()
    window.addEventListener('resize', syncBoundsAndClamp)
    window.visualViewport?.addEventListener('resize', syncBoundsAndClamp)

    return () => {
      window.removeEventListener('resize', syncBoundsAndClamp)
      window.visualViewport?.removeEventListener('resize', syncBoundsAndClamp)
    }
  }, [x, y])

  // 仅在展开时请求；收起时清空，下次展开重新拉取
  useEffect(() => {
    if (!open) {
      setPanel({ status: 'idle' })
      return
    }

    let cancelled = false
    setPanel({ status: 'loading' })

    fetchLocationDetect()
      .then((data) => {
        if (!cancelled) setPanel({ status: 'success', data })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setPanel({
            status: 'error',
            message:
              error instanceof Error
                ? error.message
                : '无法获取位置信息',
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [open])

  const onFabPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (open || e.button !== 0) {
      return
    }

    e.preventDefault()
    e.stopPropagation()
    didDrag.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
    controls.start(e)
  }

  const onFabPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const onDrag = () => {
    didDrag.current = true
  }

  const onDragEnd = () => {
    const bounds = readViewportEdges()
    const snapLeft = x.get() + SIZE / 2 < window.innerWidth / 2

    setSide(snapLeft ? 'left' : 'right')
    setExpandUp(shouldExpandUp(y.get(), bounds))
    animate(x, snapLeft ? bounds.left : bounds.right, SPRING_SNAP)
    animate(y, clampAlongEdge(y.get(), bounds.top, bounds.bottom), SPRING_SNAP)
  }

  const onFabClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (didDrag.current) {
      e.preventDefault()
      didDrag.current = false
      return
    }
    const nextOpen = !open
    if (nextOpen) {
      setExpandUp(shouldExpandUp(y.get(), dragBounds))
    }
    setOpen(nextOpen)
  }

  // 贴左时面板向右延伸，贴右时向左延伸，避免超出视口
  const panelOffsetX = open ? (side === 'left' ? 0 : SIZE - PANEL_WIDTH) : 0
  // 下半区：整体上移，底部仍对齐原 FAB 位置（transform-origin 对 width/height 动画无效）
  const panelOffsetY = open && expandUp ? -PANEL_LIFT : 0

  return (
    <motion.div
      drag={!open}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={dragBounds}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        zIndex: 9999,
        overflow: 'visible',
      }}
    >
      <motion.div
        animate={{
          width: open ? PANEL_WIDTH : SIZE,
          height: open ? PANEL_HEIGHT : SIZE,
          x: panelOffsetX,
          y: panelOffsetY,
          borderRadius: open ? 20 : 16,
        }}
        transition={SPRING_PANEL}
        className="relative overflow-hidden shadow-2xl"
        style={{ backgroundColor: SURFACE }}
      >
        {/* 收起态：整块为渐变 FAB；展开时隐藏，由面板头接管 */}
        <div
          role="button"
          tabIndex={open ? -1 : 0}
          onPointerDown={onFabPointerDown}
          onPointerUp={onFabPointerUp}
          onPointerCancel={onFabPointerUp}
          onClick={onFabClick}
          onKeyDown={(e) => {
            if (!open && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              setExpandUp(shouldExpandUp(y.get(), dragBounds))
              setOpen(true)
            }
          }}
          className={`absolute z-20 flex h-14 w-14 cursor-grab items-center justify-center text-2xl text-white active:cursor-grabbing ${expandUp ? 'bottom-0' : 'top-0'} ${side === 'left' ? 'left-0' : 'right-0'}`}
          style={{
            background: FAB_GRADIENT,
            borderRadius: 16,
            opacity: open ? 0 : 1,
            pointerEvents: open ? 'none' : 'auto',
            touchAction: 'none',
            userSelect: 'none',
          }}
          aria-label={open ? undefined : '打开位置信息'}
          aria-expanded={open}
        >
          📍
        </div>

        {open ? (
          <div className="flex h-full w-full flex-col text-white">
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center text-xl text-white"
                style={{ background: FAB_GRADIENT, borderRadius: 12 }}
                aria-hidden
              >
                📍
              </div>
              <div
                className="min-w-0 flex-1 px-3 font-semibold"
                style={{ color: ACCENT }}
              >
                Location Info
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-gray-400 transition hover:bg-white/10 hover:text-[#ff8f00]"
                aria-label="关闭"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-auto p-4">
              {panel.status === 'loading' ? (
                <p className="text-center text-sm text-gray-400">加载中…</p>
              ) : null}

              {panel.status === 'error' ? (
                <p
                  className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-3 text-center text-sm text-red-300"
                  role="alert"
                >
                  {panel.message}
                </p>
              ) : null}

              {panel.status === 'success'
                ? ROWS.map(({ label, key }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-0.5"
                    >
                      <span className="text-sm text-gray-400">{label}</span>
                      <span className="text-sm font-semibold text-white">
                        {panel.data[key]}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  )
}