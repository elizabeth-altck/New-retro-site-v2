#!/bin/bash
# Запускает site-checker только если пользователь написала агенту
# и агент реально изменил файлы сайта в этом ходе.

set -euo pipefail

source "$(dirname "$0")/lib.sh"

input=$(cat)
status=$(echo "$input" | jq -r '.status // "completed"')
loop_count=$(echo "$input" | jq -r '.loop_count // 0')
conversation_id=$(echo "$input" | jq -r '.conversation_id // empty')

# Не проверять после авто-follow-up (site-checker и т.п.)
if [[ "$status" != "completed" ]] || [[ "$loop_count" -ne 0 ]]; then
  echo '{}'
  exit 0
fi

# Чат настройки / явно исключённый — не трогаем
if is_excluded_conversation "$conversation_id"; then
  echo '{}'
  exit 0
fi

# Временная пауза
if is_review_paused; then
  echo '{}'
  exit 0
fi

dir=$(state_dir)
edited_list="$dir/edited-this-turn.txt"

# Главное условие: агент изменил файлы сайта именно в этом ходе
if [[ ! -f "$edited_list" ]] || [[ ! -s "$edited_list" ]]; then
  echo '{}'
  exit 0
fi

changed_files=$(sort -u "$edited_list")
file_count=$(echo "$changed_files" | wc -l | tr -d ' ')
file_list=$(echo "$changed_files" | sed 's/^/- /')

followup=$(cat <<EOF
Use the site-checker subagent to review recent changes in GIF WORLD.

Changed files (${file_count}):
${file_list}

The subagent must write a plain-Russian report to .cursor/agents/site-checker-report.txt. Do not fix site code.
EOF
)

jq -n --arg msg "$followup" '{followup_message: $msg}'
