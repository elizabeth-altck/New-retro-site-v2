(function () {
  const STORAGE_KEY = 'gifworld-snail-tama';
  const meadow = document.getElementById('tamaMeadow');
  const party = document.getElementById('tamaParty');
  const zhanna = document.getElementById('tamaZhanna');
  const anna = document.getElementById('tamaAnna');
  const reactionEl = document.getElementById('tamaReaction');
  const annaReactionEl = document.getElementById('tamaAnnaReaction');
  const statusEl = document.getElementById('tamaStatus');
  const moodLabel = document.getElementById('tamaMoodLabel');
  const hungerLabel = document.getElementById('tamaHungerLabel');
  const friendLabel = document.getElementById('tamaFriendLabel');
  const moodBar = document.getElementById('tamaMoodBar');
  const hungerBar = document.getElementById('tamaHungerBar');
  const friendBar = document.getElementById('tamaFriendBar');
  const reviveBtn = document.getElementById('tamaReviveBtn');

  if (!zhanna) return;

  const FOODS = {
    cucumber: { hunger: -18, mood: 2, lines: ['хрум. огурец — классика лета.', 'Жанна жуёт медленно и с достоинством.', 'Анна крадёт крошечный кусочек.'] },
    lettuce: { hunger: -14, mood: 4, lines: ['листья шуршат. спокойствие +.', 'салат принят обеими.', 'зелень пахнет росой.'] },
    mushroom: { hunger: -26, mood: 6, lines: ['гриб! глаза загорелись.', 'лесной гриб — находка дня.', 'Анна: о, это было смело.'] },
    berry: { hunger: -12, mood: 10, lines: ['ягодка!! сладко.', 'маленькая радость на лугу.', 'обе улитки довольны.'] },
  };

  const lines = {
    pet: ['мягко. раковина тёплая.', 'Жанна purr-snail mode.', 'она запомнила это.', 'Анна одобряет с боковой линии.'],
    kick: ['не надо. обиделась.', 'раковина в retract.', 'поле осудило.', 'Анна: эй, нельзя.'],
    walk: ['они ползут по лугу.', 'медленная прогулка. идеально.', 'Анна рассказывает что-то. Жанна слушает.', 'дружба растёт, как одуванчик.'],
    squishDead: ['...тишина.', 'Жанна сплющена. кажется, без сознания.', 'луг затаил дыхание.'],
    squishRevive: ['Анна: ЖАННА!!', 'раковина снова выпрямилась.', 'поле вернуло её. не навсегда.', 'Жанна: …я была где-то тёплом.'],
    revive: ['Анна приползла помочь.', 'ожила. смотрит укоризненно.', 'второй шанс выдан.'],
  };

  const annaLines = {
    pet: ['~', 'nice', 'ок', '♥'],
    kick: ['!', 'эй!', 'стой', '…'],
    walk: ['~', 'go', 'yaay', '…'],
    feed: ['м', 'nom?', 'вкусно', '~'],
    squishDead: ['!!!', 'ЖАННА', '…'],
    squishRevive: ['!', 'жива!', 'фух'],
    revive: ['!', 'жива', '~'],
  };

  const zhannaReact = {
    pet: ['~', 'purr', '♥'],
    kick: ['!', '…', 'нет'],
    walk: ['…', 'go', '~'],
    feed: ['nom', 'хрум', 'yum'],
    squishDead: ['…', '—', ''],
    squishRevive: ['…', '!', '~'],
    revive: ['!', '~', '…'],
  };

  const IDLE_EVENTS = [
    { status: 'травинка тронула усики.', zhanna: '…', anna: null },
    { status: 'над лугом пролетела бабочка.', zhanna: null, anna: '~' },
    { status: 'Жанна моргает очень медленно.', zhanna: '…', anna: null },
    { status: 'Анна что-то шепчет себе под раковину.', zhanna: null, anna: '…' },
    { status: 'где-то вдалеке кукарекает невидимая курица.', zhanna: '?', anna: '?' },
    { status: 'пахнет сеном и спокойствием.', zhanna: null, anna: '~' },
    { status: 'обе улитки смотрят в одну точку.', zhanna: '…', anna: '…' },
  ];

  const MILESTONES = {
    pets: { 5: 'Жанна начала тебя узнавать.', 15: 'вы — знакомые луга.' },
    feeds: { 5: 'перекус стал традицией.', 12: 'улитки ждут угощение.' },
    walks: { 3: 'тропинка уже знакома.', 8: 'лучшие прогулки — медленные.' },
  };

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function defaultState() {
    return {
      mood: 68,
      hunger: 42,
      friendship: 55,
      pets: 0,
      feeds: 0,
      walks: 0,
      squishCount: 0,
      alive: true,
      walking: false,
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return { ...defaultState(), ...JSON.parse(raw) };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function moodWord(v) {
    if (!state.alive) return 'без сознания';
    if (v >= 85) return 'счастлива';
    if (v >= 65) return 'довольна';
    if (v >= 45) return 'смотрит';
    if (v >= 25) return 'обижена';
    return 'грустит';
  }

  function hungerWord(v) {
    if (v >= 75) return 'голодна';
    if (v >= 50) return 'пекут';
    if (v >= 25) return 'перекус';
    return 'сыта';
  }

  function friendWord(v) {
    if (v >= 80) return 'не разлить';
    if (v >= 60) return 'тепло';
    if (v >= 40) return 'вежливо';
    return 'тихо';
  }

  let state = loadState();
  let walkTimer = null;
  let squishTimer = null;
  let idleBusy = false;

  function setReaction(text, ms) {
    if (!reactionEl || !text) return;
    reactionEl.hidden = false;
    reactionEl.textContent = text;
    window.clearTimeout(setReaction._t);
    setReaction._t = window.setTimeout(() => {
      reactionEl.hidden = true;
    }, ms || 2200);
  }

  function setAnnaReaction(text, ms) {
    if (!annaReactionEl || !text) return;
    annaReactionEl.hidden = false;
    annaReactionEl.textContent = text;
    window.clearTimeout(setAnnaReaction._t);
    setAnnaReaction._t = window.setTimeout(() => {
      annaReactionEl.hidden = true;
    }, ms || 2200);
  }

  function reactBoth(kind, ms) {
    const pool = zhannaReact[kind];
    if (pool?.length) {
      const t = pool[Math.floor(Math.random() * pool.length)];
      if (t) setReaction(t, ms);
    }
    const aPool = annaLines[kind];
    if (aPool?.length) {
      const t = aPool[Math.floor(Math.random() * aPool.length)];
      if (t) setAnnaReaction(t, ms);
    }
  }

  function say(text) {
    if (!statusEl) return;
    if (Array.isArray(text)) {
      statusEl.textContent = text[Math.floor(Math.random() * text.length)];
      return;
    }
    statusEl.textContent = text;
  }

  function setSnailClass(...classes) {
    if (!zhanna) return;
    zhanna.classList.remove('is-shy', 'is-hop', 'is-pet', 'is-eating', 'is-squished', 'is-dead', 'is-happy', 'is-walk');
    classes.forEach((c) => zhanna.classList.add(c));
  }

  function setAnnaClass(...classes) {
    if (!anna) return;
    anna.classList.remove(
      'is-shy', 'is-hop', 'is-pet', 'is-eating', 'is-walk', 'is-happy', 'is-panic', 'is-helping', 'is-worried'
    );
    classes.forEach((c) => anna.classList.add(c));
  }

  function checkMilestone(key) {
    const table = MILESTONES[key];
    if (!table) return;
    const n = state[key];
    const msg = table[n];
    if (msg) window.setTimeout(() => say(msg), 600);
  }

  function renderStats() {
    if (moodLabel) moodLabel.textContent = moodWord(state.mood);
    if (hungerLabel) hungerLabel.textContent = hungerWord(state.hunger);
    if (friendLabel) friendLabel.textContent = friendWord(state.friendship);
    if (moodBar) {
      moodBar.style.width = state.mood + '%';
      moodBar.classList.toggle('is-low', state.mood < 35);
    }
    if (hungerBar) {
      hungerBar.style.width = state.hunger + '%';
      hungerBar.classList.toggle('is-low', state.hunger > 65);
    }
    if (friendBar) friendBar.style.width = state.friendship + '%';
    if (reviveBtn) reviveBtn.hidden = state.alive;
    if (meadow) meadow.classList.toggle('is-walking', state.walking);
    if (anna) anna.classList.add('is-visible');
    if (zhanna) {
      zhanna.classList.toggle('is-dead', !state.alive);
      zhanna.classList.toggle('is-squished', !state.alive);
    }
    document.querySelectorAll('[data-tama], [data-food]').forEach((btn) => {
      btn.disabled = !state.alive || state.walking;
    });
    if (reviveBtn) reviveBtn.disabled = false;
  }

  function tickHunger() {
    if (!state.alive || state.walking) return;
    state.hunger = clamp(state.hunger + 1, 0, 100);
    saveState();
    renderStats();
  }

  function stopWalk() {
    if (!state.walking) return;
    state.walking = false;
    if (party) party.classList.remove('is-walking');
    if (meadow) meadow.classList.remove('is-walking');
    setSnailClass('is-happy');
    setAnnaClass('is-happy');
    window.setTimeout(() => {
      setSnailClass();
      setAnnaClass();
    }, 800);
    renderStats();
  }

  function startWalk() {
    if (!state.alive || state.walking) return;
    state.walking = true;
    state.mood = clamp(state.mood + 12, 0, 100);
    state.friendship = clamp(state.friendship + 8, 0, 100);
    state.walks += 1;
    say(lines.walk);
    reactBoth('walk', 3200);
    setSnailClass('is-walk');
    setAnnaClass('is-walk');
    if (party) party.classList.add('is-walking');
    if (meadow) meadow.classList.add('is-walking');
    renderStats();
    saveState();
    checkMilestone('walks');
    window.clearTimeout(walkTimer);
    walkTimer = window.setTimeout(() => {
      stopWalk();
      say(['вернулись. пыль на раковине.', 'прогулка окончена. vibe +.', 'Анна: было nice.']);
      saveState();
    }, 5200);
  }

  function doSquish() {
    if (!state.alive) return;
    state.alive = false;
    state.mood = clamp(state.mood - 35, 0, 100);
    state.squishCount += 1;
    say(lines.squishDead);
    reactBoth('squishDead', 4000);
    setSnailClass('is-squished', 'is-dead');
    setAnnaClass('is-panic');
    renderStats();
    saveState();
    window.clearTimeout(squishTimer);
    squishTimer = window.setTimeout(() => {
      if (state.alive) return;
      say(lines.squishRevive);
      reactBoth('squishRevive', 2500);
      setAnnaClass('is-helping');
      window.setTimeout(() => {
        if (!state.alive) setAnnaClass('is-worried');
        else setAnnaClass();
      }, 2200);
    }, 4500);
  }

  function doRevive() {
    if (state.alive) return;
    state.alive = true;
    state.mood = clamp(state.mood + 20, 0, 100);
    state.friendship = clamp(state.friendship + 5, 0, 100);
    say(lines.revive);
    reactBoth('revive', 2000);
    setSnailClass('is-hop');
    setAnnaClass('is-hop');
    window.setTimeout(() => {
      setSnailClass('is-pet');
      setAnnaClass('is-pet');
    }, 600);
    renderStats();
    saveState();
  }

  function maybeIdleEvent() {
    if (!state.alive || state.walking || idleBusy) return;
    if (reactionEl && !reactionEl.hidden) return;
    if (Math.random() > 0.55) return;
    const ev = IDLE_EVENTS[Math.floor(Math.random() * IDLE_EVENTS.length)];
    idleBusy = true;
    say(ev.status);
    if (ev.zhanna) setReaction(ev.zhanna, 1800);
    if (ev.anna) setAnnaReaction(ev.anna, 1800);
    if (ev.anna && !ev.zhanna) {
      setAnnaClass('is-hop');
      window.setTimeout(() => setAnnaClass(), 1400);
    }
    window.setTimeout(() => { idleBusy = false; }, 2000);
  }

  document.querySelectorAll('[data-food]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!state.alive || state.walking) return;
      const key = btn.getAttribute('data-food');
      const food = FOODS[key];
      if (!food) return;
      state.hunger = clamp(state.hunger + food.hunger, 0, 100);
      state.mood = clamp(state.mood + food.mood, 0, 100);
      state.feeds += 1;
      say(food.lines);
      reactBoth('feed', 1500);
      setSnailClass('is-eating');
      setAnnaClass('is-eating');
      window.setTimeout(() => {
        setSnailClass(state.mood > 70 ? 'is-happy' : '');
        setAnnaClass(state.mood > 70 ? 'is-happy' : '');
        window.setTimeout(() => setAnnaClass(), 900);
      }, 900);
      saveState();
      renderStats();
      checkMilestone('feeds');
    });
  });

  document.querySelectorAll('[data-tama]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-tama');
      if (action === 'revive') {
        doRevive();
        return;
      }
      if (!state.alive || state.walking) return;
      if (action === 'pet') {
        say(lines.pet);
        state.mood = clamp(state.mood + 10, 0, 100);
        state.pets += 1;
        reactBoth('pet', 1800);
        setSnailClass('is-pet');
        setAnnaClass('is-pet');
        window.setTimeout(() => {
          setSnailClass();
          setAnnaClass();
        }, 1200);
        checkMilestone('pets');
      }
      if (action === 'walk') startWalk();
      if (action === 'kick') {
        say(lines.kick);
        state.mood = clamp(state.mood - 18, 0, 100);
        reactBoth('kick', 1200);
        setSnailClass('is-shy');
        setAnnaClass('is-shy');
        window.setTimeout(() => {
          setSnailClass();
          setAnnaClass();
        }, 500);
      }
      if (action === 'squish') doSquish();
      saveState();
      renderStats();
    });
  });

  if (!state.alive) {
    setSnailClass('is-squished', 'is-dead');
    setAnnaClass('is-worried');
  }

  renderStats();
  window.setInterval(tickHunger, 45000);
  window.setInterval(maybeIdleEvent, 24000);
})();
