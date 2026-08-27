# Stock Research · 项目文件索引（总入口）

> **项目位置（唯一）**：`/workspace/Stock Research`
> **建立日期**：2026-08-25 ｜ 本文件是项目的唯一入口：找文件、找规则、找任务都从这里开始。

---

## 〇、最近动态与进行中任务

> 完整版见 `TRAE/HANDOFF.md`（换机/开工第一眼）

- **进行中**：凌霄泵业 2026Q3 CSV 追加（10 月末）｜ 已投资标的研究补全（霸王茶姬、凌霄泵业）
- **最近动态**（新→旧）：2026-08-27 工作流优化（sessions/ 交接档案 + HANDOFF + 多设备规范）→ 2026-08-27 凌霄泵业 2026H1 报告 + 季度 CSV 建档 → 2026-08-26 本地化迁移与连通性测试 → 2026-08-25 工作流完整性审计 → 2026-07-31 草甘膦行业深度研究

---

## 一、快速导航

| 想做什么 | 去哪里 |
|---|---|
| 了解项目规则与工作流 | `TRAE/PROJECT_INSTRUCTIONS.md` · `TRAE/WORKFLOW.md` · `TRAE/OUTPUT_RULES.md` |
| 主提示原文（整段粘贴用） | `PASTE_INTO_TREA_STOCK_RESEARCH.md` |
| 开展/查看多页面任务 | `pages/INDEX.md`（本地保存，不推送） |
| 查看/维护研究数据 | `data/companies.json` · `data/watchlist.json` · `data/logs.json` |
| 打开工作台（展示层） | 线上：`https://pjaaden.github.io/Stock-Research/Investment_OS/` ｜ 代码：`Investment_OS/index.html` |
| 查看试运行/审计报告 | `TRAE/reports/` |
| 换机/开工先看（当前状态） | `TRAE/HANDOFF.md` |
| 查看会话交接档案 | `TRAE/sessions/`（每会话一篇，入库） |
| 推送 GitHub（自动） | `TRAE/push_with_local_pat.sh` |
| 本地凭证（PAT） | `TRAE_LOCAL/`（仅本地，不进入 git） |

---

## 二、单一事实源

- GitHub 仓库：`https://github.com/Pjaaden/Stock-Research`（默认分支 `main`，自动推送工作流）
- 工作台（展示层）：`https://pjaaden.github.io/Stock-Research/Investment_OS/`
- 关键数据文件（结构化层）：
  - `data/companies.json`（公司估值/情景/监控清单，9 条）
  - `data/watchlist.json`（候选池，6 条）
  - `data/logs.json`（操作日志存档）

---

## 三、公司研究目录（9 家）

| 公司 | 代码 | 状态 | 信号 | research_folder | HTML 数 |
|---|---|---|---|---|---|
| 中国国贸 | 600007.SH | active | watch | `中国国贸_600007` | 6 |
| 赛轮集团 | 601058.SH | active | hold | `赛轮集团_601058` | 34 |
| 华润万象生活 | 01209.HK | active | hold | `华润万象生活_01209HK` | 4 |
| 绿城服务 | 2869.HK | active | watch | `绿城服务_2869HK` | 1 |
| 霸王茶姬 | CHA | active | watch | `霸王茶姬_NASDAQ_CHA` | 1 |
| 凌霄泵业 | 002884.SZ | active | hold | `凌霄泵业_002884` | 2 |
| 百胜中国 | YUMC | active | hold | `百胜中国_NASDAQ_YUMC` | 3 |
| 中航信 | 00696 | active | buy | `中航信_HKEX_00696` | 1 |
| 中策橡胶 | 603049.SH | hidden | hold | `赛轮集团_601058`（并入赛轮研究） | — |

> 已投资 5 家：中国国贸 / 赛轮集团 / 霸王茶姬 / 凌霄泵业 / 百胜中国
> 研究薄弱需补全（已投资）：霸王茶姬、凌霄泵业

---

## 四、行业与市场研究

- `草甘膦_行业研究/`：行业深度分析报告（2026-07-31）+ 数据（现货价/出口 CSV）+ 数据字典 + 来源索引
- `市场机制研究/`：交易规则修订解读（2026-07-05，docx + html）
- `恒隆地产_0101HK/`、`华夏大悦城REIT_180603/`、`杭州解百_600814/`：商业地产板块研究
- `报喜鸟_002154/`、`东航物流_601156/`：观察名单 / 深度研究
- `CASHFLOW_VISUAL_SPEC.md`：现金流瀑布图规范

---

## 五、多页面任务工作区（pages/）

- 用途：每个页面 = 一个任务/对话线（如财报更新、事件跟踪、候选池维护）
- 说明：**页面文件仅保存在本地**，不推送到 GitHub（保证任务过程保密）
- 入口：`pages/INDEX.md` ｜ 新建页面模板：`pages/_模板.md`

---

## 六、试运行与审计报告（TRAE/reports/）

| 报告 | 日期 | 内容 |
|---|---|---|
| 试运行_工作流完整性审计_20260825.md | 2026-08-25 | 文件/JSON/目录一致性审计 + 2026H1 更新标的梳理 |
| 试运行_GitHub读写测试_20260721.md | 2026-07-21 | GitHub 读取/写入测试记录 |
| 试运行_research_folder校验_20260721.md | 2026-07-21 | research_folder 与目录一致性校验 |
| 试运行_问题汇总与建议_20260721.md | 2026-07-21 | 目录不一致问题分析与修正建议 |

---

## 七、规则与脚本（TRAE/）

- `PROJECT_INSTRUCTIONS.md`：项目说明（落地版）
- `WORKFLOW.md`：可执行工作流（先读旧资料 → 产出报告 → 再评估 JSON → 最后同步）
- `OUTPUT_RULES.md`：输出与命名规则
- `WORKBENCH_AND_DATA_SCOPE.md`：工作台与数据边界理解
- `GITHUB_CREDENTIAL_POLICY.md`：GitHub 凭证使用规则
- `QUARTERLY_CSV_WORKFLOW.md`：季度财报 CSV 存档工作流（试点：凌霄泵业 002884，见 `凌霄泵业_002884/data/quarterly/`）
- `HANDOFF.md`：当前状态速览（进行中任务 + 最近动态），换机/开工第一眼
- `sessions/`：会话交接档案（每会话一篇 `YYYYMMDD_主题.md`，模板 `_模板.md`；把对话里的推理/待办沉淀为可同步历史）
- `push_with_local_pat.sh`：本地 PAT 自动推送脚本

---

## 八、本地凭证（TRAE_LOCAL/，不推送）

- `GITHUB_PAT.local`：本地保存的 GitHub PAT（有效期记录 2026-10-21）
- `README.local.md`：本地凭证使用说明
- 该目录已通过 `.git/info/exclude` 排除，**不进入 git 跟踪、不推送远端**

---

## 九、索引维护规则

- 新增公司研究目录 / 新报告 / 新页面后，同步更新本索引对应表格
- 页面文件一律放 `pages/`，并在 `pages/INDEX.md` 登记
- 任务结束或换机前：写 `TRAE/sessions/` 交接档案，并更新 `TRAE/HANDOFF.md` 与 `data/logs.json`
- 只有需要工作台/展示层消费的结构化信息才写入 `data/*.json`
