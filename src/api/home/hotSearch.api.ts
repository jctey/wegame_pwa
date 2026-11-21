import type { ApiResult } from '../request.ts'
import { request } from '../request.ts'
import { constApi } from '../constApi.ts'
import { hotSearchMock } from '../../mock/home/hotSearch.ts'

export type HotSearchItem = {
  game_id: string
  game_name: string
  is_new: number
  position: number
  url: string
  source: string
  item_id: number
  jump_url_type: string
  jump_appid: string
  search_game_name: string
  rank_rise: number
}

export type HotSearchResponse = {
  result: ApiResult
  hot_search_list: HotSearchItem[]
  trace_id: string
}

export async function fetchHotSearch(): Promise<HotSearchItem[]> {
  const data = await request<HotSearchResponse>({
    url: constApi.home.hotSearch,
    mock: hotSearchMock,
  })

  return [...data.hot_search_list].sort((left, right) => left.position - right.position)
}
