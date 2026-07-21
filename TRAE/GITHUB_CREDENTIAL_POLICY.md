# GitHub 凭证说明

## 用途

本项目允许在需要时使用 GitHub PAT 执行：

- 读取 GitHub API
- 校验远端分支状态
- 推送本地提交
- 排查工作台同步问题

## 当前记录

- 当前这一轮 PAT 的有效期记录为：`2026-10-21`
- 当前本地 PAT 文件路径：`TRAE_LOCAL/GITHUB_PAT.local`

## 安全规则

- 明文 PAT 可写入本地忽略文件
- 明文 PAT 不提交到 Git 历史
- 明文 PAT 不放入 `README`、`TRAE/WORKFLOW.md`、`TRAE/PROJECT_INSTRUCTIONS.md`
- PAT 默认从 `TRAE_LOCAL/GITHUB_PAT.local` 读取，并在执行命令时临时注入

## 到期后的处理

如果日期接近或超过 `2026-10-21`：

1. 默认认为旧 PAT 可能不可用
2. 在需要 GitHub 写入前先向用户确认
3. 用户提供新 PAT 后再恢复 `push` 或 API 写入

## 原则

项目文档记录“凭证存在、用途、有效期、处理规则”；明文凭证只保留在本地忽略文件中。
