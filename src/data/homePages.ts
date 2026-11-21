// 首页分屏 id。对象是唯一写法，数组顺序即滚轮切屏顺序。
export const homePageId = {
  kv: 'kv',
  games: 'games',
  refresh: 'refresh',
  refreshNext: 'refresh-next',
  assistant: 'assistant',
  team: 'team',
  campus: 'campus',
  more: 'more',
} as const

export const homePages = [
  homePageId.kv,
  homePageId.games,
  homePageId.refresh,
  homePageId.refreshNext,
  homePageId.assistant,
  homePageId.team,
  homePageId.campus,
  homePageId.more,
] as const

export type HomePageId = (typeof homePageId)[keyof typeof homePageId]
