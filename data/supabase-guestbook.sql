-- GIF WORLD · guest book (один раз в Supabase SQL Editor)
-- Project → SQL → New query → Run

create table if not exists guest_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'полевой гость',
  text text not null check (char_length(text) <= 400),
  created_at timestamptz not null default now()
);

alter table guest_messages enable row level security;

create policy "anyone can read guest book"
  on guest_messages for select
  using (true);

create policy "anyone can post guest book"
  on guest_messages for insert
  with check (char_length(text) >= 1);

-- Realtime: Database → Replication → включить guest_messages
-- Settings → API → скопировать Project URL и anon public key → data/site-config.json

-- опционально: стартовые записи
-- insert into guest_messages (name, text, created_at) values
--   ('полевой гость', 'оставила записку в тетради. вернусь.', now() - interval '2 days');
