# DEVELOPMENT LOG

Каждая законченная рабочая сессия записывается сюда.

---

## Шаблон

**Дата:**

**Что сделано:**

**Что изменилось:**

**Какие появились идеи:**

**Что делать дальше:**

---

---

## 2026-06-28 — музыка, scrollports, заметки, улитка на весь экран

**Что сделано:**

- **FIELD RADIO** — кастомный плеер в левой колонке, `music/rainy-lofi-city-lofi-music-332746.mp3`, подсказки при hover.
- **site TODO scrollport** — список планов сайта внутри прокручиваемого блока.
- **stickers.exe** — мини horizontal scrollport с милыми картинками в `#coreObjectsSlot`.
- **WRITE YOUR NOTE** — стикер-форма; локальное сохранение + задел под FormSubmit.
- Коробка уменьшена (~360px) — больше места для контента справа.
- Улитка: `position: fixed`, drag и ползание **по всему viewport**; старт между scrollport и forecast, не на заметках.

**Что изменилось:**

- `main.html` — radio, scrollports, notes, snail viewport logic.
- Документация: `DECISIONS`, `DEVELOPMENT_LOG`, `SITE_STRUCTURE`, `STYLE_GUIDE`, `IDEAS`, `TODO`.

**Что делать дальше:**

- 3–5 треков в плеере; intro + image of the day; блок **the snail**; подключить почту для заметок.

---

## 2026-06-28 — улитка + Win98-окна

**Что сделано:**

- В `#coreObjectsSlot`: forecast.exe — «today's Forecast» + окно «НОВАЯ КОЛЛЕКЦИЯ» (Win98 UI, меню, Look up, `#win98Popup`).
- Улитка в `.core`: автономное ползание по `#coreArena`, перетаскивание, блёстки при hover, `snail.exe` (погладить / покормить / пнуть / раздавить).
- Размер улитки ~320px; ассет `images/snail.png`.
- Коммит `b7ef785`, push на `main` → Vercel.

**Что изменилось:**

- `main.html` — Win98 CSS/HTML, snail drag/wander JS, `#coreArena`.
- Документация: `DECISIONS`, `DEVELOPMENT_LOG`, `SITE_STRUCTURE`, `STYLE_GUIDE`, `TODO`, `IDEAS`.

**Какие появились идеи:**

- Look up → реальная страница/scrollport коллекции.
- Звуки улитки, fart easter egg, tamagotchi-глубина.
- Ползание на всю страницу (если нужно) — отдельное решение.

**Что делать дальше:**

- Контент внутри открытой коробки.
- Look up / коллекция как полноценный object-world.
- Intro-текст и GIF-зона ниже object-worlds.

---

## 2026-06-28 — коробка-коллаж

**Что сделано:**

- Добавлена интерактивная коробка-коллаж на главной: два PNG, открытие по наведению.
- Раскладка: коробка слева в `.core`, слот `#coreObjectsSlot` справа.
- Статичная зернистость на фото, выравнивание opened/closed, без нижней подсказки.
- Ассеты в `images/memory-box/`.

**Что изменилось:**

- `main.html` — object-world memory box после SIGNAL CATCH.
- Документация: `STYLE_GUIDE`, `SITE_STRUCTURE`, `TODO`, `DEVELOPMENT_LOG`, `DECISIONS`.

**Что делать дальше:**

- Контент внутри открытой коробки (gif, заметки).
- Объекты в `#coreObjectsSlot`.
- При смене дизайна коробки — заменить PNG в `images/memory-box/`.

---

## 2026-06-24 — шапка, документация

**Что сделано:**

- Доведена шапка `main.html`: подложка, тикер, заголовок `old net vibe`, двойные сердечки, зазор до контента.
- Подогнан размер сердечек (~124px) под макет.
- Зафиксировано в документации: `STYLE_GUIDE.md`, `DECISIONS.md`, `SITE_STRUCTURE.md`, `DEVELOPMENT_LOG.md`, `TODO.md`.

**Что изменилось:**

- CSS-переменные layout: `--page-padding`, `--column-gap`, `--header-content-gap`.
- Ранее в той же ветке: боковые колонки, `.core`, мини-игра SIGNAL CATCH, связь с `#eventsList`.

**Какие появились идеи:**

- Контент под мини-игрой: intro, пунктирная GIF-зона (см. `IDEAS.md`).
- Object-worlds: коробка, конверт, монитор.

**Что делать дальше:**

- Добить центральный блок главной (текст, GIF-зона).
- Оформить галерею и остальные страницы.

---

## Предыдущие сессии (кратко)

**2026-06-24 (ранее):**

- Принцип «миры внутри объектов» → `PROJECT_VISION.md`, `DECISIONS.md`, `IDEAS.md`.
- Сетка 15/70/15, sidebars, `.core`, SIGNAL CATCH на `main.html`.
