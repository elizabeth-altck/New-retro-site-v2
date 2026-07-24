#!/bin/bash
# Сбрасывает учёт правок при новом сообщении пользователя.
# Чаты настройки добавляет в excluded-chats.txt — там проверка не запускается.

set -euo pipefail

source "$(dirname "$0")/lib.sh"

input=$(cat)
conversation_id=$(echo "$input" | jq -r '.conversation_id // empty')
prompt=$(echo "$input" | jq -r '.prompt // empty')

ensure_state_dir
dir=$(state_dir)

echo "$conversation_id" > "$dir/current-conversation-id.txt"

if prompt_requests_no_review "$prompt"; then
  add_excluded_conversation "$conversation_id"
fi

: > "$dir/edited-this-turn.txt"

cd "$(repo_root)"
collect_git_site_changes > "$dir/git-at-turn-start.txt" || true

echo '{}'
