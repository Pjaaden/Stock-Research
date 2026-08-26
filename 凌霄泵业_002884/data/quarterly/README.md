# 凌霄泵业（002884）季度财报 CSV 存档 · 数据字典

> 用途：按季度持续追加公司财报关键数据，积累长周期财务记录（利润表/资产负债表/现金流量表/分部收入）。
> 首次建档：2026-08-27（基于 2026 年半年度报告，2026-08-21 董事会批准报出）。
> 维护规范：见 `TRAE/QUARTERLY_CSV_WORKFLOW.md`（工作流总纲）。

## 文件清单

| 文件 | 内容 | 关键列 |
|---|---|---|
| `lingxiao_income_statement.csv` | 合并利润表（经营收益表） | `period` `item` `value` `unit` `note` |
| `lingxiao_balance_sheet.csv` | 合并资产负债表 | `period` `item` `value` `unit` `point_in_time` `note` |
| `lingxiao_cashflow_statement.csv` | 合并现金流量表 | `period` `item` `value` `unit` `note` |
| `lingxiao_segment_revenue.csv` | 分产品/分地区收入与毛利率 | `period` `dimension` `category` `revenue` `revenue_pct` `gross_margin_pct` `yoy_pct` `note` |

## 字段规范

- `period`：报告期标签，格式 `YYYYQn`（季度）/ `YYYYH1` / `YYYYH2` / `YYYY`（年报）。同一年报的"上年同期"仍用上年同期标签，例如 2026H1 报告内同时存在 `2026H1` 与 `2025H1`。
- `item`：报表科目名（与年报披露口径一致，保留"其中:"前缀科目）。
- `value`：数值（元），亏损/流出为负；`unit` 取值 `CNY`（元）/ `CNY_per_share`（元/股）/ `pct`（百分比）。
- `point_in_time`（资产负债表）：`期末` / `期初`。期初 = 期初资产负债表日（如 2026H1 的期初 = 2025-12-31）。
- `note`：口径说明、重分类说明、派生计算标注。派生指标（毛利率、OCF/净利、资产负债率等）在 note 中注明"派生计算"。
- 全部 CSV 为 UTF-8（带 BOM），可用 Excel / Numbers / Python pandas 直接读取。

## 追加规则（每期财报）

1. 从当季报告（合并口径）提取三张表 + 分部收入。
2. 按上述列结构**追加新 period 的行**（不要在旧行上覆盖；报表如有追溯调整，另加行并在 note 注明"追溯调整"）。
3. 保留报告内"上年同期"列作为独立 period 行（保证 CSV 可直接跨期对比）。
4. 更新本 README 的"建档/最近更新"日期，并在 `TRAE/reports/` 或研究报告中登记。
5. 同步在 `lingxiao_pump_*_analysis_*.html` 研究报告中引用本 CSV（作为数据底稿）。

## 数据底稿

- 2026H1 数据源：`2026年半年度报告全文`（2026-08-21 董事会批准，未经审计）。
- 2025H1 上年同期：同上报告内"上年同期"列。
- 2025-12-31 期初数：2025 年年度报告（2026-04-10 披露）。
