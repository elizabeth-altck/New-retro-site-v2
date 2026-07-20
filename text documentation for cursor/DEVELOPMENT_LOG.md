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

## 2026-07-14 — Фаза 1: картинки на главной

**Что сделано:**

- Starter-pack GIF с GifCities → `images/diary/`, `characters/`, `blinkies/` (локально, см. `SOURCES.md`).
- Image of the day: кроп своего фото забора → `images/field/image-of-day.jpg`.
- Убраны `.media-placeholder` в diary (×5), polaroid, character peeks (×3).
- stickers.exe — mini GIF-лента; core-footer — UC + 88×31 + last updated.
- Обновлены site TODO scrollport и доки.

**Что делать дальше:**

- **gallery.html v1** (Фаза 2).
- Опционально: свои GIF вместо части GifCities; FIELD RADIO multi-track.

---

## 2026-06-24 — error-room, the snail, заглушки артов

**Что сделано:**

- **404.html** (cold) + **202 warm**: gallery, diary, secret-door, zhanna, anna, tamagotchi, widget.
- `css/error-room.css`, фон `забор цветы и спокойствие.jpeg`.
- the snail — текст макета, `BIG SMACHNY snail.png`, ссылки на заглушки.
- `.media-placeholder` для image of the day и diary; character png-слоты.
- Цветокор: 404 cold / 202 warm (как Figma).

**Что делать дальше:**

- Реальная gallery, diary, tamagotchi; вертикальный diary; intro; email для заметок.

---

## 2026-06-24 — заглушки картинок, BIG SMACHNY snail, character slots

**Что сделано:**

- Image of the day и diary — `.media-placeholder`; the snail крупнее; character peeks.

---

## 2026-06-24 — welcome popup, нижний контент, симметрия колонок

**Что сделано:**

- Убраны fullscreen spam; welcome popup по центру (~400px).
- Нижний контент: image of the day, snail teaser, hotline, guest book, footer.
- Симметрия layout: `--sidebar-width`, `field_stats.txt` справа, unified `.sidebar-title`.

**Что делать дальше:**

- Вертикальный diary scrollport; intro; email popup для заметок.

---

## 2026-06-24 — spam бесконечный + fullscreen popups

**Что сделано:**

- **spam.exe** — бесконечная генерация mini-окон только внутри `#adSpamField`.
- **#sitePopupLayer** — центральный welcome popup при загрузке (не fullscreen).
- Фикс ширины страницы (scrollport не раздвигает layout).

**Что делать дальше:**

- Попап email для заметок; фейковый guest list.

---

## 2026-06-24 — нижняя часть главной: diary + spam.exe

**Что сделано:**

- **field diary scrollport** — горизонтальный дневник с 5 цветными страницами и иллюстрациями из `images/`.
- **spam.exe** — 5 навязчивых win98-окон (hot pink, cyan, lime, gold, purple); закрытие и клики → `#win98Popup` + EVENTS.
- **IDEAS.md** — концепт отправки заметок гостю, send-to-self, фейковый список гостей.

**Что изменилось:**

- Главная удлинилась вниз; `.core` получил padding-bottom.
- site TODO: diary отмечен как `[~]`.

**Что делать дальше:**

- Попап email при отправке заметки; фейковый address book гостей.
- intro, image of the day, блок the snail.

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

## 2026-07-01 — neocities: live crawl четырёх сайтов

**Что сделано:**

- Обход по ссылкам автора: fish2fish (splash → main → me/todo), garfriend (door → shop room → neighbors/shrines), ginder (dashboard-окна), korenara (launcher + Ramen Explorer tabs).
- Обновлён раздел референсов в `STYLE_GUIDE.md`.

**Вывод:**

GIF WORLD = **korenara** по механике + **garfriend** как модель будущих комнат. fish2fish и ginder — для плотности/полировки, не для палитры.

---

## 2026-07-01 — roadmap v1.5 → страницы

**Решение:**

Зафиксирован поэтапный план в `TODO.md`: **Фаза 1** — контент главной (GIF/картинки, убрать заглушки); **Фаза 2** — страницы по одной (gallery → diary → zhanna → …); **Фаза 3** — глубина.

**Следующее:**

Сессия A (арт на главной) или B (`gallery.html` v1).

---

## Предыдущие сессии (кратко)

**2026-06-24 (ранее):**

- Принцип «миры внутри объектов» → `PROJECT_VISION.md`, `DECISIONS.md`, `IDEAS.md`.
- Сетка 15/70/15, sidebars, `.core`, SIGNAL CATCH на `main.html`.

## 2026-07-14 — gallery.html v1

**Что сделано:** комната-галерея (GIF wall, marquee, scrollport); фон временный — поле, сменный через CSS.

**Что делать дальше:** свой gallery-bg; zhanna.html v1; endpoint guest book.

## 2026-07-14 — diary.html v1

**Что сделано:** тетрадь (5 записей) + guest book (форма, seed в `data/guestbook.json`); preview на main → `#guestbook`.

**Что делать дальше:** FormSubmit endpoint; live-лента (Supabase, опционально).

## 2026-07-14 — korenara-accent test (main footer)

**Что сделано:** odometer `site visits` + `my webring · buttons` — cream patch внутри `.core`. Roadmap вписывания → `DECISIONS.md`.

## 2026-07-21 — Фаза 1 закрыта + zhanna.html v1

**Фаза 1 (main):** intro-блок; FIELD RADIO — 3 трека + ◀ ▶; footer korenara odometer; last updated 21 Jul.

**Фаза 2:** `zhanna.html` v1 — комната персонажа (`css/zhanna.css`, фон луг); gallery + diary + zhanna = 3 комнаты.

**Дальше:** widget/tamagotchi v1; FormSubmit guest book; deploy smoke test.

## 2026-07-21 — about.html + field-glyphs off main

**about.html v1** — комната «зачем сайт» (`css/about.css`, cream doc на поле).

**field-glyphs:** убраны с main (перекрытия / щели); GIF остаются в gallery, blinkies, peeks.

**Коммит:** фаза 1–2 polish как есть — intro, radio 3-track, footer odometer, zhanna, about, roadmap doc.
