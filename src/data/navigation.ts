import { paths } from '../app/router/paths.ts'

export type InternalNavItem = {
  id: string
  label: string
  to: string
}

export type ExternalLink = {
  id: string
  label: string
  href: string
  icon?: string
}

export const mainNav: readonly InternalNavItem[] = [
  { id: 'home', label: '首页', to: paths.home },
  { id: 'store', label: '商店', to: paths.store },
]

export const developerLinks: readonly ExternalLink[] = [
  {
    id: 'released',
    label: '正式发行游戏',
    href: 'https://example.com/mock/developer/released',
  },
  {
    id: 'playtest',
    label: '先锋测试游戏',
    href: 'https://example.com/mock/developer/playtest',
  },
]

export const downloadLinks: readonly ExternalLink[] = [
  {
    id: 'windows',
    label: 'Windows',
    href: 'https://example.com/mock/download/windows',
  },
  {
    id: 'mac-intel',
    label: 'Mac Intel',
    href: 'https://example.com/mock/download/mac-intel',
  },
  {
    id: 'mac-m',
    label: 'Mac M',
    href: 'https://example.com/mock/download/mac-m',
  },
]

export const recruitLink: ExternalLink = {
  id: 'recruit',
  label: '视频创作者招募计划',
  href: 'https://example.com/mock/recruit',
  icon: '/images/header/link-entry-creator.png',
}

export const changelogLink: ExternalLink = {
  id: 'changelog',
  label: '更新日志',
  href: 'https://example.com/mock/changelog',
  icon: '/images/header/link-entry-changelog.svg',
}

export const helpLink: ExternalLink = {
  id: 'help',
  label: '内容与反馈',
  href: 'https://example.com/mock/help',
  icon: '/images/header/link-entry-feedback.svg',
}

export type NavItem = InternalNavItem | ExternalLink

export function isInternalNavItem(item: NavItem): item is InternalNavItem {
  return 'to' in item
}

export const mobileMenu: readonly NavItem[] = [...mainNav, ...developerLinks, recruitLink]
