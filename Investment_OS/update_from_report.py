#!/usr/bin/env python3
"""
Investment OS — Claude Code 自动更新脚本
用途：解析上传的年报/季报PDF，提取关键数字，自动更新 data/companies.json

使用方法（在终端中运行）：
  python3 update_from_report.py --company "赛轮集团" --pdf "2025_annual_report.pdf"

依赖：
  pip install pdfminer.six anthropic python-dotenv
"""

import json
import os
import sys
import argparse
import subprocess
from datetime import date
from pathlib import Path

# ── CONFIG ──────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).parent.parent  # adjust if needed
DATA_FILE = REPO_ROOT / "data" / "companies.json"
LOGS_FILE = REPO_ROOT / "data" / "logs.json"

COMPANY_ALIASES = {
    "赛轮": "c002", "赛轮集团": "c002", "601058": "c002",
    "中策": "c003", "中策橡胶": "c003", "603049": "c003",
    "国贸": "c001", "中国国贸": "c001", "600007": "c001",
    "华润": "c004", "华润万象": "c004", "万象生活": "c004", "01209": "c004",
    "绿城": "c005", "绿城服务": "c005", "2869": "c005",
    "霸王茶姬": "c006", "CHA": "c006",
}

# ── EXTRACTION PROMPTS ──────────────────────────────────────────────
EXTRACTION_PROMPT = """你是一个专业的财务分析师，正在分析中国上市公司的年报或季报。

请从以下财务报告文本中提取关键数据，严格按照JSON格式返回，不要有任何额外解释。

需要提取的字段（如果找不到某个字段，返回null）：
{
  "revenue_bn": 营收（亿元，数字）,
  "net_profit_bn": 归母净利润（亿元，数字）,
  "eps": 每股收益（元，数字）,
  "operating_cf_bn": 经营活动现金流净额（亿元，数字）,
  "total_assets_bn": 总资产（亿元，数字）,
  "interest_bearing_debt_bn": 有息负债合计（亿元，数字，包括短期借款+长期借款+应付债券）,
  "debt_ratio_pct": 资产负债率（%，数字）,
  "current_ratio": 流动比率（数字）,
  "inventory_bn": 存货（亿元，数字）,
  "receivables_bn": 应收账款（亿元，数字）,
  "due_within_1yr_bn": 一年内到期的非流动负债（亿元，数字）,
  "dividend_per_share": 每股股利（元，数字）,
  "report_period": 报告期（如"2025年全年"或"2025Q3"）,
  "key_findings": ["3条最重要的财务发现，每条不超过30字"]
}

报告文本：
{text}"""

# ── PDF EXTRACTION ──────────────────────────────────────────────────
def extract_pdf_text(pdf_path: str, max_chars: int = 50000) -> str:
    """Extract text from PDF using pdfminer.six"""
    try:
        from pdfminer.high_level import extract_text
        text = extract_text(pdf_path)
        # Focus on financial statement sections
        keywords = ['合并利润表', '合并资产负债表', '合并现金流量表', '主要财务数据', '经营成果']
        # Try to find relevant sections
        relevant = []
        for kw in keywords:
            idx = text.find(kw)
            if idx != -1:
                relevant.append(text[max(0,idx-100):idx+3000])
        if relevant:
            return '\n\n---\n\n'.join(relevant)[:max_chars]
        return text[:max_chars]
    except Exception as e:
        print(f"PDF提取失败：{e}")
        sys.exit(1)

# ── CLAUDE API CALL ─────────────────────────────────────────────────
def call_claude(text: str) -> dict:
    """Call Claude API to extract financial data"""
    try:
        import anthropic
        client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env
        msg = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=2000,
            messages=[{
                "role": "user",
                "content": EXTRACTION_PROMPT.format(text=text)
            }]
        )
        raw = msg.content[0].text.strip()
        # Strip markdown fences if any
        if raw.startswith('```'):
            raw = raw.split('```')[1]
            if raw.startswith('json'):
                raw = raw[4:]
        return json.loads(raw.strip())
    except Exception as e:
        print(f"Claude API调用失败：{e}")
        return {}

