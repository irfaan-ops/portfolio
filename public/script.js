(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // ---- Theme toggle ----
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  function currentTheme() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }
  document.querySelector('.theme-toggle').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Experience cards: one open at a time ----
  var cards = Array.prototype.slice.call(document.querySelectorAll('.exp'));
  function setOpen(card, open) {
    card.classList.toggle('open', open);
    var btn = card.querySelector('.exp-toggle');
    btn.setAttribute('aria-expanded', String(open));
    card.querySelector('.exp-more-text').textContent = open ? 'Close' : 'Discover';
  }
  cards.forEach(function (card) {
    card.querySelector('.exp-toggle').addEventListener('click', function () {
      var willOpen = !card.classList.contains('open');
      cards.forEach(function (c) { if (c !== card) setOpen(c, false); });
      setOpen(card, willOpen);
      if (willOpen) {
        setTimeout(function () {
          var top = card.getBoundingClientRect().top;
          if (top < 70 || top > window.innerHeight * 0.6) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
    });
  });

  // ---- Project cards (data in projects/data.js) ----
  var grid = document.getElementById('proj-grid');
  var projects = window.PROJECTS || [];
  if (grid && projects.length) {
    var esc = function (t) {
      return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\[([^\]]+)\]/g, '<mark class="ph">$1</mark>');
    };
    grid.innerHTML = projects.map(function (p, i) {
      var num = ('0' + (i + 1)).slice(-2);
      return '<a class="proj-card reveal" href="projects/?p=' + encodeURIComponent(p.slug) + '">' +
        '<span class="proj-fig"><img src="assets/projects/' + p.slug + '-card.svg" alt="" loading="lazy" decoding="async" width="880" height="600"></span>' +
        '<span class="proj-body">' +
          '<span class="proj-meta"><span>' + num + '</span><span>' + esc(p.category || '') + '</span></span>' +
          '<span class="proj-title">' + esc(p.title) + '</span>' +
          '<span class="proj-loc">' + esc(p.location || '') + '</span>' +
          '<span class="proj-more" aria-hidden="true"><span>View project</span><span class="exp-line"></span></span>' +
        '</span></a>';
    }).join('') + (projects.length % 2 ? '<div class="proj-card proj-soon reveal" aria-hidden="true"><span>More projects to come</span></div>' : '');
  }

  // ---- Reveal on scroll ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Active nav link ----
  var links = document.querySelectorAll('.nav a');
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) navIo.observe(s); });
  }

  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
