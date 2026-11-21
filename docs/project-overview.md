# Project Overview

给后续开发用的范围说明。先读本文，再读当前里程碑。

## 目标

用 React 与 TypeScript 做 WeGame 首页（https://www.wegame.com.cn/home/）的响应式 UI 模拟，并做成可安装的 PWA，部署到 Vercel。质量优先于 100% 还原：布局、响应式和硬性技术项高于逐个 hover 与深链。

EN: Build a responsive UI mock of the WeGame home portal as an installable PWA and deploy it to Vercel. Prefer clean layout, responsiveness, and the hard technical requirements over pixel-perfect effects.

## 交付物

- 公网可访问的 Vercel URL
- 桌面与手机浏览器均可安装
- 断网时显示离线页，或打开已缓存的界面
- 核心布局在桌面、平板、手机上可用

EN: Public Vercel URL, installable on desktop and mobile, offline fallback or cached UI, and a usable layout at three breakpoints.

## 范围内

- 首页视觉结构与主要交互（轮播、下拉、吸顶导航、移动端菜单）
- Web App Manifest、图标、Service Worker
- 本地 mock 数据，不接真实后端
- 有余力时做地理定位与本地货币（见 `bonus-geolocation.md`，优先级 P2；当前为全站悬浮挂件 + IP 推断）

EN: Home layout and core interactions, manifest, icons, service worker, local mock data only. Geolocation and currency are optional P2; shipped as a floating widget with IP-based country/currency.

## 范围外

- 真实登录、商店、下载、搜索接口
- 复制 WeGame 源码或现成模板克隆
- 逐像素复刻每一个动效与深链
- 自建后端

EN: No real auth, store, download, or search APIs. Do not clone WeGame source or a boilerplate. Skip pixel-perfect motion and deep links. No custom backend.

## 评分侧重

1. 组件结构、状态、CSS 架构
2. 桌面 / 平板 / 手机布局
3. 可安装 PWA 与离线行为
4. 加载、空、错误状态
5. 视觉完整度

EN: Judge structure, responsive layout, installable PWA and offline behavior, then loading/empty/error states, then visual completeness.

## 原创

布局与交互逻辑自己写。图片、视频、图标可从线上站点用开发者工具取得，实现时存到 `public/assets`，不要长期热链 CDN。

EN: Write layout and logic yourself. Assets may be taken from the live site, then stored under `public/assets`. Do not rely on hotlinking the CDN.
