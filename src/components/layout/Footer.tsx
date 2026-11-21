import { Link } from 'react-router'
import { paths } from '../../app/router/paths.ts'
import {
  channelLinks,
  copyrightText,
  friendLinks,
  legalLinks,
} from '../../data/footer.ts'
import { downloadLinks, type ExternalLink } from '../../data/navigation.ts'

const shellClass = 'mx-auto max-w-6xl px-4'
const sectionTitleClass = 'text-sm font-medium text-white/50'
const linkGridShellClass =
  'max-xl:flex max-xl:w-full max-xl:flex-col max-xl:items-center max-xl:text-center'
const friendListClassName =
  'mt-4 grid grid-cols-2 gap-x-6 gap-y-2 max-xl:mx-auto max-xl:w-fit max-xl:justify-items-center'

const linkSections = [
  { id: 'download', title: '下载客户端', links: downloadLinks, listClassName: 'mt-4 space-y-2' },
  { id: 'channel', title: '官方渠道', links: channelLinks, listClassName: 'mt-4 space-y-2' },
  {
    id: 'friends',
    title: '友情链接',
    links: friendLinks,
    listClassName: friendListClassName,
  },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div
        className={`${shellClass} grid gap-10 py-12 max-xl:justify-items-center md:grid-cols-2 xl:grid-cols-4`}
      >
        {linkSections.map(({ id, title, links, listClassName }) => (
          <FooterLinkSection
            key={id}
            title={title}
            links={links}
            listClassName={listClassName}
          />
        ))}
        <div className="flex w-full items-center justify-center md:col-span-2 xl:col-span-1">
          <Link to={paths.home} className="focus-ring inline-flex shrink-0">
            <img
              src="/logo/icon-logo.svg"
              alt="WeGame"
              className="block h-9 w-auto max-w-40 object-contain md:h-10 xl:max-w-[160px]"
            />
          </Link>
        </div>
      </div>
      <div
        className={`border-t border-white/10 py-6 max-xl:text-center ${shellClass}`}
      >
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-xl:max-w-md xl:justify-start">
          {legalLinks.map((item) => (
            <li key={item.id}>
              <ExternalAnchor link={item} tone="muted" />
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-white/35">{copyrightText}</p>
      </div>
    </footer>
  )
}

type FooterLinkSectionProps = {
  title: string
  links: readonly ExternalLink[]
  listClassName: string
}

function FooterLinkSection({ title, links, listClassName }: FooterLinkSectionProps) {
  return (
    <section className={linkGridShellClass}>
      <h2 className={sectionTitleClass}>{title}</h2>
      <ul className={listClassName}>
        {links.map((item) => (
          <li key={item.id}>
            <ExternalAnchor link={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ExternalAnchor({
  link,
  tone = 'default',
}: {
  link: ExternalLink
  tone?: 'default' | 'muted'
}) {
  const className =
    tone === 'muted'
      ? 'focus-ring text-xs text-white/45 hover:text-white/80'
      : 'focus-ring text-sm text-white/80 hover:text-white'

  return (
    <a href={link.href} target="_blank" rel="noreferrer" className={className}>
      {link.label}
    </a>
  )
}