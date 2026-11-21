import type { ExternalLink } from './navigation.ts'

export const channelLinks: readonly ExternalLink[] = [
  {
    id: 'wechat',
    label: 'WeChat',
    href: 'https://example.com/mock/channel/wechat',
  },
  {
    id: 'weibo',
    label: 'Weibo',
    href: 'https://example.com/mock/channel/weibo',
  },
  {
    id: 'bilibili',
    label: 'Bilibili',
    href: 'https://example.com/mock/channel/bilibili',
  },
]

export const friendLinks: readonly ExternalLink[] = [
  { id: 'indienova', label: 'INDIENOVA', href: 'https://indienova.com/' },
  { id: 'gwb', label: '腾讯 GWB', href: 'https://gwb.tencent.com/' },
  { id: 'ac', label: '腾讯动漫', href: 'https://ac.qq.com/' },
  { id: 'vqq', label: '腾讯视频', href: 'https://v.qq.com/' },
]

export const legalLinks: readonly ExternalLink[] = [
  { id: 'about', label: '关于腾讯', href: 'https://www.tencent.com/' },
  { id: 'terms', label: '服务条款', href: 'https://example.com/mock/terms' },
  { id: 'privacy', label: '隐私保护指引', href: 'https://example.com/mock/privacy' },
  {
    id: 'icp',
    label: 'ICP备案号：粤B2-20090059-376',
    href: 'https://beian.miit.gov.cn/',
  },
  {
    id: 'police',
    label: '粤公网安备 44030502008701号',
    href: 'https://www.beian.gov.cn/',
  },
]

export const copyrightText = '腾讯公司 版权所有'

