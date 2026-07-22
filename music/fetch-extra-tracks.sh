#!/bin/sh
# Kevin MacLeod · CC BY 4.0 · https://incompetech.com
# Запусти один раз из корня репо: sh music/fetch-extra-tracks.sh

set -e
cd "$(dirname "$0")"
BASE="https://incompetech.com/music/royalty-free/mp3-royaltyfree"

curl -fsSL -o chill-wave.mp3 "$BASE/Chill%20Wave.mp3"
curl -fsSL -o easy-lemon.mp3 "$BASE/Easy%20Lemon.mp3"
curl -fsSL -o local-forecast-elevator.mp3 "$BASE/Local%20Forecast%20-%20Elevator.mp3"

echo "готово: chill-wave, easy-lemon, local-forecast-elevator"
