(function (global) {
  const STORAGE_KEY = 'gifworld-field-radio';

  const PLAYLIST = [
    { title: 'rainy lofi city', src: 'music/rainy-lofi-city-lofi-music-332746.mp3' },
    { title: 'carefree field', src: 'music/carefree-field.mp3' },
    { title: 'daily beetle', src: 'music/daily-beetle-field.mp3' },
    { title: 'chill wave', src: 'music/chill-wave.mp3' },
    { title: 'easy lemon', src: 'music/easy-lemon.mp3' },
    { title: 'local forecast', src: 'music/local-forecast-elevator.mp3' },
  ];

  let audio = null;
  let trackIndex = 0;
  let saveTimer = null;
  let uiHook = null;
  let linkPersistBound = false;

  function readState() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function writeState(partial) {
    const next = { ...readState(), ...partial };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function compensatedSeekTime(state) {
    const base = state.currentTime || 0;
    if (!state.playing || !state.savedAt) return base;
    return base + (Date.now() - state.savedAt) / 1000;
  }

  function trackFileFromSrc(src) {
    if (!src) return '';
    try {
      return src.split('/').pop().split('?')[0];
    } catch {
      return '';
    }
  }

  function hasTrackLoaded(a, trackSrc) {
    const expected = trackFileFromSrc(trackSrc);
    return expected && a.src && a.src.includes(expected);
  }

  function mountAudio() {
    if (audio) return audio;

    const existing = document.getElementById('fieldRadioGlobalAudio');
    if (existing) {
      audio = existing;
      return audio;
    }

    audio = document.createElement('audio');
    audio.id = 'fieldRadioGlobalAudio';
    audio.preload = 'auto';
    audio.setAttribute('playsinline', '');
    (document.body || document.documentElement).appendChild(audio);
    return audio;
  }

  function resolveAudio(existingId) {
    if (audio) return audio;

    const globalEl = document.getElementById('fieldRadioGlobalAudio');
    if (globalEl) {
      audio = globalEl;
      return audio;
    }

    if (existingId) {
      const el = document.getElementById(existingId);
      if (el) {
        audio = el;
        return audio;
      }
    }

    return mountAudio();
  }

  function persistSoon() {
    clearTimeout(saveTimer);
    saveTimer = window.setTimeout(persistNow, 350);
  }

  function persistNow() {
    if (!audio) return;
    writeState({
      trackIndex,
      currentTime: audio.currentTime || 0,
      playing: !audio.paused,
      volume: audio.volume,
      savedAt: Date.now(),
    });
  }

  function notifyUi() {
    if (typeof uiHook === 'function') uiHook();
  }

  function bindLinkPersist() {
    if (linkPersistBound) return;
    linkPersistBound = true;
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link || !audio) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || /^https?:|^mailto:|^tel:/.test(href)) return;
      persistNow();
    }, true);
  }

  function bindCoreEvents() {
    if (!audio || audio.dataset.fieldRadioBound === '1') return;
    audio.dataset.fieldRadioBound = '1';
    audio.addEventListener('timeupdate', persistSoon);
    audio.addEventListener('play', persistNow);
    audio.addEventListener('pause', persistNow);
    audio.addEventListener('ended', () => loadTrack(trackIndex + 1, true));
    window.addEventListener('pagehide', persistNow);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') persistNow();
    });
    bindLinkPersist();
  }

  function seekAndPlay(a, seekTime) {
    if (seekTime > 0) {
      try {
        const maxTime = Number.isFinite(a.duration) && a.duration > 0
          ? Math.max(0, a.duration - 0.05)
          : seekTime;
        a.currentTime = Math.min(seekTime, maxTime);
      } catch (_) {}
    }
    a.play().catch(() => {
      writeState({ playing: false });
      notifyUi();
    });
  }

  function resumeFromState(a, state) {
    if (!state.playing) return;
    if (a.dataset.fieldRadioResuming === '1') return;
    a.dataset.fieldRadioResuming = '1';

    const seek = compensatedSeekTime(state);
    a.preload = 'auto';

    function tryResume() {
      a.dataset.fieldRadioResuming = '0';
      seekAndPlay(a, seek);
      notifyUi();
    }

    if (a.readyState >= 2) tryResume();
    else a.addEventListener('canplay', tryResume, { once: true });
  }

  function loadTrack(index, autoplay, seekTime) {
    trackIndex = (index + PLAYLIST.length) % PLAYLIST.length;
    const track = PLAYLIST[trackIndex];
    const a = audio;
    if (!a) return;

    const wasPlaying = autoplay || !a.paused;
    a.pause();
    a.preload = wasPlaying ? 'auto' : 'metadata';
    a.src = track.src;
    a.load();

    writeState({ trackIndex, playing: wasPlaying, savedAt: Date.now() });

    function afterMeta() {
      if (typeof seekTime === 'number' && seekTime > 0) {
        seekAndPlay(a, seekTime);
      } else if (wasPlaying) {
        a.play().catch(() => {
          writeState({ playing: false });
          notifyUi();
        });
      }
      notifyUi();
    }

    if (a.readyState >= 2) afterMeta();
    else a.addEventListener('canplay', afterMeta, { once: true });
  }

  function earlyBootstrap() {
    const state = readState();
    if (!state.playing) return;

    trackIndex = Number.isInteger(state.trackIndex) ? state.trackIndex : 0;
    const a = mountAudio();
    bindCoreEvents();

    if (typeof state.volume === 'number') a.volume = state.volume;
    else a.volume = 0.72;

    const track = PLAYLIST[trackIndex];
    if (!hasTrackLoaded(a, track.src)) {
      a.src = track.src;
      a.load();
    }

    resumeFromState(a, state);
  }

  function initBackground(options) {
    options = options || {};
    const state = readState();
    trackIndex = Number.isInteger(state.trackIndex) ? state.trackIndex : 0;

    resolveAudio(options.audioId);
    bindCoreEvents();

    if (typeof state.volume === 'number') audio.volume = state.volume;
    else audio.volume = 0.72;

    if (state.playing && (!audio.paused || audio.dataset.fieldRadioResuming === '1')) {
      notifyUi();
      return;
    }

    const track = PLAYLIST[trackIndex];
    if (!audio.src) {
      audio.src = track.src;
    }

    if (state.playing) {
      if (!hasTrackLoaded(audio, track.src)) {
        loadTrack(trackIndex, true, compensatedSeekTime(state));
      } else {
        resumeFromState(audio, state);
      }
    }

    notifyUi();
  }

  function initPlayer(options) {
    if (!options) return;

    resolveAudio(options.audioId);
    bindCoreEvents();

    const state = readState();
    trackIndex = Number.isInteger(state.trackIndex) ? state.trackIndex : 0;

    if (typeof state.volume === 'number') audio.volume = state.volume;
    else if (options.volumeInput) audio.volume = Number(options.volumeInput.value) / 100;
    else audio.volume = 0.72;

    uiHook = function refreshUi() {
      const track = PLAYLIST[trackIndex];
      const playing = audio && !audio.paused;

      if (options.radio) options.radio.classList.toggle('is-playing', playing);
      if (options.toggleBtn) {
        options.toggleBtn.textContent = playing ? 'STOP' : 'PLAY';
        options.toggleBtn.setAttribute('data-tip', playing ? 'остановить трек' : 'воспроизвести трек');
      }
      if (options.statusEl) options.statusEl.textContent = playing ? 'в эфире' : 'тишина';
      if (options.trackEl) options.trackEl.textContent = track.title;
      if (options.trackNumEl) options.trackNumEl.textContent = (trackIndex + 1) + ' / ' + PLAYLIST.length;
      if (options.titleEl) options.titleEl.textContent = track.title;
      if (options.musicStatusEl) options.musicStatusEl.textContent = playing ? 'играет' : 'тишина';
      if (options.musicToggleBtn) options.musicToggleBtn.textContent = playing ? 'STOP' : 'PLAY';

      const duration = audio.duration || 0;
      const current = audio.currentTime || 0;
      const pct = duration ? (current / duration) * 100 : 0;
      if (options.progressFill) options.progressFill.style.width = pct + '%';
      if (options.timeEl) options.timeEl.textContent = formatTime(current) + ' / ' + formatTime(duration);

      if (options.playlistEl) {
        options.playlistEl.querySelectorAll('[data-playlist-index]').forEach((btn) => {
          btn.classList.toggle('is-active', Number(btn.dataset.playlistIndex) === trackIndex);
        });
      }
    };

    const track = PLAYLIST[trackIndex];
    if (!audio.src) {
      audio.src = track.src;
    }

    if (state.playing && (!audio.paused || audio.dataset.fieldRadioResuming === '1')) {
      uiHook();
    } else if (state.playing) {
      const seek = compensatedSeekTime(state);
      const resume = () => {
        if (seek > 0 && Math.abs(audio.currentTime - seek) > 0.25) {
          seekAndPlay(audio, seek);
        } else {
          audio.play().catch(() => writeState({ playing: false }));
        }
        uiHook();
      };
      if (audio.readyState >= 2) resume();
      else audio.addEventListener('canplay', resume, { once: true });
    }

    uiHook();

    if (options.toggleBtn) {
      options.toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
          if (!audio.src) loadTrack(trackIndex, true);
          else {
            audio.play().then(() => {
              persistNow();
              if (options.onPlay) options.onPlay(PLAYLIST[trackIndex].title);
              uiHook();
            }).catch(() => {
              if (options.statusEl) options.statusEl.textContent = 'нет сигнала';
            });
          }
        } else {
          audio.pause();
          persistNow();
          uiHook();
        }
      });
    }

    if (options.prevBtn) {
      options.prevBtn.addEventListener('click', () => loadTrack(trackIndex - 1, true));
    }

    if (options.nextBtn) {
      options.nextBtn.addEventListener('click', () => loadTrack(trackIndex + 1, true));
    }

    if (options.progressBar) {
      options.progressBar.addEventListener('click', (event) => {
        const rect = options.progressBar.getBoundingClientRect();
        const ratio = (event.clientX - rect.left) / rect.width;
        if (audio.duration) audio.currentTime = ratio * audio.duration;
        uiHook();
      });
    }

    if (options.volumeInput) {
      options.volumeInput.addEventListener('input', () => {
        audio.volume = Number(options.volumeInput.value) / 100;
        persistNow();
      });
    }

    if (options.playlistEl) {
      PLAYLIST.forEach((track, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'music-playlist-item';
        btn.dataset.playlistIndex = String(i);
        btn.innerHTML = track.title + ' <span>track ' + (i + 1) + '</span>';
        btn.addEventListener('click', () => loadTrack(i, true));
        options.playlistEl.appendChild(btn);
      });
    }

    audio.addEventListener('timeupdate', uiHook);
    audio.addEventListener('loadedmetadata', uiHook);
  }

  global.FieldRadio = {
    PLAYLIST,
    initBackground,
    initPlayer,
    persistNow,
  };

  earlyBootstrap();
})(window);
