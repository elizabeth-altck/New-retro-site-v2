# TODO

## Roadmap (зафиксирован 2026-07-01)

**Статус:** v1 **главной** по каркасу готов (layout, интерактив, 404/202, деплой). Дальше — **наполнение главной**, потом **страницы по одной**, не всё сразу.

### Фаза 1 — главная v1.5 (контент, без новых страниц)

**Цель:** главная выглядит живой; `.media-placeholder` убраны или почти убраны.

- [ ] **Картинки / GIF** — GifCities, Betty's, Pixel Party, **свои** фото; скачивать в `images/`, не hotlink (см. `IDEAS.md` → «Где искать GIF»)
- [ ] **image of the day** — заменить `#imageOfDaySlot` (1 полароид, быстрый win)
- [ ] **field diary** — 2–3 art-слота из 5 в `#diaryScrollport` (не обязательно все сразу)
- [ ] **character png-слоты** — 1–2 из 3 внизу главной
- [ ] **core-footer** — 2–4 blinkies / 88×31 (fish, garfriend neighbors)
- [ ] **last updated** на главной (meta, old web)
- [ ] **FIELD RADIO** — 2–3 трека + переключение (опционально в этой фазе)
- [ ] **stickers.exe** — контент вместо «скоро тут чето будет»
- [ ] Обновить **site TODO scrollport** по мере закрытия пунктов

**Заглушки на `main.html` (инвентарь):** diary art ×5 · polaroid ×1 · character slots ×3 · stickers text · коробка (GIF-лента внутри — позже)

**Итог фазы:** главную можно показывать как «официальную»; WIP только там, где осознанно (scrollport TODO).

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

- [ ] **gallery.html** v1 — GIF-стена или scrollport
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

- **Сессия A:** автор кидает 5–10 картинок **или** агент собирает starter-pack под поле → diary + image of day + footer
- **Сессия B:** `gallery.html` v1

---

## Сейчас

- [~] **Фаза 1** — главная v1.5 (см. Roadmap выше)
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
  - [x] **stickers.exe** — placeholder «скоро тут чето будет»
  - [~] **WRITE YOUR NOTE** — блокнот (локально; почта через `data-endpoint`)
  - [~] **field diary** — horizontal scrollport (позже вертикальный); иллюстрации — заглушки
  - [~] **image of the day** — полароид + описание; фото — заглушка `.media-placeholder`
  - [x] **the snail** — блок с `BIG SMACHNY snail.png`; ссылки → заглушки 202
  - [x] Нижний контент: hotline.txt, guest book preview, core-footer, character png-слоты
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
- [x] stickers.exe — horizontal mini scrollport
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
