# 输出与命名规则

## 研究报告层（HTML）

- 默认输出：浅色底 `HTML`
- 文件名：`YYYYMMDD_主题.html`（仓库现有文件多为 `YYYYMMDD` 结尾或中间，建议保持一致）
- 落点：同一标的放回该标的目录（以 `data/companies.json` 的 `research_folder` 为准，且必须与真实目录一致）

示例（仓库既有风格）：

- `中国国贸_综合估值更新_20260402.html`
- `赛轮认知校准_两条IR披露_20260623.html`

## 结构化数据层（JSON）

允许写回的典型字段：

- `data/companies.json`
  - `price`、`signal`、`scenarios`、`checklist`、`research_notes`（只在需要工作台展示时更新）
- `data/watchlist.json`
  - 候选公司条目（轻量字段）
- `data/logs.json`
  - 关键操作日志（长期保留）

不建议写回的内容：

- 长篇推理
- 一次性事件的临时观点

## 展示层（Investment_OS）

`Investment_OS/index.html` 会从 GitHub 读取 `data/*.json` 渲染界面。

注意：工作台里的“同步”需要用户在设置页配置 GitHub PAT（写入权限）。
