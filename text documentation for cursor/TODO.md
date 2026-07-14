# TODO

## Roadmap (зафиксирован 2026-07-01)

**Статус:** v1 **главной** по каркасу готов + **Фаза 1 контент** (GIF/фото вместо `.media-placeholder`). Дальше — **gallery.html v1**, потом остальные страницы по одной.

### Фаза 1 — главная v1.5 (контент, без новых страниц)

**Цель:** главная выглядит живой; `.media-placeholder` убраны или почти убраны.

- [x] **Картинки / GIF** — starter-pack из GifCities + своё фото; в `images/` (см. `images/SOURCES.md`)
- [x] **image of the day** — `#imageOfDaySlot` → `images/field/image-of-day.jpg`
- [x] **field diary** — все 5 art-слотов в `#diaryScrollport`
- [x] **character png-слоты** — frog · butterfly · cat
- [x] **core-footer** — UC banner + 3× 88×31 + last updated
- [x] **last updated** на главной (meta в footer)
- [ ] **FIELD RADIO** — 2–3 трека + переключение (опционально в этой фазе)
- [x] **stickers.exe** — mini GIF-лента вместо «скоро тут чето будет»
- [x] Обновить **site TODO scrollport** по мере закрытия пунктов

**Осталось / WIP на главной:** FIELD RADIO multi-track · WRITE YOUR NOTE endpoint · intro-текст · коробка GIF-лента внутри

**Итог фазы:** главную можно показывать как «официальную»; WIP только там, где осознанно (scrollport TODO + radio tracks).

---

### Фаза 2 — первые настоящие страницы (по одной)

**Принцип (garfriend):** каждая страница = **место**, не шаблон. Минимум v1: фон + 1–2 блока + «← главная».

| Порядок | Файл | Заметка |
|--------|------|---------|
| 1 | `gallery.html` | nav, логичное продолжение GIF WORLD |
| 2 | `diary.html` | связь с field diary на главной |
| 3 | `zhanna.html` | персонаж уже на главной |
| 4 | `widget.html` / `tamagotchi.html` | улитка жива на main |
| 5 | `secret-door.html` | пасхалка, позже |
| 6 | `anna.html` | после комнаты Жанны |

- [ ] **gallery.html** v1 — GIF-стена или scrollport ← **следующее**
- [ ] **diary.html** v1
- [ ] **zhanna.html** v1
- [ ] **widget.html** / **tamagotchi.html** v1
- [ ] **secret-door.html** v1
- [ ] **anna.html** v1

---

### Фаза 3 — глубина (после v1.5 + 2–3 страницы)

- [ ] gallery: scrollport / GIF roulette
- [ ] diary: вертикальный scrollport на главной + полноценный `diary.html`
- [ ] `gateway.html` — narrative-вход (garfriend)
- [ ] music room / плейлист в forecast или отдельная комната
- [ ] WRITE YOUR NOTE — отправка на почту гостя
- [ ] tamagotchi ↔ LIVE SYSTEM (сытость, настроение)
- [ ] scrollport в коробке (opened) — GIF-лента
- [ ] intro-блок на главной (если понадобится)

---

### Ближайшие сессии (предложение)

- **Сессия B:** `gallery.html` v1 — GIF-стена из `images/diary` + новые finds
- **Сессия C:** свои фото/GIF вместо части GifCities (если захочется)

---

## Сейчас

- [x] **Фаза 1** — главная v1.5 контент (GIF/фото; см. Roadmap)
- [ ] Закончить макет главной страницы и оформить её
  - [x] Шапка (тикер, заголовок, сердечки, зазор)
  - [x] Боковые колонки (nav + LIVE SYSTEM)
  - [x] Центральный блок `.core` — базовая оболочка и **my site**
  - [x] Мини-игра SIGNAL CATCH
  - [x] Коробка-коллаж (hover open, зернистость; контент внутри — позже)
  - [x] forecast.exe (Win98 окна в `#coreObjectsSlot`)
  - [x] Улитка (виджет: absolute, drag, автоползание, ~320px)
  - [x] **FIELD RADIO** — кастомный плеер (`music/rainy-lofi-city-lofi-music-332746.mp3`)
  - [ ] FIELD RADIO — 3–5 треков, переключение (текущий — legacy с прошлого сайта)
  - [x] Первый **scrollport** (site TODO)
  - [x] **stickers.exe** — mini GIF-лента (`#cuteScrollport`)
  - [~] **WRITE YOUR NOTE** — блокнот (локально; почта через `data-endpoint`)
  - [x] **field diary** — horizontal scrollport + 5 GIF art
  - [x] **image of the day** — полароид + фото из поля
  - [x] **the snail** — блок с `BIG SMACHNY snail.png`; ссылки → заглушки 202
  - [x] Нижний контент: hotline.txt, guest book preview, core-footer (blinkies), character peeks
  - [x] spam.exe — бесконечные mini-окна только внутри блока
  - [x] welcome popup по центру при загрузке (не fullscreen)
  - [~] V1 scroll главной — все основные секции есть (не строго 1:1 макет)
  - [ ] Другие object-worlds и интерактивные предметы по той же логике
- [ ] **Музыка** — расширить: больше треков, полноценная music room / scrollport-плейлист → **Фаза 1 / 3**
- [ ] Оформить галерею → **Фаза 2**, пункт 1
- [x] Продумать структуру остальных страниц → **Roadmap Фаза 2–3**
- [ ] Сделать красивый блок заметок → **Фаза 3**

### Принцип вёрстки (не строго по макету)

- Макет Figma = дух и пропорции, не буквальный px.
- Хаотичное размещение мини-блоков **внутри** общей схемы (nav · core · system) — как neocities / old web.
- Контент и глубина object-worlds наполняются **постепенно**; сначала блок/интерактив, потом финальный контент.

### Блок персонажа «the snail»

- [x] Вёрстка секции по макету (фото + текст про Жанну)
- [x] Ссылки **Жанна**, **Анна**, **этой странице**, **виджетом** → заглушки 202
- [x] Переходы **временно**: страницы-заглушки, не финальный контент
- [ ] Позже: tamagotchi-страница, комната Жанны, полноценная страница виджета

### Страницы и ошибки

- [x] **404.html** — cold · забор цветы и спокойствие · страница не найдена
- [x] **202 warm** — gallery, diary, secret-door, zhanna, anna, tamagotchi, **widget.html**
- [ ] Заглушки → реальный контент (галерея, diary, tamagotchi, widget room…)

### Scrollport (мини-зоны с внутренним скроллом)

- [x] Первый пример на главной — site TODO
- [x] stickers.exe — horizontal mini scrollport (GIF thumbs)
- [ ] Scrollport в коробке (открытая) — GIF-лента
- [ ] Scrollport в forecast / music room — плейлист, лог, наклейки

---

## Потом

_(перенесено в Roadmap: Фаза 2–3)_

- [ ] Музыкальная комната (полноценная)
- [ ] Рабочий стол
- [ ] Дом
- [ ] Секретные страницы

---

## Когда-нибудь

- Звуки улитки, fart easter egg
- Глубина tamagotchi (сытость, настроение в LIVE SYSTEM)
- Look up → реальная коллекция
