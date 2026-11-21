# Code Standards

写组件与样式时遵守。与本文冲突时，以更小、可读的改动为准。

## 语言与类型

- 函数组件，不用 class 组件
- TypeScript `strict`，公开 props 写显式类型
- 不用 `any`；不确定时用 `unknown` 再收窄
- 异步用 `async/await`
- 文件名与组件名用 PascalCase；hook 用 `use` 前缀；mock 文件用 camelCase

EN: Functional components, strict TypeScript, no `any`, async/await. PascalCase components, `use*` hooks, camelCase mock files.

## 组件

- 一个区块一个文件，页面文件只负责排列
- 同一逻辑出现第三次再提取
- 不把定位、轮播、菜单塞进同一个组件
- 列表必须有稳定 `key`，不用数组下标当 `key`（静态装饰除外）

EN: One section per file. Extract a helper only on the third use. Do not mix carousel, menu, and geolocation in one component.

## 状态

- 能由 props 算出的值不要再存 state
- 轮播的当前下标、菜单开关、悬浮定位面板状态可以是本地 state
- 副作用只用于定时器、观察器和浏览器 API，并在清理函数里拆除

EN: Do not store derived state. Local state is for the slide index, menu open flag, and floating location panel status. Clean up timers and observers.

## 样式

- 尽可能只用 Tailwind，不另起 CSS 框架
- 断点只用 `ui-context.md` 的三档：默认手机，`md` 平板，`xl` 桌面
- 颜色与圆角收成少量重复 class，不在每个区块写一套魔法数
- 交互控件需要可见的 focus 样式

EN: Tailwind only. Breakpoints match `ui-context.md`: default mobile, `md` tablet, `xl` desktop. Visible focus styles are required.

## 状态界面

凡是会等待或失败的块都要有四种界面：加载、空、成功、错误。至少包括图片、视频、定位。错误要说明发生了什么，并给出重试或返回首页。

EN: Async blocks need loading, empty, success, and error UI. Cover images, video, and geolocation. Errors need a retry or a link home.

## 文案与链接

界面文案用中文。代码标识符用英文。外链新窗口打开。不要把密钥、cookie 或真实下载地址逻辑写进客户端。

EN: Chinese UI copy, English identifiers. External links use a new tab. Do not put secrets or real download logic in the client.
