# SITE STRUCTURE

Структура сайта и текущее состояние страниц. Обновляется по мере роста проекта.

---

## Цепочка входа

1. `index.html` — точка входа
2. `gateway.html` — переход в мир
3. `main.html` — главная комната (активная разработка)

---

## main.html — главная комната

### Шапка

| Элемент | Описание |
|---------|----------|
| Тикер | Бегущая строка, атмосфера old net |
| Заголовок | `old net vibe` |
| Акцент | Двойные винтажные сердечки справа |

### Сетка контента

```
┌──────────┬────────────────────────────┬──────────┐
│  LEFT    │         CENTER (.core)       │  RIGHT   │
│  ~228px  │           flex 1fr           │  ~228px  │
│  nav     │  my site + мини-зоны       │  system  │
│  radio   │                            │  stats   │
└──────────┴────────────────────────────┴──────────┘
```

Симметричная ширина боковых колонок: CSS `--sidebar-width: min(228px, 19vw)`.

### Левая колонка

- **Navigation** — `gallery.html`, `diary.html`, `main.html#fieldRadio`, `secret-door.html`
- **FIELD RADIO** (`#fieldRadio`) — кастомный плеер, legacy-трек rainy lofi city

### Центр

- Заголовок **my site**
- **SIGNAL CATCH** — мини-игра под заголовком
- **site TODO scrollport** — прокручиваемый список планов развития сайта
- **Коробка-коллаж** — ~360px, слева: hover/tap `closed.png` ↔ `opened.png`
- **forecast.exe (Win98)** — Forecast + «НОВАЯ КОЛЛЕКЦИЯ»
- **stickers.exe** — placeholder «скоро тут чето будет»
- **WRITE YOUR NOTE** (`#siteNote`) — форма заметок (localStorage / FormSubmit)
- **field diary scrollport** (`#diaryScrollport`) — горизонтальный дневник (позже — вертикальный)
- **spam.exe** (`#adSpamField`) — бесконечная генерация mini win98 только внутри блока
- **image of the day** (`#imageOfDaySlot`) — полароид с заглушкой + описание в figcaption
- **the snail** (`#snailTeaser`) — `BIG SMACHNY snail.png`; текст из макета; ссылки → 202-заглушки + `widget.html`
- **hotline.txt** (`#fieldHotline`) — случайные мысли поля
- **guest book preview** — фейковые записи
- **core-footer** — neocities-счётчик, ссылки
- **welcome popup** (`#sitePopupLayer`) — центральный win98 при загрузке (~400px, не fullscreen)
- **Улитка** (`#snailDragWrap`) — `position: absolute` на body, автоползание + drag, `snail.exe`
- **Ещё не свёрстано:** intro-текст

### Правая колонка

- **LIVE SYSTEM** — статус ONLINE (мигающая точка), поле, список **EVENTS**
- **field_stats.txt** (`#fieldStats`) — блок статов поля (баланс с FIELD RADIO)
- `#eventsList` пополняется из мини-игры, коробки, улитки, forecast, spam, welcome popup

### Ключевые ID (главная)

| ID | Назначение |
|----|------------|
| `#coreArena` | Оливковый блок `.core` |
| `#fieldRadio` | Кастомный музыкальный плеер (левая колонка) |
| `#fieldScrollport` | Site TODO scrollport |
| `#cuteScrollport` | stickers.exe — placeholder |
| `#diaryScrollport` | field diary — horizontal scrollport |
| `#adSpamField` | spam.exe — бесконечные mini ads внутри блока |
| `#sitePopupLayer` | Welcome popup по центру при загрузке |
| `#imageOfDaySlot` | Image of the day — заглушка (потом `<img>`) |
| `#fieldHotline` | hotline.txt |
| `#guestBookPreview` | Guest book preview |
| `#fieldStats` | field_stats.txt (правая колонка) |
| `#siteNote` / `#siteNoteForm` | WRITE YOUR NOTE |
| `#coreObjectsSlot` | Слот справа от коробки (Win98, попапы) |
| `#forecastApp` | Контейнер forecast.exe |
| `#collectionWindow` | Окно «НОВАЯ КОЛЛЕКЦИЯ» |
| `#win98Popup` | Системный попап Win98 |
| `#snailDragWrap` | Обёртка улитки (позиция + drag) |
| `#snailObject` | Кнопка улитки |
| `#snailCare` | Попап `snail.exe` |
| `#eventsList` | Список событий LIVE SYSTEM |

---

## Страницы ошибок и заглушки (2026-06)

Общий стиль: `css/error-room.css`, фон **`images/забор цветы и спокойствие.jpeg`**, стекло-карточка по центру, Press Start 2P для кода.

| Файл | Код | Тон | Назначение |
|------|-----|-----|------------|
| `404.html` | 404 | **cold** | URL не существует (Vercel отдаёт автоматически) |
| `gallery.html` | 202 | **warm** | nav → gallery (ещё не свёрстано) |
| `diary.html` | 202 | warm | nav → diary |
| `secret-door.html` | 202 | warm | nav → secret door |
| `zhanna.html` | 202 | warm | ссылка **Жанна** из блока the snail |
| `anna.html` | 202 | warm | ссылка **Анна** |
| `tamagotchi.html` | 202 | warm | «этой странице» — погладить / покормить |
| `widget.html` | 202 | warm | «виджетом» — страница про ползающую улитку |

**Принцип цветокора (Figma):** 404 = холоднее; «страница не создана» = теплее. Число **202** — дизайн-номер, не HTTP-статус.

---

## Страницы (запланировано — реальный контент)

- Галерея
- Музыкальная комната
- Рабочий стол
- Дом / комнаты
- Архив
- Секретные страницы

Навигация: меню + интерактивные объекты (двери, GIF, предметы) — см. `PROJECT_VISION.md`.

---

## Ассеты главной

| Файл | Использование |
|------|----------------|
| `images/поле.jpeg` | Фон страницы |
| `images/винтаж сердце.png` | Сердечки в шапке |
| `images/memory-box/closed.png`, `opened.png` | Коробка-коллаж на главной |
| `images/snail.png` | Виджет улитки на главной (~320px) |
| `images/BIG SMACHNY snail.png` | Блок the snail |
| `images/забор цветы и спокойствие.jpeg` | Фон error-room страниц |
| `music/rainy-lofi-city-lofi-music-332746.mp3` | FIELD RADIO (legacy-трек) |
