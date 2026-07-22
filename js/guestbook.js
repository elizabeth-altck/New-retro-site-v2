(function () {
  const REACT_KEY = 'gifworld-guest-reactions';

  const form = document.getElementById('guestbookForm');
  const nameInput = document.getElementById('guestName');
  const msgInput = document.getElementById('guestMessage');
  const hpInput = document.getElementById('guestWebsite');
  const statusEl = document.getElementById('guestStatus');
  const listEl = document.getElementById('guestList');
  const emptyEl = document.getElementById('guestEmpty');
  const submitBtn = document.getElementById('guestSubmit');

  let supabase = null;
  let realtimeChannel = null;

  function loadReactions() {
    try {
      return JSON.parse(localStorage.getItem(REACT_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function saveReactions(map) {
    localStorage.setItem(REACT_KEY, JSON.stringify(map));
  }

  function entryId(entry) {
    return String(entry.id || entry.at || entry.text || Math.random());
  }

  function showStatus(text, isOk) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.textContent = text;
    statusEl.classList.toggle('is-ok', isOk);
    statusEl.classList.toggle('is-err', !isOk);
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function normalizeRow(row) {
    return {
      id: row.id,
      name: row.name || 'полевой гость',
      text: row.text,
      at: row.created_at || row.at,
    };
  }

  function renderReactions(id) {
    const reactions = loadReactions();
    const counts = reactions[id] || { heart: 0, up: 0, down: 0, mine: null };

    const wrap = document.createElement('div');
    wrap.className = 'diary-guest-reactions';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'реакции');

    [
      { key: 'heart', label: '♥', title: 'сердечко' },
      { key: 'up', label: '👍', title: 'лайк' },
      { key: 'down', label: '👎', title: 'дизлайк' },
    ].forEach(({ key, label, title }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'diary-guest-react-btn' + (counts.mine === key ? ' is-active' : '');
      btn.title = title;
      btn.dataset.react = key;
      btn.dataset.entryId = id;
      const count = counts[key] || 0;
      btn.innerHTML = label + (count > 0 ? ' <span>' + count + '</span>' : '');
      wrap.appendChild(btn);
    });

    return wrap;
  }

  function renderMessage(entry) {
    const id = entryId(entry);
    const li = document.createElement('li');
    li.className = 'diary-guest-item';
    li.dataset.entryId = id;

    const head = document.createElement('div');
    head.className = 'diary-guest-item-head';

    const name = document.createElement('span');
    name.className = 'diary-guest-item-name';
    name.textContent = entry.name || 'полевой гость';

    const meta = document.createElement('span');
    meta.className = 'diary-guest-item-meta';
    meta.textContent = formatDate(entry.at);

    head.appendChild(name);
    head.appendChild(meta);

    const text = document.createElement('p');
    text.className = 'diary-guest-item-text';
    text.textContent = entry.text;

    li.appendChild(head);
    li.appendChild(text);
    li.appendChild(renderReactions(id));
    return li;
  }

  function renderList(entries) {
    if (!listEl) return;
    listEl.innerHTML = '';
    if (!entries.length) {
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    entries.forEach((entry) => listEl.appendChild(renderMessage(entry)));
  }

  function onReactionClick(event) {
    const btn = event.target.closest('.diary-guest-react-btn');
    if (!btn) return;

    const id = btn.dataset.entryId;
    const key = btn.dataset.react;
    if (!id || !key) return;

    const reactions = loadReactions();
    const row = reactions[id] || { heart: 0, up: 0, down: 0, mine: null };

    if (row.mine === key) {
      row[key] = Math.max(0, (row[key] || 0) - 1);
      row.mine = null;
    } else {
      if (row.mine) row[row.mine] = Math.max(0, (row[row.mine] || 0) - 1);
      row[key] = (row[key] || 0) + 1;
      row.mine = key;
    }

    reactions[id] = row;
    saveReactions(reactions);

    const li = listEl?.querySelector('[data-entry-id="' + id + '"]');
    if (li) {
      const old = li.querySelector('.diary-guest-reactions');
      if (old) old.replaceWith(renderReactions(id));
    }
  }

  listEl?.addEventListener('click', onReactionClick);

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function fetchConfig() {
    try {
      const res = await fetch('data/site-config.json');
      return res.ok ? res.json() : {};
    } catch {
      return {};
    }
  }

  async function initSupabase(config) {
    const url = (config.supabaseUrl || '').trim();
    const key = (config.supabaseAnonKey || '').trim();
    if (!url || !key) return false;

    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js');
    if (!globalThis.supabase?.createClient) return false;

    supabase = globalThis.supabase.createClient(url, key);
    return true;
  }

  async function fetchLiveMessages() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('guest_messages')
      .select('id, name, text, created_at')
      .order('created_at', { ascending: false })
      .limit(80);

    if (error) throw error;
    return (data || []).map(normalizeRow);
  }

  function subscribeLive() {
    if (!supabase || realtimeChannel) return;

    realtimeChannel = supabase
      .channel('guest-book-live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guest_messages' },
        async () => {
          try {
            renderList(await fetchLiveMessages());
          } catch (_) { /* ignore */ }
        }
      )
      .subscribe();
  }

  async function bootstrap() {
    const config = await fetchConfig();
    const live = await initSupabase(config);

    if (live) {
      try {
        renderList(await fetchLiveMessages());
        subscribeLive();
      } catch {
        showStatus('лента не загрузилась · проверь supabase', false);
        renderList([]);
      }
    } else {
      showStatus('live-лента: один раз настрой supabase (data/supabase-guestbook.sql)', false);
      try {
        const res = await fetch('data/guestbook.json');
        const data = res.ok ? await res.json() : { messages: [] };
        renderList((data.messages || []).map((m) => normalizeRow({ ...m, created_at: m.at })));
      } catch {
        renderList([]);
      }
    }

    if (!form || !msgInput) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (hpInput && hpInput.value.trim()) return;

      const text = msgInput.value.trim();
      if (!text) return;

      const name = (nameInput?.value.trim() || 'полевой гость').slice(0, 32);

      if (submitBtn) submitBtn.disabled = true;

      if (!supabase) {
        showStatus('сначала подключи supabase — см. data/supabase-guestbook.sql', false);
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      const { error } = await supabase.from('guest_messages').insert({ name, text });

      if (error) {
        showStatus('не улетело · ' + (error.message || 'ошибка'), false);
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      showStatus('поле получило ✦ записка в общей ленте', true);
      msgInput.value = '';
      if (nameInput) nameInput.value = '';
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  bootstrap();
})();
