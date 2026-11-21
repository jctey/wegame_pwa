import { Link } from 'react-router'
import { paths } from '../app/router/paths.ts'

export function OfflinePage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-lg border border-accent/40 bg-panel px-6 py-10 text-center">
        <p className="text-xs text-white/45">网络不可用</p>
        <h1 className="mt-2 text-lg font-bold text-white">当前处于离线状态</h1>
        <p className="mt-3 text-sm text-white/60">
          请检查网络连接。若你曾打开过首页，可尝试从浏览器历史记录进入已缓存的页面。
        </p>
        <Link
          to={paths.home}
          className="focus-ring mt-8 inline-flex rounded-full bg-accent px-6 py-2 text-sm font-semibold text-black"
        >
          返回首页
        </Link>
      </div>
    </main>
  )
}