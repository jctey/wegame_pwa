import { useHomePager } from '../../providers/homePager.tsx'
import { sidenav } from '../../data/sidenav.ts'

const labelClass =
  'absolute leading-[calc(0.24*var(--nav-unit))] transition-opacity duration-200 ease-in-out'

export function SideNav() {
  const { activeId, goTo } = useHomePager()

  return (
    <nav
      aria-label="页面分区"
      className="fixed top-1/2 right-0 z-[11] hidden w-[calc(0.8*var(--nav-unit))] -translate-y-1/2 flex-col font-num xl:flex"
    >
      {sidenav.map((section) => {
        const active = section.id === activeId || (section.subPages?.includes(activeId) ?? false)
        return (
          <button
            key={section.id}
            type="button"
            aria-current={active ? 'true' : undefined}
            onClick={() => goTo(section.id)}
            className="focus-ring group relative flex h-[calc(0.64*var(--nav-unit))] w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 font-num text-[calc(0.18*var(--nav-unit))] leading-[calc(0.24*var(--nav-unit))] text-white"
          >
            <span
              className={`${labelClass} ${active ? 'opacity-0' : 'opacity-30 group-hover:opacity-0 group-focus-visible:opacity-0'}`}
            >
              {section.num}
            </span>
            <span
              className={`${labelClass} text-[calc(0.14*var(--nav-unit))] font-bold ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60 group-focus-visible:opacity-60'}`}
            >
              {section.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