# ── UPDATE JSON ─────────────────────────────────────────────────────
def update_company_data(company_id: str, extracted: dict, report_period: str):
    """Update companies.json with extracted data"""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    company = next((c for c in data['companies'] if c['id'] == company_id), None)
    if not company:
        print(f"错误：找不到公司ID {company_id}")
        sys.exit(1)

    today = date.today().isoformat()
    data['_meta']['last_updated'] = today

    # Update fields if extracted values are non-null
    field_map = {
        'eps_forecast': 'eps',
        'data_as_of': 'report_period',
    }

    updated_fields = []
    for json_key, extract_key in [
        ('eps_forecast', 'eps'),
        ('data_as_of', 'report_period'),
    ]:
        val = extracted.get(extract_key)
        if val is not None:
            old = company.get(json_key)
            company[json_key] = val
            updated_fields.append(f"{json_key}: {old} → {val}")

    # Store baseline data
    if not company.get('baseline_data'):
        company['baseline_data'] = {}

    baseline_updates = ['revenue_bn','net_profit_bn','operating_cf_bn','total_assets_bn',
                       'interest_bearing_debt_bn','debt_ratio_pct','current_ratio',
                       'inventory_bn','receivables_bn','due_within_1yr_bn']
    for k in baseline_updates:
        v = extracted.get(k)
        if v is not None:
            company['baseline_data'][k] = v
            updated_fields.append(f"baseline.{k} = {v}")

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 已更新 {company['name']} ({company_id})")
    print(f"   报告期：{report_period}")
    print(f"   更新字段：")
    for f in updated_fields:
        print(f"     • {f}")
    if extracted.get('key_findings'):
        print(f"\n   关键发现：")
        for finding in extracted['key_findings']:
            print(f"     ★ {finding}")

    return company['name']

# ── GIT PUSH ────────────────────────────────────────────────────────
def git_push(company_name: str, report_period: str):
    """Commit and push updated data.json to GitHub"""
    try:
        os.chdir(REPO_ROOT)
        subprocess.run(['git', 'add', 'data/companies.json'], check=True)
        commit_msg = f"Update {company_name} data from {report_period} [{date.today()}]"
        subprocess.run(['git', 'commit', '-m', commit_msg,
                       '--author', 'Stock Research Bot <research@stockanalysis.local>'], check=True)
        subprocess.run(['git', 'pull', '--rebase', 'origin', 'main'], check=True)
        subprocess.run(['git', 'push'], check=True)
        print(f"\n🚀 已推送至 GitHub → Investment OS 将在刷新后显示最新数据")
    except subprocess.CalledProcessError as e:
        print(f"\n⚠️ Git推送失败：{e}")
        print("请手动运行：git add data/companies.json && git commit && git push")

# ── MANUAL UPDATE MODE ──────────────────────────────────────────────
def manual_update(company_id: str, updates: dict):
    """Manually update specific fields without PDF"""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    company = next((c for c in data['companies'] if c['id'] == company_id), None)
    if not company:
        print(f"错误：找不到公司 {company_id}"); sys.exit(1)
    data['_meta']['last_updated'] = date.today().isoformat()
    for k, v in updates.items():
        if '.' in k:  # nested, e.g. "baseline_data.eps"
            parts = k.split('.', 1)
            if parts[0] not in company: company[parts[0]] = {}
            company[parts[0]][parts[1]] = v
        else:
            company[k] = v
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ 已更新 {company['name']}: {updates}")
    return company['name']

# ── MAIN ────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description='Investment OS 数据更新工具')
    parser.add_argument('--company', required=True, help='公司名称或代码（如：赛轮集团 或 601058）')
    parser.add_argument('--pdf', help='年报PDF文件路径')
    parser.add_argument('--price', type=float, help='手动更新当前价格')
    parser.add_argument('--signal', choices=['buy','hold','sell','watch'], help='手动更新信号')
    parser.add_argument('--no-push', action='store_true', help='不自动push到GitHub')
    args = parser.parse_args()

    # Resolve company ID
    company_id = COMPANY_ALIASES.get(args.company, args.company)
    print(f"目标公司：{args.company} → ID: {company_id}")

    company_name = args.company
    report_period = date.today().strftime('%Y-%m-%d')

    # Mode 1: PDF extraction
    if args.pdf:
        print(f"📄 正在提取PDF：{args.pdf}")
        text = extract_pdf_text(args.pdf)
        print(f"   提取文本长度：{len(text)} 字符")
        print("🤖 正在调用Claude分析...")
        extracted = call_claude(text)
        if extracted:
            report_period = extracted.get('report_period', report_period)
            company_name = update_company_data(company_id, extracted, report_period)
        else:
            print("⚠️ Claude未能提取有效数据，请检查PDF内容")
            sys.exit(1)

    # Mode 2: Manual field updates
    manual_updates = {}
    if args.price is not None: manual_updates['price'] = args.price
    if args.signal: manual_updates['signal'] = args.signal
    if manual_updates:
        company_name = manual_update(company_id, manual_updates)

    if not args.pdf and not manual_updates:
        print("请指定 --pdf 或 --price/--signal 参数")
        parser.print_help()
        sys.exit(1)

    # Push to GitHub
    if not args.no_push:
        git_push(company_name, report_period)

if __name__ == '__main__':
    main()
