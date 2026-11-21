import { NavLink } from 'react-router'
import { isInternalNavItem, mobileMenu } from '../../../../data/navigation.ts'
type MenuProps = {
  open: boolean
  onNavigate: () => void
}

function menuMotion(open: boolean) {
  return open
    ? 'max-h-[600px] bg-black/90 backdrop-blur-[10px] transition-[max-height] duration-[900ms] ease-[cubic-bezier(0.41,0.43,0,1)]'
    : 'max-h-0 bg-[#1e1e20] transition-[max-height] duration-[250ms] ease-[cubic-bezier(0.04,0.04,0.12,0.96)]'
}

function menuLinkClass(id: string) {
  const tall = id === 'released' || id === 'playtest'
  const line =
    id === 'playtest'
      ? ''
      : 'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[rgba(255,255,255,0.12)] after:content-[""]'
  const topLine =
    id === 'recruit'
      ? 'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[rgba(255,255,255,0.12)] before:content-[""]'
      : ''

  return `relative mx-5 block pl-5 text-left text-sm font-normal hover:text-[#ff9928] active:bg-white/15 ${tall ? 'h-[50px] leading-[50px]' : 'h-[45px] leading-[45px]'} ${line} ${topLine}`
}

export function Menu({ open, onNavigate }: MenuProps) {
  return (
    <nav
      id="mobile-menu"
      aria-label="手机菜单"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-x-0 top-16 z-30 overflow-hidden ${menuMotion(open)}`}
    >
      <div className="pb-5">
        {mobileMenu.map((item) =>
          isInternalNavItem(item) ? (
            <NavLink
              key={item.id}
              to={item.to}
              end
              className={({ isActive }) =>
                `${menuLinkClass(item.id)} ${isActive ? 'text-[#ff9928]' : 'text-white'} focus-ring`
              }
              onClick={onNavigate}
            >
              {item.label}
            </NavLink>
          ) : (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`${menuLinkClass(item.id)} text-white focus-ring`}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          ),
        )}
      </div>
    </nav>
  )
}
