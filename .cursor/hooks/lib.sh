#!/bin/bash
# Общие функции для хуков site-checker

site_file_filter() {
  grep -Ev '^\.cursor/' \
    | grep -Ev '^text documentation for cursor/' \
    | grep -E '\.(html|css|js)$|^data/.*\.json$' \
    || true
}

repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

to_relative_path() {
  local root="$1"
  local path="$2"
  if [[ "$path" == "$root/"* ]]; then
    echo "${path#"$root/"}"
  elif [[ "$path" == "$root" ]]; then
    echo "."
  else
    echo "$path"
  fi
}

state_dir() {
  local root
  root=$(repo_root)
  echo "$root/.cursor/hooks/state"
}

excluded_chats_file() {
  echo "$(repo_root)/.cursor/hooks/excluded-chats.txt"
}

pause_file() {
  echo "$(state_dir)/review-paused-until.txt"
}

ensure_state_dir() {
  mkdir -p "$(state_dir)"
}

is_review_paused() {
  local file until now
  file=$(pause_file)
  [[ ! -f "$file" ]] && return 1
  until=$(head -n1 "$file" | tr -d '[:space:]')
  [[ -z "$until" ]] && return 1
  now=$(date +%s)
  [[ "$now" -lt "$until" ]]
}

set_review_pause_days() {
  local days="$1"
  local until_ts until_human file
  ensure_state_dir
  until_ts=$(date -v+"${days}"d +%s 2>/dev/null || date -d "+${days} days" +%s)
  until_human=$(date -r "$until_ts" '+%d %B %Y, %H:%M' 2>/dev/null || date -d "@$until_ts" '+%d %B %Y, %H:%M')
  file=$(pause_file)
  printf '%s\n%s\n' "$until_ts" "$until_human" > "$file"
}

clear_review_pause() {
  local file
  file=$(pause_file)
  [[ -f "$file" ]] && rm -f "$file"
}

collect_git_site_changes() {
  {
    git diff --name-only HEAD 2>/dev/null || true
    git diff --cached --name-only 2>/dev/null || true
    git ls-files --others --exclude-standard 2>/dev/null || true
  } | sort -u | site_file_filter
}

is_site_file() {
  local rel="$1"
  echo "$rel" | site_file_filter | grep -Fxq "$rel"
}

is_excluded_conversation() {
  local conv_id="$1"
  local file
  file=$(excluded_chats_file)
  [[ -z "$conv_id" || "$conv_id" == "null" ]] && return 1
  [[ -f "$file" ]] && grep -Fxq "$conv_id" "$file"
}

add_excluded_conversation() {
  local conv_id="$1"
  local file
  file=$(excluded_chats_file)
  [[ -z "$conv_id" || "$conv_id" == "null" ]] && return 0
  if ! is_excluded_conversation "$conv_id"; then
    echo "$conv_id" >> "$file"
  fi
}

# Чат настройки / без проверки — по фразам в сообщении пользователя
prompt_requests_no_review() {
  local prompt="$1"
  local lower
  lower=$(echo "$prompt" | tr '[:upper:]' '[:lower:]')

  if echo "$lower" | grep -qE 'use the site-checker subagent|quality_review_trigger'; then
    return 1
  fi

  echo "$lower" | grep -qE \
    'не[^a-zа-яё]*провер|без провер|не надо.*провер|не нужн.*провер|отключи провер|не запускай site-checker|в[[:space:]]*[a-zа-яё]*[[:space:]]*чате|create-subagent|/create-subagent|только настрой|настройк[аи].*субагент|hooks\.json|\.cursor/agents|\.cursor/hooks'
}
