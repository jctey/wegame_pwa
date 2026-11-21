# UI Context

首页信息架构与响应式规则。改界面前读本文。参照 https://www.wegame.com.cn/home/ ，复刻结构，不复刻源码。

## 页面顺序

整页是深色沉浸式长页，右侧有锚点。顺序固定：

1. 顶栏
2. KV：背景视频，标题「轻装上阵 3.0」，按钮「下载 3.0 客户端」
3. 大作云集：标题「总有新东西」，两侧游戏海报轮播，主按钮在「尝新鲜的」与「搜想玩的」之间切换
4. 焕新
5. 助手
6. 开黑
7. 高校：滚动短句（如「蛋蛋君已完成高校认证」）
8. more
9. 页脚

右侧锚点只覆盖 2–7 的分组：`01 大作`、`02 焕新`、`03 助手`、`04 开黑`、`05 高校`。

EN: Dark immersive page. Order: header, KV video, game carousel, refresh, assistant, team-up, campus ticker, more, footer. Side nav labels: 01–05 for those five groups.

## 顶栏

从左到右：Logo、首页、商店、开发者平台（下拉：正式发行游戏、先锋测试游戏）、搜索框（占位文案可轮换，仅本地过滤）、视频创作者招募、更新日志、帮助与反馈、下载客户端（下拉：Windows、Mac Intel、Mac M）、登录。

桌面吸顶。手机收成汉堡菜单，下拉改成菜单内分组。商店、登录、外链只做界面，不接后端。

EN: Sticky header with logo, home, store, developer dropdown, local-only search, promo, changelog, help, download dropdown, and login. Collapse to a hamburger below the tablet breakpoint.

## 页脚

下载入口（Windows / Mac）、微信与视频号二维码、微博、bilibili、友情链接（INDIENOVA、腾讯 GWB、腾讯动漫、腾讯视频）、协议与备案文字。外链用 `target="_blank"` 与 `rel="noreferrer"`。

EN: Footer holds download links, QR codes, social links, friend links, and legal lines. External links open in a new tab.

## 断点

- 手机 `<768`：单列，隐藏右侧锚点，汉堡菜单，KV 缩短，海报改为横滑
- 平板 `768–1199`：顶栏收起次要项，海报两列或横滑，锚点可改为点状
- 桌面 `≥1200`：完整顶栏、右侧文字锚点、海报环绕标题

EN: Mobile under 768px, tablet 768–1199px, desktop from 1200px. Side text nav is desktop-only.

### 整屏区块的响应式规则

KV、大作云集、焕新等整屏区块都按下面的规则写。

- 高度统一：平板和桌面每屏都用 `md:min-h-svh`，不要单独给某一屏改高度。手机按内容定比例（KV `16/9`，大作云集 `1/1`，焕新 `6/5`）。
- 避开顶栏：顶栏固定，手机高 64px（`h-16`），平板及以上高 80px（`md:h-20`）。区块顶部的标题距顶写成 `max(Xvw, 顶栏高 + 间距)`，例如 `pt-[max(5vw,5rem)] md:pt-[max(5vw,6rem)]`。
- 成组定位：标题、副标题、按钮放进同一个 flex 列，用 `gap` 控制间距，不要各自用 `vw` 绝对定位。`vw` 定位只在 16:9 横屏成立，竖屏平板会挤在一起或空出一大片。
- 平板不贴底：桌面上贴底的内容（如焕新主框），在平板上改为与标题成组垂直居中（`md:max-xl:justify-center`），避免竖屏中间留白。
- 尺寸设下限：按钮、标题图在窄屏不能等比缩到看不清。用 CSS 变量加 `max()`，例如 `[--switch-w:max(18vw,10rem)]`，内部元素按这个变量算。
- 叠层跟父级走：叠在图片上的元素（搜索栏、光效偏移）用父级宽度的百分比或同一个 CSS 变量，不用视口 `vw`，否则父级在窄屏放大后会错位。
- 桌面不回退：改平板和手机时，用 `md:max-xl:` 或在 `xl:` 写回桌面值，`≥1200` 的位置保持不变。改完在 390×844、820×1180、1024×768、1920×1080 下量一次位置。

EN: Full-screen sections share `md:min-h-svh`; mobile heights follow content. Keep titles below the fixed header (64px mobile, 80px from md) with `max(vw, header + gap)`. Group title and buttons in one flex column instead of separate `vw` offsets. On tablet, center content vertically rather than pinning it to the bottom. Give buttons and title art minimum sizes via CSS variables with `max()`. Size overlays from the parent, not the viewport. Do not change desktop positions; verify at 390×844, 820×1180, 1024×768 and 1920×1080.

## 交互优先级

P0：顶栏下拉、移动端菜单、KV/海报轮播（自动播放、指示点、可手动切换）、吸顶导航。

P1：右侧锚点滚动定位、高校短句滚动、其余区块的基本悬停。

不做：真实搜索建议、登录态、视频创作者后台。

EN: P0 is dropdowns, mobile menu, carousels, and sticky nav. P1 is side-nav scrolling and the campus ticker. No live search or auth.

## 视觉

背景近黑，强调色橙。标题大字、按钮胶囊形。区块之间用斜切或渐变过渡即可，不必逐帧对齐原站。

EN: Near-black background, orange accent, large titles, pill buttons. Section transitions can be simple gradients.

## 资源

实现阶段把图片、视频、图标存到 `public/assets`。KV 视频过大时用海报图作降级。缺资源时用纯色占位，并在界面标明，不要留破图。

EN: Store assets in `public/assets`. Fall back to a poster if the KV video is too large. Use a labeled color block instead of a broken image.
