# Claude Code 使用指南 · Investment OS 自动化

更新日期：2026-04-03

---

## 这份指南解决什么问题

你上传年报PDF → Claude Code自动提取关键财务数字 → 更新 `data/companies.json` → 
push到GitHub → 工作台打开自动显示最新数据。

整个流程约2分钟，无需手动编辑JSON。

---

## 第一步：安装 Claude Code

Claude Code 是一个在你电脑终端里运行的工具。

### macOS / Linux
```bash
# 1. 确认已安装 Node.js（打开终端输入）
node --version   # 需要 v18 或以上

# 如果没有 Node.js，先安装：
# macOS: brew install node
# 或去 https://nodejs.org 下载

# 2. 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 3. 验证安装
claude --version
```

### Windows
```powershell
# 在 PowerShell 中：
npm install -g @anthropic-ai/claude-code
claude --version
```

---

## 第二步：首次配置

```bash
# 打开终端，登录（会打开浏览器让你授权）
claude login

# 或者用API Key方式（推荐，更稳定）：
# 去 https://console.anthropic.com 获取API Key，然后：
export ANTHROPIC_API_KEY="your-key-here"
# Windows: set ANTHROPIC_API_KEY=your-key-here
```

---

## 第三步：克隆仓库到本地（只需一次）

```bash
# 在你想存放的目录下运行：
git clone https://github.com/Pjaaden/Stock-Research.git
cd Stock-Research
```

---

## 第四步：日常使用场景

### 场景A：上传年报，自动提取数据

```bash
# 进入仓库目录
cd Stock-Research

# 安装Python依赖（只需一次）
pip install pdfminer.six anthropic

# 上传年报后运行（把PDF放在仓库目录下）：
python3 Investment_OS/update_from_report.py \
  --company "赛轮集团" \
  --pdf "赛轮集团2025年年度报告.pdf"

# 运行后会：
# 1. 提取PDF关键财务数字
# 2. 调用Claude分析
# 3. 更新 data/companies.json
# 4. 自动push到GitHub
# 5. 工作台刷新即可看到新数据
```

### 场景B：手动更新价格/信号（最常用）

```bash
# 更新赛轮集团价格
python3 Investment_OS/update_from_report.py \
  --company "赛轮集团" \
  --price 10.5

# 更新信号
python3 Investment_OS/update_from_report.py \
  --company "中国国贸" \
  --signal "buy"

# 同时更新价格和信号
python3 Investment_OS/update_from_report.py \
  --company "中策橡胶" \
  --price 24.8 \
  --signal "hold"
```

### 场景C：用 Claude Code 对话方式更新（最灵活）

```bash
# 在仓库目录下启动Claude Code
cd Stock-Research
claude

# 然后直接用中文对话：
```

在Claude Code对话界面里，你可以说：

> "帮我把赛轮集团的当前价格更新为10.5，信号改为buy，并push到GitHub"

> "我刚上传了这个年报PDF：[文件路径]，帮我提取财务数据更新到companies.json"

> "把绿城服务的1-2年应收款监控清单第一项标记为已完成"

> "帮我在操作日志里记录：今天买入了赛轮集团5%仓位，价格9.2，原因是TBR涨价确认"

---

## 工作台访问地址

GitHub Pages部署后，访问：
**https://pjaaden.github.io/Stock-Research/Investment_OS/**

（需要在GitHub仓库Settings → Pages → 选择main分支 → 保存）

---

## 更新数据的三种方式对比

| 方式 | 适用场景 | 操作复杂度 | 速度 |
|------|---------|-----------|------|
| 在这个Chat界面让Claude更新JSON | 大多数情况 | ★☆☆☆☆ | 中 |
| 用Python脚本（场景A/B） | 有PDF年报时 | ★★☆☆☆ | 快 |
| Claude Code对话 | 复杂更新/多字段 | ★★☆☆☆ | 快 |

**最简单的日常流程：**
1. 在这个Chat界面上传年报PDF
2. 让Claude提取数据并更新JSON
3. Claude帮你push到GitHub
4. 工作台刷新即可

---

## data/companies.json 手动编辑指南

如果你想直接编辑JSON（用VS Code或任何文本编辑器）：

```json
{
  "companies": [
    {
      "id": "c002",            ← 不要修改
      "price": 10.5,           ← 当前市价，直接改这里
      "signal": "buy",         ← buy / hold / sell / watch
      "position_pct": 10,      ← 你的当前仓位%
      "scenarios": [
        {
          "prob": 25,          ← 概率（三个加起来=100）
          "target_price": 16   ← 目标价
        }
      ]
    }
  ]
}
```

修改后：
```bash
git add data/companies.json
git commit -m "Update prices [2026-04-03]"
git push
```

---

## 常见问题

**Q: GitHub Pages怎么开启？**
A: 进入 https://github.com/Pjaaden/Stock-Research → Settings → Pages → Source选"main"分支 → 保存。约1分钟后生效。

**Q: 工作台显示"无法连接GitHub"？**
A: 正常——浏览器安全策略限制跨域，工作台会用缓存数据。在本地文件系统打开HTML没有这个限制。

**Q: 操作日志存哪里？**
A: 浏览器localStorage（本地）。可以通过"导出日志"按钮下载JSON，然后把内容合并到 `data/logs.json` 推送到GitHub永久存档。

**Q: 多台设备同步？**
A: 数据（情景、笔记、清单）已在GitHub同步。仓位/价格覆盖存在localStorage，需要手动在各设备输入，或写入companies.json统一管理。
