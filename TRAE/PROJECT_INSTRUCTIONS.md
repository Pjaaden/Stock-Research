# Stock Research · TRAE 项目说明（落地版）

本目录用于把 `PASTE_INTO_TREA_STOCK_RESEARCH.md` 里的“主提示”落成可执行的工作框架与工作流。

## 单一事实源

- GitHub 仓库：`https://github.com/Pjaaden/Stock-Research`
- 工作台（展示层）：`https://pjaaden.github.io/Stock-Research/Investment_OS/`
- 关键数据文件（结构化层）：
  - `data/companies.json`
  - `data/watchlist.json`
  - `data/logs.json`

## 三层结构（不要混）

- `研究报告层`：仓库中各公司目录下的浅色底 `HTML`/`DOCX` 等研究文件，承载完整论证与阶段性判断
- `结构化数据层`：`data/*.json`，只存工作台需要消费的稳定字段
- `展示层`：`Investment_OS/index.html`，负责读取结构化数据并展示；工作台的“同步”会写回 GitHub（需要 PAT）

## 输出规则

- 新增研究默认输出浅色底 `HTML`，文件名带日期
- 同一标的新增报告优先放回原目录，不新起并行目录
- 只有真正需要被工作台读取的结构化信息才写入 `JSON`

## 默认工作顺序（每次任务都遵守）

1. 判断任务属于：新立项 / 财报更新 / 事件跟踪 / JSON 同步 / 候选池维护
2. 读取该标的已有目录、最近两份报告、`README.md`（如存在）以及相关 `data/*.json`
3. 明确哪些是新事实，哪些是旧观点修正（不要把“新消息”直接写成“新结论”）
4. 先产出研究文件（报告/附录/事件复盘），再给出结构化更新建议
5. 如需同步仓库：明确目标路径、文件名、README 更新点和 JSON 字段变更

## 不要做的事

- 不要忽略已有研究直接从零写
- 不要在未核对目录与字段的情况下写回 `JSON`
- 不要在没有确认凭证/权限的情况下承诺“已推送 GitHub”

## 项目内入口

- 原始主提示：`/PASTE_INTO_TREA_STOCK_RESEARCH.md`
- 工作流说明：`TRAE/WORKFLOW.md`
- 输出与命名：`TRAE/OUTPUT_RULES.md`
- 试运行报告：`TRAE/reports/`
