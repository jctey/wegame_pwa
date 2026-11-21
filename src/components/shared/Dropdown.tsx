import { useEffect, useId, useRef, useState } from 'react'
import type { ExternalLink } from '../../data/navigation.ts'

const dropChevron =
  'relative after:pointer-events-none after:absolute after:top-1/2 after:right-[3px] after:-mt-2 after:box-border after:size-2.5 after:rotate-45 after:border-2 after:border-current after:border-t-0 after:border-l-0 after:transition after:duration-200 after:content-[""]'

type DropdownProps = {
  label: string
  items: readonly ExternalLink[]
  className?: string
  buttonClassName?: string
}

export function Dropdown({ label, items, className, buttonClassName }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div
      ref={rootRef}
      className={className ? `relative ${className}` : 'relative'}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false)
        }
      }}
    >
      <button
        type="button"
        className={`inline-flex items-center ${dropChevron} ${buttonClassName ?? 'header-link'} focus-ring`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onFocus={() => setOpen(true)}
      >
        {label}
      </button>
      <div
        id={menuId}
        role="menu"
        aria-hidden={!open}
        className={`absolute top-[50px] left-1/2 z-30 w-[150px] -translate-x-1/2 overflow-hidden rounded border border-white/15 bg-[#131417] p-1.5 font-normal shadow-[0_10px_10px_0_rgba(0,0,0,0.1)] transition-opacity duration-[250ms] ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        {items.map((item) => (
          <a
            key={item.id}
            role="menuitem"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring block h-[30px] overflow-hidden rounded px-[19px] text-[13px] leading-[30px] text-white/50 transition duration-200 hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
