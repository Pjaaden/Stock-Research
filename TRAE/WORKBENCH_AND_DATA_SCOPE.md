# 工作台与数据范围（理解稿）

## 工作台是什么

`Investment_OS/index.html` 是“展示层”，它会从 GitHub 仓库读取 `data/*.json` 并渲染界面。

关键点（来自 `Investment_OS/GUIDE.md`）：

- 工作台本身不存储长期数据：打开时从 GitHub 拉取 JSON
- “同步”按钮会把修改写回 GitHub，但需要在设置页配置 GitHub PAT
- 仓位/资金池等部分信息可能只存在浏览器本地（localStorage），不一定进入 `data/*.json`

## data/*.json 的边界

`data/` 是“结构化层”，只存工作台必须消费的稳定字段。

- `data/companies.json`
  - 公司维度：信号、情景、估值参数、监控清单、研究摘要（可读展示）
  - `research_folder`：工作台用于列出报告文件的目录路径（必须是仓库内的真实路径，且是相对仓库根目录的路径）
- `data/watchlist.json`
  - 候选池：轻量条目（公司名、代码、关注理由、优先级等）
- `data/logs.json`
  - 操作日志：适合长期保留、可追溯的决策记录

## 报告与 JSON 的分工

优先级：`报告 > JSON`。

- 报告：写完整论证、阶段性判断、推理过程、反证与风险
- JSON：写“要被工作台直接消费并用于看板/筛选/计算”的字段

如果不确定某段内容应不应该写入 JSON，默认先写入报告，再把“建议写回字段”单独列出来供确认。

