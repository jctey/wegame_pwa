# Progress Tracker

实现清单。做完一项把 `[ ]` 改成 `[x]`，并在该项下补一行结果。一次只做第一个未勾选项。

EN: Check items in order. After each one, mark it done and add a one-line result.

## P0 必做

- [x] 脚手架：Vite + React + TypeScript + Tailwind + React Router，`strict` 开启，本地可打开 `/`
  - 验收：`npm run dev` 能看到空白壳；`npm run build` 通过
  - 结果：Vite 8.3、React 19、TypeScript strict、Tailwind 4.3、React Router 8.5；`/` 重定向 `/home`；`npm run build` 通过
- [x] 首页骨架：顶栏、KV、大作云集轮播、页脚，数据来自 `src/data`
  - 验收：桌面能走完这四块；下拉和轮播可操作；无控制台报错
  - 结果：顶栏下拉、本地搜索、KV（本地视频与装饰图）、大作云集轮播（自动播放、指示点、手动切换、尝新鲜的/搜想玩的）和页脚已接 `src/data`
- [x] 三档响应式：`<768`、`768–1199`、`≥1200`
  - 验收：手机出汉堡菜单并隐藏右侧锚点；平板不溢出；桌面为完整顶栏
  - 结果：`md`（768）切换移动/平板顶栏；`xl`（75rem≈1200）出完整桌面顶栏与 `SideNav` 文字锚点；各整屏区块按 `ui-context.md` 使用 `md`/`xl` 比例与 `min-h-svh`
- [x] PWA：manifest、192/512 与 maskable 图标、Service Worker、离线页
  - 验收：生产构建可安装；断网打开站点能看到离线页或已缓存界面
  - 结果：`vite-plugin-pwa` 生成 manifest/SW；`public/icons` 占位图；`/offline` 独立页；`public/` 静态资源全量预缓存（含 `videos/`，约 49MB）；`freeipapi` 不缓存；**须在 `npm run preview`/Vercel 验 PWA，`npm run dev` 无 SW**
- [ ] 部署到 Vercel，SPA 回退生效
  - 验收：公网 URL 可打开 `/` 与 `/offline`；把 URL 写在本文件末尾

## P1 首页补全

- [x] 焕新、助手、开黑、高校、more
  - 验收：五块按 `ui-context.md` 的顺序出现，窄屏不横向溢出
  - 结果：`HomePage` 已按顺序挂载焕新（含 `RefreshAfterScroll`）、助手、开黑、高校、more；资源在 `public/`，窄屏用比例高度与横向约束
- [x] 右侧锚点滚动定位，高校短句滚动
  - 验收：桌面点击锚点滚到对应区块；手机不显示文字锚点
  - 结果：`homePager` + `SideNav`（仅 `xl` 显示）联动整屏切换；高校 `CampusTicker` 竖向滚动短句

## P2 加分

- [x] 定位、国家、货币（悬浮挂件）
  - 验收：展开后能看到国家与货币；失败时有说明；允许重试（收起再展开）。详见 `bonus-geolocation.md`
  - 结果：`AppLayout` 全局 `FloatingWidget`（`components/shared/FloatingButton.tsx`），点击展开后请求 `locationDetact.api`（IP 推断），展示国家、区号、货币；含加载/成功/错误态

## 结果

- Live URL: （部署后填写）