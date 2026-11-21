// 停手后再执行最后一次。搜索输入用这个。
// const search = debounce((keyword: string) => run(keyword), 300)
// search('原神')
// search.cancel()

export type Debounced<Args extends readonly unknown[]> = ((...args: Args) => void) & {
  cancel: () => void
}

export function debounce<Args extends readonly unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): Debounced<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const debounced: Debounced<Args> = (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }

  debounced.cancel = () => {
    clearTimeout(timer)
  }

  return debounced
}
