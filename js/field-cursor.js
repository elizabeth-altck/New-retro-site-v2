/* PARKED 2026-07-14 — rose cursor off main; keep for experiment/rose-cursor branch. Re-link CSS+JS+#fieldCursor to restore. */
(function () {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  const layer = document.getElementById('fieldCursor');
  if (!layer) return;

  const img = layer.querySelector('img');
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const hotspotX = parseInt(styles.getPropertyValue('--cursor-hotspot-x'), 10) || 16;
  const hotspotY = parseInt(styles.getPropertyValue('--cursor-hotspot-y'), 10) || 4;
  const pressSrc = (layer.dataset.cursorPress || styles.getPropertyValue('--cursor-press-src') || '').trim().replace(/^["']|["']$/g, '');

  root.classList.add('field-cursor-active');

  function moveCursor(clientX, clientY) {
    layer.style.transform = `translate3d(${clientX - hotspotX}px, ${clientY - hotspotY}px, 0)`;
    layer.hidden = false;
  }

  function setPressed(on) {
    layer.classList.toggle('is-pressed', on);
    if (!img || !pressSrc) return;
    img.src = on ? pressSrc : (layer.dataset.cursorDefault || img.dataset.defaultSrc || img.getAttribute('src'));
  }

  if (img) {
    layer.dataset.cursorDefault = img.getAttribute('src');
    img.dataset.defaultSrc = img.getAttribute('src');
  }

  document.addEventListener('mousemove', (event) => {
    moveCursor(event.clientX, event.clientY);
    const interactive = event.target.closest(
      'a, button, label, input, select, textarea, summary, [role="button"], .signal-target, .signal-game-btn, .snail-object'
    );
    layer.classList.toggle('is-pointer', !!interactive && !layer.classList.contains('is-suppressed'));
  }, { passive: true });

  document.addEventListener('mousedown', () => setPressed(true));
  document.addEventListener('mouseup', () => setPressed(false));
  window.addEventListener('blur', () => setPressed(false));

  document.addEventListener('mouseleave', () => {
    layer.hidden = true;
    setPressed(false);
  });

  const gameArena = document.getElementById('gameArena');
  if (gameArena) {
    gameArena.addEventListener('mouseenter', () => {
      layer.classList.add('is-suppressed');
      layer.classList.remove('is-pointer');
    });
    gameArena.addEventListener('mouseleave', () => layer.classList.remove('is-suppressed'));
  }
})();
