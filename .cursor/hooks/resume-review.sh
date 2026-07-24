#!/bin/bash
# Снять паузу с site-checker

set -euo pipefail

source "$(dirname "$0")/lib.sh"

clear_review_pause
echo "site-checker снова включён"
