// size、x、y 是倍数，单位由组件按断点给出（桌面 size 与 x 为 vw，y 为 vh）。
export type TopicPoster = {
  src: string
  size: number
  x: number
  y: number
  delay: string
}

export const topicPosters: readonly TopicPoster[] = [
  { src: '/images/gameCarousel/poster-1.png', size: 12, x: -70, y: -18, delay: '-2.67s' },
  { src: '/images/gameCarousel/poster-2.png', size: 18, x: -48, y: -52, delay: '10.67s' },
  { src: '/images/gameCarousel/poster-3.png', size: 20, x: -12, y: -64, delay: '0s' },
  { src: '/images/gameCarousel/poster-4.png', size: 18, x: 28, y: -58, delay: '8s' },
  { src: '/images/gameCarousel/poster-5.png', size: 20, x: 62, y: -34, delay: '0.67s' },
  { src: '/images/gameCarousel/poster-6.png', size: 16, x: 74, y: 6, delay: '4s' },
  { src: '/images/gameCarousel/poster-7.png', size: 14, x: 64, y: 40, delay: '12s' },
  { src: '/images/gameCarousel/poster-8.png', size: 19, x: 36, y: 60, delay: '-1.33s' },
  { src: '/images/gameCarousel/poster-9.png', size: 17, x: 4, y: 68, delay: '9.33s' },
  { src: '/images/gameCarousel/poster-10.png', size: 20, x: -32, y: 56, delay: '5.33s' },
  { src: '/images/gameCarousel/poster-11.png', size: 15, x: -64, y: 32, delay: '13.33s' },
  { src: '/images/gameCarousel/poster-12.png', size: 18, x: -76, y: -4, delay: '6.67s' },
]
