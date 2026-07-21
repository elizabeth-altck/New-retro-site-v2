# data/

## guestbook.json

Одобренные записи guest book — правка вручную (v1).

## site-config.json

Endpoint для **guest book** на `diary.html` (FormSubmit → письма **тебе**):

```json
{
  "guestbookEndpoint": "https://formsubmit.co/ajax/YOUR@EMAIL.com"
}
```

**WRITE YOUR NOTE** на `main.html` — отдельная механика: pop-up с почтой гостя → открывается его почтовик (`mailto:`). Авто-отправка без клика «Отправить» в Gmail потребует EmailJS / Resend позже.

1. Скопируй `site-config.example.json` → `site-config.json`.
2. Подставь email только для guest book.
3. `#guestbookForm` на diary подхватит endpoint при загрузке.

Пустой `guestbookEndpoint` = «поле получило», запись в ленту после ручной модерации.
