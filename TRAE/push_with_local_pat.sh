#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PAT_FILE="$REPO_ROOT/TRAE_LOCAL/GITHUB_PAT.local"

if [[ ! -f "$PAT_FILE" ]]; then
  echo "PAT file not found: $PAT_FILE" >&2
  exit 1
fi

PAT="$(tr -d '\r\n' < "$PAT_FILE")"
if [[ -z "$PAT" ]]; then
  echo "PAT file is empty: $PAT_FILE" >&2
  exit 1
fi

export TRAE_GITHUB_PAT="$PAT"
AUTH="$(python3 - <<'PY'
import base64, os
pat = os.environ["TRAE_GITHUB_PAT"]
print(base64.b64encode(f"x-access-token:{pat}".encode()).decode())
PY
)"

git -C "$REPO_ROOT" \
  -c http.https://github.com/.extraheader="AUTHORIZATION: basic ${AUTH}" \
  push origin main
