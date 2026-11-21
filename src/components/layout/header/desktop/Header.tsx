import { Link, NavLink } from 'react-router'
import {
  changelogLink,
  developerLinks,
  helpLink,
  mainNav,
  recruitLink,
  type ExternalLink,
} from '../../../../data/navigation.ts'
import { paths } from '../../../../app/router/paths.ts'
import { ActionButton } from '../../../shared/ActionButton.tsx'
import { DownloadIcon } from '../../../shared/icon/DownloadIcon.tsx'
import { LoginIcon } from '../../../shared/icon/LoginIcon.tsx'
import { Dropdown } from '../../../shared/Dropdown.tsx'
import { HeaderSearch } from '../HeaderSearch.tsx'

type HeaderProps = {
  onUndeveloped: () => void
}

export function Header({ onUndeveloped }: HeaderProps) {
  return (
    <div className="hidden h-full w-full items-center px-6 md:flex">
      <div className="flex shrink-0 items-center">
        <Link to={paths.home} className="inline-flex focus-ring">
          <img
            src="/logo/icon-logo.svg"
            alt="WeGame"
            className="block h-[36px] w-[36px] object-cover object-left xl:w-[160px] xl:object-contain xl:object-left"
          />
        </Link>
      </div>
      <nav className="flex h-full min-w-fit items-stretch" aria-label="主导航">
        {mainNav.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex h-full items-center px-3 xl:px-5 ${isActive ? 'header-link-current' : 'header-link'} focus-ring`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <Dropdown
          className="flex h-full"
          buttonClassName="h-full px-4 xl:px-5 header-link"
          label="开发者平台"
          items={developerLinks}
        />
      </nav>
      <HeaderSearch />
      <div className="ml-auto flex min-w-fit items-center gap-4 xl:gap-6">
        <IconLink link={recruitLink} />
        <IconLink link={changelogLink} />
        <IconLink link={helpLink} />
        <ActionButton
          label="下载客户端"
          icon={<DownloadIcon />}
          className="w-[138px]"
          onClick={onUndeveloped}
        />
        <ActionButton label="登录" icon={<LoginIcon />} className="w-[86px]" onClick={onUndeveloped} />
      </div>
    </div>
  )
}

function IconLink({ link }: { link: ExternalLink }) {
  if (!link.icon) {
    return null
  }

  const shine = link.id === 'recruit'

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      title={link.label}
      aria-label={link.label}
      className={`hidden xl:inline-flex focus-ring${
        shine
          ? " relative isolate overflow-hidden [mask-image:url('/images/header/link-entry-creator.png')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-mode:alpha]"
          : ''
      }`}
    >
      <img
        src={link.icon}
        alt=""
        className={shine ? 'block h-10 w-auto' : 'block size-8'}
      />
      {shine ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-[-30px] left-0 w-[30%] animate-creator-shine bg-[linear-gradient(to_right,transparent_0%,rgba(255,245,159,0.6)_40%,rgba(255,245,159,0.6)_70%,transparent_100%)] mix-blend-luminosity motion-reduce:hidden"
        />
      ) : null}
    </a>
  )
}

