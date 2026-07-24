#!/bin/bash
# Поставить проверку site-checker на паузу на N дней (по умолчанию 7).
# Включить снова: .cursor/hooks/resume-review.sh

set -euo pipefail

source "$(dirname "$0")/lib.sh"

days="${1:-7}"
set_review_pause_days "$days"
file=$(pause_file)
echo "site-checker на паузе до: $(tail -n1 "$file")"
