export type GamePoster = {
  id: string
  title: string
  tone: string
}

export const games: readonly GamePoster[] = [
  { id: 'dnf', title: '地下城与勇士', tone: '#9a3412' },
  { id: 'delta', title: '三角洲行动', tone: '#1f2937' },
  { id: 'valorant', title: '无畏契约', tone: '#c2410c' },
  { id: 'lol', title: '英雄联盟', tone: '#1e3a8a' },
  { id: 'sanguosha', title: '三国杀', tone: '#7f1d1d' },
  { id: 'calabiyau', title: '卡拉彼丘', tone: '#5b21b6' },
  { id: 'wuthering', title: '鸣潮', tone: '#115e59' },
  { id: 'yiren', title: '异人之下', tone: '#334155' },
]

export function filterGames(query: string): GamePoster[] {
  const keyword = query.trim().toLowerCase()
  if (!keyword) {
    return [...games]
  }

  return games.filter((game) => game.title.toLowerCase().includes(keyword))
}
