import { useEffect, useId, useRef, useState } from 'react'
import { fetchHotSearch, type HotSearchItem } from '../../../api/home/hotSearch.api.ts'

type HeaderSearchProps = {
  compact?: boolean
}

type LoadStatus = 'loading' | 'error' | 'success'

export function HeaderSearch({ compact = false }: HeaderSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<HotSearchItem[]>([])
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [requestId, setRequestId] = useState(0)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | null>(null)
  const inputId = useId()
  const listId = useId()
  const names = items.map((item) => item.game_name)
  const placeholder = names[placeholderIndex] ?? '搜索游戏'
  const keyword = query.trim().toLowerCase()
  const visibleItems = keyword
    ? items.filter(
        (item) =>
          item.game_name.toLowerCase().includes(keyword) ||
          item.search_game_name.toLowerCase().includes(keyword),
      )
    : items

  useEffect(() => {
    let cancelled = false

    setStatus('loading')
    setErrorMessage('')

    fetchHotSearch()
      .then((list) => {
        if (cancelled) {
          return
        }
        setItems(list)
        setPlaceholderIndex(0)
        setStatus('success')
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }
        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : '热搜加载失败')
      })

    return () => {
      cancelled = true
    }
  }, [requestId])

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    if (open || query.trim() || names.length === 0) {
      return
    }

    const timer = window.setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % names.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [open, query, names.length])

  return (
    <div
      ref={rootRef}
      className={`font-normal ${compact ? 'relative min-w-0 flex-1' : 'relative ml-6 mr-2 min-w-0 max-w-72 flex-1 xl:ml-10'}`}
      onFocus={() => {
        if (closeTimer.current !== null) {
          window.clearTimeout(closeTimer.current)
        }
        setOpen(true)
      }}
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
          return
        }
        closeTimer.current = window.setTimeout(() => {
          if (!rootRef.current?.contains(document.activeElement)) {
            setOpen(false)
          }
        }, 0)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false)
        }
      }}
    >
      <label className="sr-only" htmlFor={inputId}>
        搜索游戏
      </label>
      <div
        className="group relative h-9 rounded bg-white/10 transition-colors duration-200 ease-linear hover:bg-white/20 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent"
      >
        <input
          id={inputId}
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-expanded={open}
          aria-controls={listId}
          onChange={(event) => setQuery(event.target.value)}
          className="h-full w-full bg-transparent pr-10 pl-2.5 text-sm text-white outline-none placeholder:text-[#e3e3e3]/50"
        />
        <button
          type="button"
          aria-label="搜索"
          className="absolute inset-y-0 right-1 w-[30px] cursor-pointer opacity-70 transition-opacity duration-200 ease-linear group-hover:opacity-100 hover:opacity-100"
        >
          <SearchMark />
        </button>
      </div>
      {open ? (
        <div
          id={listId}
          className={
            compact
              ? 'fixed inset-x-0 top-16 z-50 max-h-[70vh] overflow-auto bg-[#131417] px-5 py-5 text-xs text-white/60'
              : 'absolute top-10 left-0 z-50 max-h-[620px] min-w-[400px] overflow-auto rounded border border-white/15 bg-[#131417] px-5 py-5 text-xs text-white/60'
          }
        >
          <HotSearchPanel
            status={status}
            errorMessage={errorMessage}
            items={visibleItems}
            onRetry={() => setRequestId((current) => current + 1)}
            onPick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  )
}

function HotSearchPanel({
  status,
  errorMessage,
  items,
  onRetry,
  onPick,
}: {
  status: LoadStatus
  errorMessage: string
  items: readonly HotSearchItem[]
  onRetry: () => void
  onPick: () => void
}) {
  if (status === 'loading') {
    return <p className="text-sm">加载中</p>
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-3 text-sm">
        <p>{errorMessage}</p>
        <button
          type="button"
          className="focus-ring rounded px-2 py-1 text-white hover:bg-white/10"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onRetry}
        >
          重试
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="pb-2 text-base">WeGame 热搜</p>
      {items.length === 0 ? (
        <p className="text-sm">没有匹配的热搜</p>
      ) : (
        <div className="-mx-2.5">
          {items.map((item, index) => (
            <a
              key={item.item_id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group/item inline-flex h-10 w-1/2 items-center overflow-hidden rounded-sm py-0 pr-[30px] pl-2.5 transition-colors duration-200 ease-linear hover:bg-[rgba(227,227,227,0.2)]"
              onMouseDown={(event) => event.preventDefault()}
              onClick={onPick}
            >
              <span
                className={`mr-2 flex size-4 shrink-0 items-center justify-center rounded-sm text-xs font-bold ${rankClass(index)}`}
              >
                {index + 1}
              </span>
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-sm text-white/60 group-hover/item:text-white">
                  {item.game_name}
                </span>
                {item.is_new === 1 ? <span className="shrink-0 text-xs text-[#fe4358]">新</span> : null}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function rankClass(index: number) {
  if (index === 0) {
    return 'bg-[linear-gradient(91.11deg,#fe4358_0.95%,#ff6f00_96.92%)] text-black'
  }
  if (index === 1) {
    return 'bg-[linear-gradient(90deg,#ff6f00,#ff9d2b)] text-black'
  }
  if (index === 2) {
    return 'bg-[linear-gradient(90deg,#ffad37,#ffc561_49.5%,#ffe073)] text-black'
  }
  return 'bg-white/20 text-white'
}

function SearchMark() {
  return (
    <span className="relative block size-full" aria-hidden="true">
      <svg viewBox="0 0 18 18" className="absolute inset-0 m-auto size-[18px] opacity-100 transition-opacity duration-200 ease-linear group-hover:opacity-0">
        <circle cx="8" cy="8" r="5.2" fill="none" stroke="#e3e3e3" strokeWidth="1.6" />
        <path d="M12 12.2L15.2 15.4" fill="none" stroke="#e3e3e3" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100">
        <span className="absolute top-1/2 left-1/2 size-4 -mt-2 -ml-2 rounded-full bg-[#e3e3e3]" />
        <span className="absolute top-1/2 left-1/2 size-4 -mt-2 -ml-2">
          <span className="absolute top-[7px] left-[3px] h-0.5 w-0 rounded-full bg-[#36373b] opacity-0 transition-[width,opacity] duration-200 ease-out group-hover:w-2.5 group-hover:opacity-100 group-hover:animate-[search-arrow-grow_0.35s_ease-in-out]">
            <span className="absolute top-0 right-px h-0.5 w-1.5 origin-bottom-right rounded-full bg-[#36373b] group-hover:rotate-45 group-hover:animate-[search-arrow-before_0.35s_ease-in-out_0.15s]" />
            <span className="absolute top-0 right-px h-0.5 w-1.5 origin-top-right rounded-full bg-[#36373b] group-hover:-rotate-45 group-hover:animate-[search-arrow-after_0.35s_ease-in-out_0.15s]" />
          </span>
        </span>
      </span>
    </span>
  )
}
