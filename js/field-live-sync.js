(function () {
  const STORAGE_KEY = 'gifworld-snail-tama';

  function moodWord(v, alive) {
    if (alive === false) return 'без сознания';
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

  function loadTamaState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { mood: 68, hunger: 42, alive: true };
      return { mood: 68, hunger: 42, alive: true, ...JSON.parse(raw) };
    } catch {
      return { mood: 68, hunger: 42, alive: true };
    }
  }

  function syncFieldStats() {
    const moodEl = document.getElementById('fieldSnailMoodValue');
    const hungerEl = document.getElementById('fieldSnailHungerValue');
    if (!moodEl && !hungerEl) return;

    const state = loadTamaState();
    if (moodEl) moodEl.textContent = moodWord(state.mood, state.alive);
    if (hungerEl) hungerEl.textContent = hungerWord(state.hunger);
  }

  window.GifWorldFieldLive = { sync: syncFieldStats };

  syncFieldStats();
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) syncFieldStats();
  });
  window.addEventListener('gifworld-tama-update', syncFieldStats);
})();
