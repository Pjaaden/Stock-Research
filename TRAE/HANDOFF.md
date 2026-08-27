# HANDOFF · 当前状态速览（换机/开工前先看这里）

> 用途：多设备协作的“第一眼”。开工前读它恢复上下文；收工/换机前更新它。
> 规则：只保留当前进行中任务 + 最近动态（≤5 条）；详细推理与论证写 `TRAE/sessions/`（每会话一篇，入库）。

## 当前进行中任务

| 任务 | 状态 | 接续点 | 最后更新 |
|---|---|---|---|
| 本机（机器B）推送凭证配置 | 待配置 | 方案已定：SSH 优先（key 已验证），执行 set-url 后首次 push 验证 | 2026-08-27 |
| 凌霄泵业 2026Q3 季报 CSV 追加 | 待财报 | 预计 2026-10 末发布后，追加 `2026Q3`（补 `2025Q3` 上年同期） | 2026-08-27 |
| 已投资标的研究补全（霸王茶姬、凌霄泵业） | 待补 | 见 INDEX 标记，两标的当前研究较薄 | 2026-08-27 |

## 最近动态（新→旧，≤5 条）

1. 2026-08-27 工作流优化：新增 `TRAE/sessions/` 交接档案 + `HANDOFF.md` + 多设备协作规范（INDEX / README / WORKFLOW / logs 同步）
2. 2026-08-27 凌霄泵业 2026H1 三张表对比 + 估值报告；季度财报 CSV 存档工作流试点（002884，建档 2026H1+2025H1）
3. 2026-08-26 本地化迁移与 GitHub 连通性测试（SSH 通道验证通过）
4. 2026-08-25 工作流完整性审计（目录/JSON/字段一致性）
5. 2026-07-31 草甘膦行业深度研究上线（含现货价/出口 CSV 数据文件）

## 设备与凭证状态

| 设备 | 仓库位置 | push 凭证 | 状态 |
|---|---|---|---|
| 机器A（原机） | `/Volumes/TiPlus71001TB/Users/zhijian/Documents/Trae/Stock-Research` | SSH key + `TRAE_LOCAL/GITHUB_PAT.local`（PAT 到期记录 2026-10-21） | 可读可写 |
| 机器B（本机） | `/Users/Shared/Projects/Stock-Research` | SSH key 已注册可用；origin 尚为 HTTPS（只拉不推） | 待执行 set-url → 可读写 |

## 多设备纪律（摘要，完整版见 `TRAE/WORKFLOW.md`）

- 开工前：`git pull --rebase origin main` + 读本文件与相关 `TRAE/sessions/`
- push 前：`git pull --rebase origin main`，避免覆盖另一台设备的提交
- 同一时段尽量只有一台设备做 JSON 写入与推送
- 收工/换机前：写 `TRAE/sessions/YYYYMMDD_主题.md` + 更新本文件 + 关键动作登记 `data/logs.json`
- `pages/` 为本地草稿区不入库；定稿一律蒸馏到同步层
