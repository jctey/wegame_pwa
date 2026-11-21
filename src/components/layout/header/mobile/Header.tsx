import { useEffect, useState } from 'react'
import { ActionButton } from '../../../shared/ActionButton.tsx'
import { HeaderSearch } from '../HeaderSearch.tsx'
import { LoginIcon } from '../../../shared/icon/LoginIcon.tsx'
import { Menu } from './Menu.tsx'

type HeaderProps = {
  onUndeveloped: () => void
}

export function Header({ onUndeveloped }: HeaderProps) {
  const [open, setOpen] = useState(false)

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
    <div className="relative h-full md:hidden">
      <div className={`relative flex h-full items-center gap-3 px-6 ${open ? 'bg-black/95' : ''}`}>
        <button
          type="button"
          className="focus-ring relative size-6 shrink-0 scale-90 cursor-pointer"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          onClick={() => setOpen((current) => !current)}
        >
          <MenuIcon open={open} />
        </button>
        <HeaderSearch compact />
        <ActionButton label="登录" icon={<LoginIcon />} className="w-[86px]" onClick={onUndeveloped} />
      </div>
      <Menu open={open} onNavigate={() => setOpen(false)} />
    </div>
  )
}

const menuBar =
  'absolute top-1/2 left-0 h-0.5 w-full -mt-px rounded-full bg-[#9a9a9a] transition-transform duration-200 ease-[cubic-bezier(0.04,0.04,0.12,0.96)]'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-full" aria-hidden="true">
      <span
        className={`${menuBar} ${open ? '[transform:translateZ(0)_rotate(45deg)]' : '[transform:translate3d(0,-8px,0)]'}`}
      />
      <span className={`${menuBar} ${open ? 'hidden' : ''}`} />
      <span
        className={`${menuBar} ${open ? '[transform:translateZ(0)_rotate(-45deg)]' : '[transform:translate3d(0,8px,0)]'}`}
      />
    </span>
  )
}

