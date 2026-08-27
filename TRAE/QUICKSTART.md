# QUICKSTART · 日常操作速查卡

> 任何机器、任何会话的第一步先看这里。完整规则见 `TRAE/WORKFLOW.md`；当前状态见 `TRAE/HANDOFF.md`；文件导航见 `INDEX.md`。

## 1. 开工（每次会话第一件事）

```bash
git pull --rebase origin main          # 先拉最新，别基于旧状态干活
```

- 读 `TRAE/HANDOFF.md`：看「进行中任务」有没有别人（或上一台机器）留下的接续点
- 若该任务上次在另一台机器做过 → 读对应 `TRAE/sessions/YYYYMMDD_主题.md` 恢复上下文
- 新任务 → 读该标的目录、最近两份报告、`data/companies.json` 相关字段、`INDEX.md` 导航

## 2. 执行（WORKFLOW 标准步骤）

1. 判断任务类型：新立项 / 财报更新 / 事件跟踪 / JSON 同步 / 候选池维护
2. 把输入拆成三类：**新事实 / 旧观点修正 / 待验证问题**
3. 先产出研究报告层：浅色 HTML，文件名带日期（`YYYYMMDD_主题.html`），**放回该标的原因目录**
4. 再评估结构化层：只有工作台要消费的稳定字段才写 `data/*.json`（`signal` / `scenarios` / `checklist` / `price` 等）
5. 关键动作登记 `data/logs.json`

## 3. 收工 / 换机前（必做，约 5 分钟）

- 写 `TRAE/sessions/YYYYMMDD_主题.md`（模板：`TRAE/sessions/_模板.md`，字段含「下一步（换机接续点）」）
- 更新 `TRAE/HANDOFF.md`：进行中任务表 + 最近动态（≤5 条）
- 新建了报告 / 目录 → 同步更新 `INDEX.md` 对应表格与 README 条目

## 4. 推送（最后一步）

```bash
git pull --rebase origin main && git push origin main
```

- pull 在前：防止覆盖另一台设备刚推的提交
- 冲突时先比对差异（尤其 `data/*.json`），协商后合并，**不强行覆盖**

## 纪律红线

| 红线 | 说明 |
|---|---|
| 单一写者 | 同一时段尽量只有一台设备写 JSON / 推送，另一台只读 |
| pages/ 不入库 | 本地草稿区；定稿内容一律蒸馏到同步层（报告 + JSON + sessions） |
| 凭证按设备准备 | 机器B 走 SSH；机器A 另有 PAT 备用（到期记录 2026-10-21）；新设备 clone 后各自准备其一 |

## 常用命令速查

| 目的 | 命令 |
|---|---|
| 开工拉取 | `git pull --rebase origin main` |
| 查看状态 / 未推送提交 | `git status -sb` |
| 查看最近提交 | `git log --oneline -5` |
| 收工推送 | `git pull --rebase origin main && git push origin main` |
| 查看远端 | `git remote -v` |
