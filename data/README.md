# data/

## guestbook.json

Одобренные записи guest book — правка вручную (v1).

## site-config.json

Endpoint'ы для FormSubmit (без секретов в коде страниц):

```json
{
  "guestbookEndpoint": "https://formsubmit.co/ajax/YOUR@EMAIL.com",
  "siteNoteEndpoint": "https://formsubmit.co/ajax/YOUR@EMAIL.com"
}
```

1. Скопируй `site-config.example.json` → `site-config.json` (уже есть с пустыми строками).
2. Подставь свой email в URL после активации FormSubmit.
3. Формы на `diary.html` и `main.html` (#guestbookForm, #siteNoteForm) подхватят endpoint при загрузке.

Пустые строки = режим v1: guest book показывает «поле получило», WRITE YOUR NOTE пишет в localStorage.
