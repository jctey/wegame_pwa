# AI Workflow Rules

后续 AI 改这个仓库时的工作顺序。

## 开工前

按这个顺序读，读完再改代码：

1. `docs/project-overview.md`
2. `docs/progress-tracker.md` 里第一个未完成里程碑
3. 改界面则读 `docs/ui-context.md`
4. 改结构或依赖则读 `docs/architecture.md`
5. 写组件则读 `docs/code-standards.md`
6. 做 PWA 或部署则读 `docs/pwa-deploy.md`
7. 只有进度到 P2 才读 `docs/bonus-geolocation.md`

EN: Read the overview and the current milestone first, then only the doc that matches the change. Open the bonus doc only at P2.

## 一次一件事

- 只做当前里程碑，不提前做下一优先级
- 不顺手重构无关文件
- 不接真实后端，不复制 WeGame 源码
- 缺资源时用占位并记在进度文档，不阻断布局

EN: One milestone at a time. No drive-by refactors, no live backend, no copied WeGame source. Use a placeholder instead of blocking on a missing asset.

## 做完

- 把 `docs/progress-tracker.md` 对应项勾上，并写一行实际结果
- 界面改动要在桌面与手机宽度看过主路径
- 对用户用中文说明改了什么、如何验证、还没验证什么

EN: Check off the milestone and note the result. Review desktop and mobile for UI changes. Reply to the user in Chinese.

## 不确定时先问

- 需求、范围、技术选择或文档没写清时，先停下来问用户，不要自己猜着做
- 跑任何命令时，如果出错、被拒绝、结果和预期不符，或需要换一种做法，先说明现象和原因，再问用户怎么处理。不要自行重试、绕过或改用别的命令

EN: If a requirement or choice is unclear, ask before acting. If any command fails, is blocked, or does not match expectations, explain what happened and ask before retrying or switching approach.

## 禁止

- 为了看起来完整而一次生成全部区块的空壳海量文件
- 把 P2 定位写进 P0 组件
- 提交密钥、`.env` 凭证
- 用户没要求时不 git commit、不 push

EN: Do not scaffold every section at once, do not mix P2 into P0, do not commit secrets, and do not commit or push unless asked.
