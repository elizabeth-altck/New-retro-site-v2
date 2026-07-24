#!/bin/bash
# Запоминает, что агент изменил файл сайта в этом ходе (после сообщения пользователя).

set -euo pipefail

source "$(dirname "$0")/lib.sh"

input=$(cat)
file_path=$(echo "$input" | jq -r '.file_path // empty')

if [[ -z "$file_path" ]]; then
  echo '{}'
  exit 0
fi

root=$(repo_root)
rel=$(to_relative_path "$root" "$file_path")

if ! is_site_file "$rel"; then
  echo '{}'
  exit 0
fi

ensure_state_dir
list="$(state_dir)/edited-this-turn.txt"

if ! grep -Fxq "$rel" "$list" 2>/dev/null; then
  echo "$rel" >> "$list"
fi

echo '{}'
