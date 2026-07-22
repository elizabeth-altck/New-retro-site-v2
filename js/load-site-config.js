(function (global) {
  function normalizeEndpoint(value) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    return trimmed || '';
  }

  global.applySiteFormEndpoints = function applySiteFormEndpoints(config) {
    const siteNote = document.getElementById('siteNoteForm');

    if (siteNote && config) {
      siteNote.dataset.endpoint = normalizeEndpoint(config.noteEndpoint);
    }
  };

  global.loadSiteFormEndpoints = function loadSiteFormEndpoints() {
    return fetch('data/site-config.json')
      .then((response) => (response.ok ? response.json() : {}))
      .then((config) => {
        global.applySiteFormEndpoints(config || {});
        return config || {};
      })
      .catch(() => {
        global.applySiteFormEndpoints({});
        return {};
      });
  };
})(window);
