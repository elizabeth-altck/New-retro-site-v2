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

- **Navigation** — ссылки: gallery, diary, music → `#fieldRadio`, secret door
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
- **the snail** (`#snailTeaser`) — `BIG SMACHNY snail.png`, крупно в блоке
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

## Страницы (запланировано)

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
| `images/snail.png` | Улитка на главной (~320px) |
| `music/rainy-lofi-city-lofi-music-332746.mp3` | FIELD RADIO (legacy-трек) |
