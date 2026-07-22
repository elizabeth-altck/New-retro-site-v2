# Image sources (Phase 1 starter-pack)

Все GIF **скачаны локально** (не hotlink). Источник GeoCities-архива: [GifCities](https://gifcities.org/) / Internet Archive.

| Папка | Содержимое | Примечание |
|-------|------------|------------|
| `diary/` | daisy, forest, sparkle, mushroom, flower | semantic search GifCities |
| `characters/` | frog, butterfly, cat, **anna-snail.png** | character peeks · Анна в tamagotchi |
| `blinkies/` | UC banner, Geocities, JUNO email, best-viewed | footer 88×31 / UC |
| `blinkies/wall/` | **wall-*.gif** — оригинальные 88×31 для sidebar «стена» | сгенерированы `scripts/generate-wall-blinkies.py` |
| `field/image-of-day.jpg` | кроп из `забор цветы и спокойствие.jpeg` | **своё** фото поля |

## Music (FIELD RADIO)

| Файл | Источник | Лицензия |
|------|----------|----------|
| `music/rainy-lofi-city-lofi-music-332746.mp3` | legacy с прошлого сайта | — |
| `music/carefree-field.mp3` | [Kevin MacLeod — Carefree](https://incompetech.com) | CC BY 4.0 |
| `music/chill-wave.mp3` | [Kevin MacLeod — Chill Wave](https://incompetech.com) | CC BY 4.0 |
| `music/easy-lemon.mp3` | [Kevin MacLeod — Easy Lemon](https://incompetech.com) | CC BY 4.0 |
| `music/local-forecast-elevator.mp3` | [Kevin MacLeod — Local Forecast - Elevator](https://incompetech.com) | CC BY 4.0 |

Можно свободно заменять файлы с теми же именами — разметка в `main.html` подхватит.

## Favicon

| Файл | Источник |
|------|----------|
| `favicon.ico`, `images/favicon-16.png`, `images/favicon-32.png`, `images/apple-touch-icon.png` | ресайз из `images/винтаж сердце.png` (то же сердце, что в шапке main) |

## Chaos pack (2026-07-14)

`images/chaos/` — dancing hamster, fire, spin-cat, stars, construction, fish, hearts, glitter…
`images/blinkies/extra-*` + `blinkie-*` — больше 88×31 и 150×20.

На главной: блок **GIF CHAOS** + расширенные stickers / peeks / footer.

## Anna · anna-snail.png

| Файл | Источник |
|------|----------|
| `images/characters/anna-snail.png` | **720×648 RGBA** — производная от `BIG SMACHNY snail.png`: зеркало + розово-лавандовый оттенок раковины. OpenGameArt pixel snail (~32px) не подошёл по масштабу и стилю. Заменить своим артом — когда будет. |

## Правило публичного текста

На страницах сайта **нет** подписей для разработчика: имена файлов, версии, «v1», TODO для автора, внутренние названия блоков. Только то, что понятно гостю. Подробнее: `STYLE_GUIDE.md` → «Публичный текст».
