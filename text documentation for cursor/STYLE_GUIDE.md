# STYLE GUIDE

## Общая атмосфера

Сайт не должен выглядеть как современный корпоративный сайт.

Основное вдохновение:

- Neocities
- Старый интернет (2000–2012)
- Домашние сайты
- Dreamcore
- Webcore
- Персональные страницы

Главное ощущение:

- уют;
- исследование;
- немного хаоса;
- любопытство;
- ощущение "живого" цифрового места.

---

# Цвета

У сайта нет строгой корпоративной палитры.

Допускается использование большого количества ярких цветов.

Разные страницы могут иметь собственную палитру.

Главное — чтобы сохранялось ощущение одного мира.

Предпочтительные оттенки:

- малиновый;
- розовый;
- белый;
- кремовый;
- зелёный;
- жёлтый;
- голубой;
- сиреневый.

Не стремиться к минимализму.

---

## Референсы neocities (2026-07-01, screen recording + live crawl)

Просмотрены кадры из записи и **живой обход** сайтов по ссылкам автора. Сайты **не копируем** — берём принципы.

### Карта референсов (4 сайта)

| Сайт | Суть | Как устроен глубже |
|------|------|-------------------|
| **[korenara.neocities.org](https://korenara.neocities.org/)** | уютный «рабочий стол ПК» | Фон-природа **всегда виден**. Launcher-dock (ramen, chatterbox, spoopify…). **Ramen Explorer** = fake IE с вкладками Home / About / Blog / Art / Diary / Guestbook. Поверх: sticky **To Do**, **chatterbox**, персонаж на цепочке. Окна minimize/maximize/close. |
| **[fish2fish.neocities.org](https://fish2fish.neocities.org/)** | рыба · Y2K maximalist | **Вход:** `/` = aquarium + bubbles → `mainpage/main.html` = хаб HELP!!. Cbox, stamps, last updated. Страницы: **me** (strawberry tile + about + blinkies), **todo** (публичный список WIP — десятки страниц!), music, 2ds, amusements. Disclaimer «not mobile». |
| **[garfriend.me](https://garfriend.me/)** | рыбный дом-комната | **Вход:** narrative + hover-дверь → **inside shop** = иллюстрация-комната, кликабельные зоны. Много «мест»: neighbors (тетрадь + webrings 88×31), shrines + **anti-shrines**, garden, photos, guestbook, blog… Каждая страница = **локация**, не шаблон. |
| **[ginder.neocities.org](https://ginder.neocities.org/)** | «розовый инстаграм» | Dashboard из **OS-окон** на мягком голубом фоне: INDEX, PROFILE.EXE, iPod-плеер, COMMENT SECTION (с reply), UPDATES.LOG, buttons + embed-код. Nav: Projects / Blog / Commissions… Meta: версия, laptop, last updated. Более **отполированный** neocities, NewJeans-палитра. |

### Общий вайб (словами)

- **Живое место**, не лендинг: видно, что сайт *кто-то* делает прямо сейчас.
- **Слои:** фон (фото или паттерн) + окна/блоки/стикеры *поверх*.
- **Личность в тексте:** разговорный тон, caps, списки дел, shoutouts.
- **Социальность:** чат, гостевая, stamps, комментарии с ответами.
- **WIP как фича:** todo на сайте, last updated, «coming soon», незаконченные страницы — норма.

### Кому из них ближе GIF WORLD

| Референс | Роль для нас |
|----------|----------------|
| **korenara** | **главный дух** — поле + win98-виджеты + radio + popup + улитка |
| **garfriend** | **будущие комнаты** — gallery, diary, secret door как кликабельные места |
| **fish2fish** | **плотность и характер** — stamps, публичный todo, cbox-энергия |
| **ginder** | **полировка окон** и meta-блоки (updates.log, profile) — палитру не копируем |

### Уже есть у нас

- Фон-поле, win98-окна, welcome popup, spam, улитка, FIELD RADIO.
- site TODO scrollport, guest book preview, WRITE YOUR NOTE, hotline.
- error-room warm/cold, заглушки 202.
- **Фаза 1 медиа:** diary GIFs, polaroid (своё фото), character peeks, footer blinkies, stickers.exe strip.
- **gallery.html v1** — комната GIF-стены; фон сменный (`--gallery-bg`).
- **diary.html v1** — тетрадь + guest book; `data/guestbook.json`.

### Можно усилить позже

- Больше / свои blinkies и stamps (вместо JUNO / Geocities archival finds).
- Sticky todo как у korenara (сейчас scrollport — близко, но не sticky).
- **Комнаты-картинки** с hotspots для gallery/diary (garfriend).
- UPDATES.LOG глубже last updated (ginder, fish).
- Narrative gateway (garfriend) на `gateway.html`.
- Плитка **внутри** mini-world, не на всю страницу (fish strawberry).

Кадры из записи: `reference/neocities-vibe/` (локально).

---

# Типографика

Допускается использование нескольких различных шрифтов.

Предпочтение отдаётся:

- пиксельным шрифтам;
- винтажным шрифтам;
- рукописным акцентам;
- объёмным заголовкам.

## Шрифты главной (`main.html`)

| Роль | Шрифт |
|------|--------|
| Пиксельные заголовки, тикер, мини-игра | **Press Start 2P** |
| Боковые колонки | **Jura** |
| Базовый моноширинный (body) | **Share Tech Mono** |

---

# Главная страница (`main.html`)

Макеты Figma (1920px) — **ориентир пропорций**, не буквальные px для вёрстки.

## Фон

- `images/поле.jpeg` — cover, fixed.

## Шапка (`.site-header`)

- Подложка: `rgba(0, 0, 0, 0.6)` на всю ширину.
- Зазор до контента: `--header-content-gap: 26px` (`margin-bottom` шапки); `.layout` сверху **8px** — контент не подтягивается к шапке.
- **Тикер:** Press Start 2P 11px, цвет `#fffadb`, текст «old net core · атмосфера 2000-2010х» (содержимое тикера намеренно не как в макете).
- **Заголовок:** `old net vibe`, lowercase, Press Start 2P **48px**, цвет `#000`.
  - Внутренний блик: `#FFFADB` с лёгким blur (text-shadow, верхний левый).
  - Drop shadow: жёсткий (0 blur), тёмная вишня `#58141c`, слои 2–10px.
- **Сердечки:** `images/винтаж сердце.png`, два слоя (тёмный сзади, светлый спереди).
  - Ширина ~**124px**, контейнер ~**228×118px**.
  - Тёмный слой: `brightness(0.42)`, смещение ~`28px / 13px`.

## Сетка (`.layout`)

- Колонки: **`--sidebar-width`** (симметрично слева и справа) + центр `minmax(0, 1fr)`; gap `--column-gap: 20px`, боковые отступы `--page-padding: 25px`.
- Боковые колонки: `display: flex`, `align-items: stretch` по высоте строки сетки.

## Боковые колонки

- Фон `rgba(0, 0, 0, 0.55)`, текст `#f2f2f2`.
- Зелёная inset-тень по внешнему краю (слева — левая колонка, справа — зеркально).
- Заголовки секций: общий класс **`.sidebar-title`** (Navigation, LIVE SYSTEM).
- Слева: **FIELD RADIO**; справа: **field_stats.txt** — визуальный баланс (одинаковый dashed-блок).

## Центральный блок (`.core`)

- Фон `rgba(155, 143, 67, 0.9)` (#9B8F43 @ 90%).
- Скевоморфная рамка: светлый inset сверху/слева, тёмный снизу/справа, жёсткая чёрная тень 3–4px.
- Заголовок **my site:** Press Start 2P **84px**, серо-бежевый блик + оливковые/чёрные drop shadows.

## Мини-зона SIGNAL CATCH

- Пунктирная рамка, кремовый полупрозрачный фон.
- Цветные акценты в палитре мини-игры: розовый `#e8a0c8`, зелёный `#8fd4a8`, голубой `#9ec5e8`, жёлтый `#e8c86a`.
- 30 сек, клик по мигающим символам; milestones пишутся в `#eventsList` справа.

## Коробка-коллаж (object-world)

- Ассеты: `images/memory-box/closed.png`, `images/memory-box/opened.png` (два состояния из Figma).
- Раскладка: слева в `.core` (~**360px**), справа `#coreObjectsSlot` для других объектов.
- **Открытие:** наведение (desktop) — crossfade closed → opened; тап / Enter — toggle на touch.
- Статичная зернистость поверх фото (`overlay`, без анимации).
- Первое открытие → событие `memory box opened` в `#eventsList`.
- Внутренний контент коробки (gif, заметки) — ещё не свёрстан, только смена PNG.

## forecast.exe (Win98 object-world)

- В `#coreObjectsSlot`: `#forecastApp` — окно «today's Forecast» (список Sunny / Cloudy / Vibe / ???).
- Наложенное окно `#collectionWindow` — «НОВАЯ КОЛЛЕКЦИЯ», дата, Look up.
- Меню: File, Edit, Search, Close → `#win98Popup` с атмосферным текстом.
- Close → `is-closed` на окне коллекции (визуально скрыто).
- Палитра: `#4a5238` фон окна, `#2f3828` titlebar, кремовые/чёрные Win98-границы, Press Start 2P в заголовках коллекции.

## FIELD RADIO (левая колонка)

- `#fieldRadio` — кастомный плеер, не системный UI браузера.
- Трек: `music/rainy-lofi-city-lofi-music-332746.mp3` (legacy с прошлого сайта).
- PLAY/STOP, кастомная перемотка, vol; подсказки при hover (`data-tip`).
- Эквалайзер-полоски при воспроизведении.

## Scrollport

- **site TODO** — вертикальный scrollport со списком `[x] / [~] / [ ]` планов.
- **stickers.exe** — горизонтальный мини-scrollport (~220px), Win98-рамка, thumbnails 68×68.

## WRITE YOUR NOTE

- `#siteNote` — стикер с «скрепкой», placeholder `Waiting...`.
- Отправка: `localStorage` по умолчанию; реальная почта — `data-endpoint="https://formsubmit.co/ajax/..."` на `#siteNoteForm`.

## Улитка (виджет на странице)

- Ассет `images/snail.png`, ширина `min(62vw, 320px)`.
- `#snailDragWrap` — **`position: absolute`** на body, z-index 50; прокручивается со страницей.
- **Движение:** автоползание + drag; старт — между site TODO и forecast.exe.
- **Тап:** shy / `snail.exe` / полёт на 5-й клик.
- Заглушка страницы виджета: **`widget.html`** (202 warm).

## Error-room (404 / 202)

- CSS: `css/error-room.css`.
- Фон: `images/забор цветы и спокойствие.jpeg`.
- **404** — класс `error-room--cold` (страница не найдена).
- **202** — класс `error-room--warm` (страница ещё не создана); код на экране — дизайн, не HTTP.
- Карточка: blur, полупрозрачный фон, Press Start 2P для числа, Jura для текста.

## the snail (блок персонажа)

- `images/BIG SMACHNY snail.png`, тёмно-оливковый блок.
- Текст макета; ссылки: `zhanna.html`, `anna.html`, `tamagotchi.html`, `widget.html`.

---

# Блоки

Предпочтительно использовать:

- объёмные рамки;
- внутренние тени;
- внешние тени;
- стеклянные эффекты там, где они подходят;
- скевоморфизм;
- полароиды;
- стикеры.

---

# Анимации

На странице всегда должно что-нибудь двигаться.

Например:

- GIF;
- лёгкое покачивание;
- вращение;
- мигание;
- подпрыгивание;
- появление объектов.

Анимации должны создавать ощущение жизни.

---

# Интерфейс

Предпочитать необычные способы навигации.

Например:

- картинки;
- двери;
- окна;
- рабочие столы;
- комнаты;
- предметы.

Не ограничиваться обычным меню.