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

## Предыдущие сессии (кратко)

**2026-06-24 (ранее):**

- Принцип «миры внутри объектов» → `PROJECT_VISION.md`, `DECISIONS.md`, `IDEAS.md`.
- Сетка 15/70/15, sidebars, `.core`, SIGNAL CATCH на `main.html`.
