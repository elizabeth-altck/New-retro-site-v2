(function () {
  const STORAGE_KEY = 'gifworld-snail-tama';
  const SCROLL_KEY = 'gifworld-main-scroll-y';
  const layer = document.getElementById('tamaWidgetLayer');
  const panel = document.getElementById('tamaWidgetPanel');
  const dragHandle = document.getElementById('tamaWidgetDragHandle');
  const zhanna = document.getElementById('tamaWidgetZhanna');
  const anna = document.getElementById('tamaWidgetAnna');
  const reactionEl = document.getElementById('tamaWidgetReaction');
  const annaReactionEl = document.getElementById('tamaWidgetAnnaReaction');
  const statusEl = document.getElementById('tamaWidgetStatus');
  const moodLabel = document.getElementById('tamaWidgetMoodLabel');
  const hungerLabel = document.getElementById('tamaWidgetHungerLabel');
  const moodBar = document.getElementById('tamaWidgetMoodBar');
  const hungerBar = document.getElementById('tamaWidgetHungerBar');
  const party = document.getElementById('tamaWidgetParty');

  const params = new URLSearchParams(window.location.search);
  const wantsTama = params.get('tama') === '1' || window.location.hash === '#tama-widget';
  const isMainPage = /(?:^|\/)main\.html$/.test(window.location.pathname)
    || window.location.pathname.endsWith('/');

  if (!layer || !panel) return;

  let savedScrollY = 0;
  let dragActive = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let panelOffsetX = 0;
  let panelOffsetY = 0;
  let walkTimer = null;

  const QUICK_LINES = {
    pet: {
      zhanna: ['~', 'purr', '♥'],
      anna: ['~', 'nice', 'ок'],
      status: ['мягко. раковина тёплая.', 'Жанна purr-snail mode.', 'Анна кивает сбоку.'],
    },
    feed: {
      zhanna: ['nom', 'хрум', 'yum'],
      anna: ['~', 'вкусно?', 'м'],
      status: ['хрум. огурец ок.', 'перекус принят.', 'обе довольны.'],
    },
    walk: {
      zhanna: ['…', 'go', '~'],
      anna: ['!', 'yaay', '~'],
      status: ['короткая прогулка по лугу.', 'медленно и nice.', 'Анна ведёт, Жанна следует.'],
    },
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

  let state = loadState();

  function moodWord(v) {
    if (!state.alive) return 'unconscious';
    if (v >= 85) return 'blissful';
    if (v >= 65) return 'content';
    if (v >= 45) return 'judging';
    if (v >= 25) return 'miffed';
    return 'tragic';
  }

  function hungerWord(v) {
    if (v >= 75) return 'starving';
    if (v >= 50) return 'peckish';
    if (v >= 25) return 'snacking';
    return 'full';
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function setReaction(el, text, ms) {
    if (!el) return;
    el.hidden = false;
    el.textContent = text;
    window.clearTimeout(el._t);
    el._t = window.setTimeout(() => {
      el.hidden = true;
    }, ms || 1800);
  }

  function setZhannaClass(...classes) {
    if (!zhanna) return;
    zhanna.classList.remove('is-shy', 'is-hop', 'is-pet', 'is-eating', 'is-squished', 'is-walk');
    classes.forEach((c) => zhanna.classList.add(c));
  }

  function setAnnaClass(...classes) {
    if (!anna) return;
    anna.classList.remove('is-shy', 'is-hop', 'is-pet', 'is-walk', 'is-visible');
    classes.forEach((c) => anna.classList.add(c));
    if (state.friendship >= 40 || state.walking || !state.alive) {
      anna.classList.add('is-visible');
    }
  }

  function renderStats() {
    if (moodLabel) moodLabel.textContent = moodWord(state.mood);
    if (hungerLabel) hungerLabel.textContent = hungerWord(state.hunger);
    if (moodBar) {
      moodBar.style.width = state.mood + '%';
      moodBar.classList.toggle('is-low', state.mood < 35);
    }
    if (hungerBar) {
      hungerBar.style.width = state.hunger + '%';
      hungerBar.classList.toggle('is-low', state.hunger > 65);
    }
    if (anna) {
      anna.classList.toggle('is-visible', state.friendship >= 40 || state.walking || !state.alive);
    }
    if (zhanna) {
      zhanna.classList.toggle('is-squished', !state.alive);
    }
    layer.querySelectorAll('[data-tama-quick]').forEach((btn) => {
      btn.disabled = !state.alive || state.walking;
    });
    if (statusEl && !state.alive) {
      statusEl.textContent = 'Жанна сплющена. открой полный tamagotchi → оживить.';
    }
  }

  function reactQuick(kind) {
    const pack = QUICK_LINES[kind];
    if (!pack) return;
    setReaction(reactionEl, pick(pack.zhanna), 1600);
    if (anna?.classList.contains('is-visible')) {
      setReaction(annaReactionEl, pick(pack.anna), 1600);
    }
    if (statusEl && pack.status?.length) {
      statusEl.textContent = pick(pack.status);
    }
  }

  function stopWalk() {
    if (!state.walking) return;
    state.walking = false;
    if (party) party.classList.remove('is-walking');
    setZhannaClass('is-hop');
    setAnnaClass('is-hop', 'is-visible');
    window.setTimeout(() => {
      setZhannaClass();
      setAnnaClass('is-visible');
    }, 700);
    renderStats();
  }

  function startWalk() {
    if (!state.alive || state.walking) return;
    state.walking = true;
    state.mood = clamp(state.mood + 8, 0, 100);
    state.friendship = clamp(state.friendship + 6, 0, 100);
    state.walks += 1;
    reactQuick('walk');
    setZhannaClass('is-walk');
    setAnnaClass('is-walk', 'is-visible');
    if (party) party.classList.add('is-walking');
    renderStats();
    saveState();
    window.clearTimeout(walkTimer);
    walkTimer = window.setTimeout(() => {
      stopWalk();
      if (statusEl) statusEl.textContent = 'вернулись. vibe +.';
      saveState();
    }, 3600);
  }

  function closeDesktopWidget() {
    const desktop = document.getElementById('desktopWidgetLayer');
    if (desktop && !desktop.hidden) {
      desktop.hidden = true;
      desktop.classList.remove('is-open');
      desktop.setAttribute('aria-hidden', 'true');
      const launcher = document.getElementById('desktopWidgetLauncher');
      if (launcher) {
        launcher.classList.remove('is-hidden');
        launcher.setAttribute('aria-expanded', 'false');
      }
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
    }
  }

  function lockPageScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockPageScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScrollY);
  }

  function markTamaInUrl() {
    const path = window.location.pathname || 'main.html';
    window.history.replaceState({}, '', `${path}?tama=1`);
  }

  function clearTamaFromUrl() {
    if (params.has('tama') || window.location.hash === '#tama-widget') {
      const path = window.location.pathname || 'main.html';
      window.history.replaceState({}, '', path);
    }
  }

  function setOpen(open) {
    if (open) {
      closeDesktopWidget();
      state = loadState();
      renderStats();
      lockPageScroll();
    } else {
      unlockPageScroll();
    }

    layer.hidden = !open;
    layer.classList.toggle('is-open', open);
    layer.setAttribute('aria-hidden', open ? 'false' : 'true');

    if (!open) {
      panelOffsetX = 0;
      panelOffsetY = 0;
      panel.style.transform = '';
      stopWalk();
    }
  }

  function openTamaWidget() {
    setOpen(true);
  }

  function closeTamaWidget() {
    setOpen(false);
    clearTamaFromUrl();
  }

  layer.addEventListener('click', (event) => {
    if (event.target.closest('[data-tama-widget-close]')) closeTamaWidget();
  });

  document.querySelectorAll('[data-tama-quick]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!state.alive || state.walking) return;
      const action = btn.getAttribute('data-tama-quick');
      if (action === 'pet') {
        state.mood = clamp(state.mood + 10, 0, 100);
        state.pets += 1;
        reactQuick('pet');
        setZhannaClass('is-pet');
        setAnnaClass('is-pet', 'is-visible');
        window.setTimeout(() => {
          setZhannaClass();
          setAnnaClass('is-visible');
        }, 900);
      }
      if (action === 'feed') {
        state.hunger = clamp(state.hunger - 16, 0, 100);
        state.mood = clamp(state.mood + 4, 0, 100);
        state.feeds += 1;
        reactQuick('feed');
        setZhannaClass('is-eating');
        setAnnaClass('is-visible');
        window.setTimeout(() => {
          setZhannaClass(state.mood > 70 ? 'is-hop' : '');
          setAnnaClass('is-visible');
        }, 800);
      }
      if (action === 'walk') startWalk();
      saveState();
      renderStats();
    });
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest(
      'a[href="#tama-widget"], a[href="main.html#tama-widget"], a[href="tama-widget.html"], a[href="./tama-widget.html"]'
    );
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const modifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1;

    if (isMainPage) {
      if (modifiedClick) {
        try {
          sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
        } catch (_) {}
        return;
      }
      event.preventDefault();
      openTamaWidget();
      markTamaInUrl();
      return;
    }

    if (href === '#tama-widget' || href === 'main.html#tama-widget') {
      event.preventDefault();
      openTamaWidget();
      window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}#tama-widget`);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !layer.hidden) closeTamaWidget();
  });

  if (dragHandle) {
    dragHandle.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      dragActive = true;
      dragHandle.classList.add('is-dragging');
      dragHandle.setPointerCapture(event.pointerId);
      dragOffsetX = event.clientX - panelOffsetX;
      dragOffsetY = event.clientY - panelOffsetY;
      event.preventDefault();
    });

    dragHandle.addEventListener('pointermove', (event) => {
      if (!dragActive) return;
      panelOffsetX = event.clientX - dragOffsetX;
      panelOffsetY = event.clientY - dragOffsetY;
      panel.style.transform = `translate(${panelOffsetX}px, ${panelOffsetY}px)`;
    });

    function endDrag(event) {
      if (!dragActive) return;
      dragActive = false;
      dragHandle.classList.remove('is-dragging');
      if (dragHandle.hasPointerCapture(event.pointerId)) {
        dragHandle.releasePointerCapture(event.pointerId);
      }
    }

    dragHandle.addEventListener('pointerup', endDrag);
    dragHandle.addEventListener('pointercancel', endDrag);
  }

  function scheduleOpen() {
    window.setTimeout(() => openTamaWidget(), wantsTama ? 400 : 900);
  }

  if (wantsTama) {
    try {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved != null) {
        const y = parseInt(saved, 10);
        if (!Number.isNaN(y)) window.scrollTo(0, y);
        sessionStorage.removeItem(SCROLL_KEY);
      }
    } catch (_) {}

    try {
      if (localStorage.getItem('gifworld-welcome-seen') === '1') {
        scheduleOpen();
      } else {
        const welcomeLayer = document.getElementById('sitePopupLayer');
        const observer = new MutationObserver(() => {
          if (welcomeLayer?.hidden) {
            observer.disconnect();
            scheduleOpen();
          }
        });
        if (welcomeLayer) observer.observe(welcomeLayer, { attributes: true, attributeFilter: ['hidden'] });
        window.setTimeout(scheduleOpen, 3200);
      }
    } catch (_) {
      scheduleOpen();
    }
  }

  window.GifWorldTamaWidget = { open: openTamaWidget, close: closeTamaWidget, reload: () => { state = loadState(); renderStats(); } };
})();
