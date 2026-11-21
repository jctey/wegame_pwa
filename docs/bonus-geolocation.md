# Bonus: Geolocation and Currency

P2，可选。当前仓库**已实现**为全局悬浮挂件，不再做独立 `/locale` 页面。

## 已实现（FloatingWidget）

入口：`src/components/shared/FloatingButton.tsx`，由 `layouts/AppLayout.tsx` 挂在全站。

1. 收起态为可拖拽 FAB，吸附左右边
2. **用户点击展开**后才请求地理信息（不对首页区块嵌入）
3. 数据来自 `src/api/home/locationDetact.api.ts` → `freeipapi` JSON（按 IP 推断国家），映射展示：
   - Location（国家名）
   - Country Code（电话区号，如 `+86`）
   - Currency（货币代码）
4. 面板状态：`idle` / `loading` / `success` / `error`；收起后清空，再次展开会重新请求
5. 结果仅存在于组件 state，不写后端

EN: Shipped as a draggable floating widget. Fetch runs only after expand. Country and currency come from an IP-based API client-side. States: loading, success, error. Retry by closing and reopening.

### 与下文「原规格」的差异

| 原规格 | 当前实现 |
|--------|----------|
| 独立路由 `/locale` | 无该路由，全站悬浮入口 |
| `navigator.geolocation` + 静态经纬度表 | IP API；无浏览器定位权限弹窗 |
| 拒绝权限专用文案 | 不适用；网络/API 失败走 `error` 文案 |

若需对齐原规格，可再补 `/locale` 或把 Floating 改为 Geolocation + 静态表回退；交作业以进度表与本文「已实现」为准。

## 原规格（参考）

以下为早期文档约定，便于对照评分项中「加载、拒绝、失败」等要求。

### 行为

1. 用户点击后才调用 `navigator.geolocation`，不要进页就弹权限
2. 拿到坐标后得到国家码，再映射货币
3. 展示国家与货币代码，例如印尼 IDR、马来西亚 MYR、美国 USD、中国 CNY
4. 结果只存在本次会话，不写入后端

EN: Call Geolocation only after a click. Map coordinates to a country, then to a currency. Show at least IDR, MYR, USD, and CNY. Keep the result in the session only.

### 映射

默认用客户端静态表：粗略经纬度范围到国家码，再由国家码到货币。反向地理编码（免费接口）是可选增强；接口失败必须退回静态表或错误态，不能空白。

最少国家：ID、MY、US、CN。未知地区显示「未能识别」并仍给出界面，不抛未捕获异常。

EN: Default to a client-side lat/lng range table. A reverse-geocoding API is optional. On failure, fall back to the table or the error state. Unknown regions stay on screen as unrecognized.

### 界面状态

- 尚未请求：说明用途与按钮
- 加载：定位中
- 成功：国家、货币代码、货币名称
- 拒绝：浏览器拒绝权限，说明如何在浏览器里重试
- 失败：超时、不支持 Geolocation、或坐标无法映射

EN: Required states: idle, loading, success, permission denied, and failure. Denied and failure need a retry.

### 边界

- 只在安全上下文（localhost 或 HTTPS）调用定位
- 不请求持续监听，用一次定位
- 不把坐标打到日志或第三方分析

EN: Geolocation only on localhost or HTTPS, one-shot, no coordinate logging.