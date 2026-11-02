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

  // ---- Dial ticks ----
  var ticks = document.querySelector('.dial .ticks');
  if (ticks) {
    var ns = 'http://www.w3.org/2000/svg';
    for (var i = 0; i < 60; i++) {
      var major = i % 5 === 0;
      var a = (i / 60) * Math.PI * 2;
      var r1 = major ? 128 : 134, r2 = 142;
      var l = document.createElementNS(ns, 'line');
      l.setAttribute('x1', 200 + Math.sin(a) * r1);
      l.setAttribute('y1', 200 - Math.cos(a) * r1);
      l.setAttribute('x2', 200 + Math.sin(a) * r2);
      l.setAttribute('y2', 200 - Math.cos(a) * r2);
      if (major) l.setAttribute('class', 'major');
      ticks.appendChild(l);
    }
  }

  // ---- Experience cards: one open at a time ----
  var cards = Array.prototype.slice.call(document.querySelectorAll('.exp'));
  function setOpen(card, open) {
    card.classList.toggle('open', open);
    var btn = card.querySelector('.exp-toggle');
    btn.setAttribute('aria-expanded', String(open));
    card.querySelector('.exp-more-text').textContent = open ? 'Close' : 'Read more';
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

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
