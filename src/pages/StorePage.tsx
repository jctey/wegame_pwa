import { Link } from 'react-router'
import { paths } from '../app/router/paths.ts'

export function StorePage() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 md:min-h-[calc(100svh-5rem)]">
      <div className="w-full max-w-sm rounded-lg border border-accent bg-panel px-6 py-10 text-center">
        <p className="text-xs text-white/45">商店</p>
        <h1 className="mt-2 text-lg font-bold text-white">功能未开发</h1>
        <p className="mt-3 text-sm text-white/60">完整商店界面将在后续里程碑接入，当前仅保留路由占位。</p>
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