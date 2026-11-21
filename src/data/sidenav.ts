import { homePageId, type HomePageId } from './homePages.ts'

export type SideNavItem = {
  id: HomePageId
  num: string
  label: string
  // 不进侧栏、停留时高亮本项的子屏
  subPages?: readonly HomePageId[]
}

export const sidenav: readonly SideNavItem[] = [
  { id: homePageId.games, num: '01', label: '大作' },
  { id: homePageId.refresh, num: '02', label: '焕新', subPages: [homePageId.refreshNext] },
  { id: homePageId.assistant, num: '03', label: '助手' },
  { id: homePageId.team, num: '04', label: '开黑' },
  { id: homePageId.campus, num: '05', label: '高校' },
]
