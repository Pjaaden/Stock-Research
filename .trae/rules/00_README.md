# .trae/rules —— TRAE 项目规则（本地化副本）

本目录是 TRAE 自动加载的项目规则（每次在本项目打开会话时自动注入上下文）。

- 内容来源：仓库 `TRAE/*.md`（已跟踪的权威版本）
- 本目录为本地化副本：TRAE 约定 `.trae/rules/*.md` 才会被自动加载，`TRAE/` 目录仅作为归档
- 重新同步：任何机器克隆仓库后执行 `cp TRAE/*.md .trae/rules/` 即可恢复

## 规则文件一览

| 文件 | 作用 |
|---|---|
| `PROJECT_INSTRUCTIONS.md` | 项目主说明：单一事实源、三层结构、默认工作顺序、禁止事项 |
| `WORKFLOW.md` | 可执行工作流：任务分类、标准步骤、失败保护 |
| `OUTPUT_RULES.md` | 输出与命名规则（HTML 报告 / JSON / 展示层） |
| `GITHUB_CREDENTIAL_POLICY.md` | GitHub 凭证规则（PAT 有效期、安全边界） |
| `WORKBENCH_AND_DATA_SCOPE.md` | 工作台与数据范围（报告 > JSON 的分工） |
| `QUARTERLY_CSV_WORKFLOW.md` | 季度财报 CSV 存档工作流（试点：凌霄泵业 002884） |

## 本地位置（本地化后）

- 项目根目录：`/Volumes/TiPlus71001TB/Users/zhijian/Documents/Trae/Stock-Research`
- 本地凭证目录：`TRAE_LOCAL/`（git 忽略，存放 `GITHUB_PAT.local`）
- 多页面任务工作区：`pages/`（git 忽略，本地保存不推送）
