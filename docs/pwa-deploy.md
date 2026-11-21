# PWA and Deploy

可安装与公网部署是硬性交付。做 P0 的 PWA 与 Vercel 两项时读本文。

## Manifest

使用 Web App Manifest，至少包含：

- `name`: `WeGame`
- `short_name`: `WeGame`
- `start_url`: `/`
- `scope`: `/`
- `display`: `standalone`
- `background_color` 与 `theme_color`：近黑
- `icons`: 192 与 512，并提供 `purpose: "maskable"` 的一套

图标放在 `public/icons`。缺少正式图标时用纯色加字标，不能缺文件。

EN: Manifest name is WeGame, display is standalone, start URL is `/`. Ship 192 and 512 icons plus a maskable set under `public/icons`.

## Service Worker

用 vite-plugin-pwa 生成，不手写一份容易漏缓存的脚本。

- 预缓存应用壳：入口 HTML、JS、CSS、离线页
- 图片与视频运行时缓存，并设上限，避免把大视频无限写入
- 导航请求失败时回落到离线页
- 不缓存第三方 API

开发环境可以关闭 SW，以免干扰热更新。用生产构建验收。

EN: Generate the worker with vite-plugin-pwa. Precache the app shell and offline page. Cache media at runtime with a cap. Fall back to the offline page when a navigation fails.

## 离线页

路由 `/offline`。说明当前离线，并提供返回首页。页面本身要被预缓存。已缓存过首页时，允许直接打开缓存的 UI，二选一即可，文档验收写明实际行为。

EN: `/offline` explains the offline state and links home. Precache it. Either this page or the cached UI satisfies the requirement; record which one shipped.

## 构建与 Vercel

- 构建命令：`npm run build`
- 输出目录：Vite 默认 `dist`
- `vercel.json` 把未知路径重写到 `/index.html`，否则刷新 `/offline` 会 404
- 不把 `.env` 密钥提交进仓库

EN: Build with `npm run build`, output `dist`, and rewrite unknown paths to `/index.html` so `/offline` survives refresh.

## 验收

1. 桌面 Chrome：安装到桌面，离线打开仍有界面
2. 手机或设备模拟：manifest 可识别，图标不变形
3. 公网 URL 写入 `progress-tracker.md` 末尾

EN: Install on desktop Chrome and open it offline. Confirm the mobile manifest and icons. Record the public URL in the progress tracker.
