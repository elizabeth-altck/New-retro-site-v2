(function () {
  const LEFT_ADS = [
    { head: '!!! WIN !!!', text: 'вы выиграли 5 огурцов. заберите на поле.', btn: 'ЗАБРАТЬ', style: 'hot' },
    { head: 'hot singles', text: '3 улитки в 2 км от тебя. MEET.', btn: 'MEET', style: 'cyan' },
    { head: 'free RAM', text: 'освободи 32 мб тревоги. 100% safe.', btn: 'OK', style: 'lime' },
    { head: 'vibe 2003', text: 'скачай патч настроения v0.4', btn: 'DL', style: 'purple' },
    { head: 'snail VPN', text: 'анонимность: низкая. улитка видит.', btn: 'GO', style: 'lime' },
  ];

  const RIGHT_ADS = [
    { head: 'lucky.field', text: 'погладь поле — +1 спокойствие', btn: '✦', style: 'gold' },
    { head: 'mystery box', text: 'внутри: возможно гифка. возможно ничего.', btn: 'OPEN', style: 'purple' },
    { head: 'frog alert', text: 'лягушка смотрит с луга. это нормально.', btn: 'RIBBIT', style: 'lime' },
  ];

  const NEIGHBORS = [
    { src: 'images/characters/friend-frog.gif', label: 'frog.exe', href: 'gallery.html' },
    { src: 'images/characters/friend-butterfly.gif', label: 'butterfly.sys', href: 'gallery.html' },
    { src: 'images/characters/mystery-cat.gif', label: 'cat???', href: 'gallery.html' },
  ];

  const BLINKIES = [
    'images/blinkies/wall/wall-gif-world.gif',
    'images/blinkies/wall/wall-pole-online.gif',
    'images/blinkies/wall/wall-good-vibes.gif',
    'images/blinkies/wall/wall-snail-mail.gif',
    'images/blinkies/wall/wall-free-hugs.gif',
    'images/blinkies/wall/wall-under-field.gif',
  ];

  function renderAd(ad) {
    const card = document.createElement('article');
    card.className = 'sidebar-ad-card sidebar-ad-card--' + (ad.style || 'hot');
    card.innerHTML =
      '<div class="sidebar-ad-head">' + ad.head + '</div>' +
      '<div class="sidebar-ad-body">' + ad.text +
      '<button type="button" class="sidebar-ad-btn">' + ad.btn + '</button></div>';
    card.querySelector('.sidebar-ad-btn')?.addEventListener('click', () => {
      card.classList.add('is-pop');
      window.setTimeout(() => card.classList.remove('is-pop'), 320);
      const eventsList = document.getElementById('eventsList');
      if (eventsList) {
        const li = document.createElement('li');
        li.textContent = 'реклама: ' + ad.head.toLowerCase();
        eventsList.appendChild(li);
      }
    });
    return card;
  }

  function renderNeighbor(n) {
    const fig = document.createElement('figure');
    fig.className = 'sidebar-neighbor';
    fig.innerHTML =
      '<a href="' + n.href + '"><img src="' + n.src + '" alt="" width="48" height="48"></a>' +
      '<figcaption>' + n.label + '</figcaption>';
    return fig;
  }

  function fillLeft(el) {
    if (!el) return;
    const label = document.createElement('p');
    label.className = 'sidebar-field-label';
    label.textContent = 'реклама поля · лента';
    el.appendChild(label);
    LEFT_ADS.forEach((ad) => el.appendChild(renderAd(ad)));
  }

  function fillRight(el) {
    if (!el) return;
    const neighLabel = document.createElement('p');
    neighLabel.className = 'sidebar-field-label';
    neighLabel.textContent = 'соседи · peeks';
    el.appendChild(neighLabel);

    const neighWrap = document.createElement('div');
    neighWrap.className = 'sidebar-neighbors';
    NEIGHBORS.forEach((n) => neighWrap.appendChild(renderNeighbor(n)));
    el.appendChild(neighWrap);

    const blinkLabel = document.createElement('p');
    blinkLabel.className = 'sidebar-field-label';
    blinkLabel.textContent = 'blinkies · стена';
    el.appendChild(blinkLabel);

    const blinkWrap = document.createElement('div');
    blinkWrap.className = 'sidebar-blinkie-stack';
    BLINKIES.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.width = 88;
      img.height = 31;
      blinkWrap.appendChild(img);
    });
    el.appendChild(blinkWrap);

    const adLabel = document.createElement('p');
    adLabel.className = 'sidebar-field-label';
    adLabel.textContent = 'ещё реклама · почему нет';
    el.appendChild(adLabel);

    RIGHT_ADS.forEach((ad) => el.appendChild(renderAd(ad)));
  }

  fillLeft(document.getElementById('leftSidebarFill'));
  fillRight(document.getElementById('rightSidebarFill'));
})();
