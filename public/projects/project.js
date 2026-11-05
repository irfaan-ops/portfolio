(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  var projects = window.PROJECTS || [];
  var params = new URLSearchParams(location.search);
  var slug = params.get('p') || (location.hash || '').slice(1);
  var index = 0;
  projects.forEach(function (p, i) { if (p.slug === slug) index = i; });
  var project = projects[index];
  if (!project) return;

  var $ = function (id) { return document.getElementById(id); };

  // Text in [square brackets] is a placeholder: show it with the site's dotted underline.
  function fill(el, str) {
    el.textContent = '';
    String(str).split(/(\[[^\]]+\])/).forEach(function (part) {
      if (!part) return;
      if (/^\[.*\]$/.test(part)) {
        var m = document.createElement('mark');
        m.className = 'ph';
        m.textContent = part.slice(1, -1);
        el.appendChild(m);
      } else el.appendChild(document.createTextNode(part));
    });
    return el;
  }
  function make(tag, cls, str) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (str != null) fill(el, str);
    return el;
  }

  /* ---------- text ---------- */
  var num = ('0' + (index + 1)).slice(-2);
  document.title = project.title + ' · Projects · Irfaan';
  fill($('pj-eyebrow'), 'Project ' + num + ' · ' + project.category);
  fill($('pj-title'), project.title);
  fill($('pj-h2'), project.title);
  fill($('pj-loc'), project.location);
  $('pj-count').textContent = num + ' / ' + ('0' + projects.length).slice(-2);

  var meta = $('pj-meta');
  [['Year', project.year], ['Operator', project.operator], ['Role', project.role]].forEach(function (row) {
    if (!row[1]) return;
    var d = make('div');
    d.appendChild(make('dt', null, row[0]));
    d.appendChild(make('dd', null, row[1]));
    meta.appendChild(d);
  });

  fill($('pj-summary'), project.summary || '');
  (project.story || []).forEach(function (p) { $('pj-story').appendChild(make('p', null, p)); });
  (project.facts || []).forEach(function (f) {
    var d = make('div');
    d.appendChild(make('strong', null, f[1]));
    d.appendChild(make('span', null, f[0]));
    $('pj-facts').appendChild(d);
  });
  (project.programme || []).forEach(function (p) { $('pj-programme').appendChild(make('li', null, p)); });
  fill($('pj-role'), project.role || '');

  if (projects.length > 1) {
    var next = projects[(index + 1) % projects.length];
    var a = make('a', 'pj-next-link');
    a.href = '/projects/?p=' + encodeURIComponent(next.slug);
    a.appendChild(make('span', 'eyebrow', 'Next project'));
    a.appendChild(make('span', 'pj-next-title', next.title));
    $('pj-next').appendChild(a);
  }
  var y = $('year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- drawing ---------- */
  var svg = $('fx');
  var Facade = window.Facade;
  if (!Facade || !project.facade) return;
  var model = Facade.render(svg, project.facade);
  svg.setAttribute('aria-label', project.title + ' elevation');

  // Narrow screens crop to the main block so the drawing stays legible.
  var narrow = window.matchMedia('(max-width: 720px)');
  function frame() {
    var v = narrow.matches ? model.focus : [0, 0, model.W, model.H];
    svg.setAttribute('viewBox', v.join(' '));
  }
  frame();
  if (narrow.addEventListener) narrow.addEventListener('change', frame); else narrow.addListener(frame);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var photo = $('pj-photo'), photoBtn = $('pj-photo-toggle');
  var photoTimer;

  function setPhoto(on) {
    root.classList.toggle('show-photo', on);
    photoBtn.setAttribute('aria-pressed', String(on));
    photoBtn.textContent = on ? 'Show drawing' : 'Show photograph';
  }
  if (project.photo) {
    photoBtn.hidden = false;
    photoBtn.addEventListener('click', function () {
      if (!photo.src) photo.src = project.photo;
      clearTimeout(photoTimer);
      setPhoto(!root.classList.contains('show-photo'));
    });
  }

  /* ---------- photographic walk-through, after the drawing ---------- */
  var walk = null, pauseBtn = $('pj-pause');
  if (project.walkthrough && project.walkthrough.length && window.Walk) {
    walk = new window.Walk($('pj-walk'), project.walkthrough);
    $('pj-replay').lastChild.textContent = ' Replay walk-through';
  }
  function setPaused(p) {
    pauseBtn.setAttribute('aria-pressed', String(p));
    pauseBtn.querySelector('span').textContent = p ? 'Play' : 'Pause';
  }
  function startWalk() {
    if (!walk) return;
    walk.load().then(function (list) {
      if (!list.length || !root.classList.contains('awaiting-walk')) return;
      root.classList.remove('awaiting-walk');
      root.classList.add('walking');
      pauseBtn.hidden = false;
      setPaused(false);
      walk.play({ still: reduce.matches }).then(function (finished) {
        if (!finished) return;
        root.classList.add('walk-done');
        pauseBtn.hidden = true;
      });
    });
  }
  pauseBtn.addEventListener('click', function () {
    if (!walk) return;
    if (walk.state === 'playing') { walk.pause(); setPaused(true); }
    else if (walk.state === 'paused') { walk.resume(); setPaused(false); }
  });

  function run(instant) {
    clearTimeout(photoTimer);
    setPhoto(false);
    if (walk) {
      walk.cancel();
      walk.load(); // start fetching photos while the drawing plays
      pauseBtn.hidden = true;
      root.classList.remove('walking', 'walk-done');
      root.classList.add('awaiting-walk');
    }
    root.classList.add('drawing');
    Facade.play(svg, {
      instant: instant || reduce.matches,
      onDone: function () {
        root.classList.remove('drawing');
        if (walk) { setTimeout(startWalk, reduce.matches ? 1200 : 900); return; }
        // Optionally settle into the photograph once the drawing is complete.
        if (project.photo && !walk && !reduce.matches) {
          photo.src = project.photo;
          photo.hidden = false;
          photoTimer = setTimeout(function () { setPhoto(true); }, 2200);
        }
      }
    });
  }

  if (project.photo) { photo.hidden = false; photo.alt = ''; }

  // Start once the page is actually visible (not while prerendering in a background tab),
  // and after fonts load so annotations don't reflow mid-animation.
  function start() {
    var go = function () { requestAnimationFrame(function () { run(false); }); };
    if (document.fonts && document.fonts.ready) {
      Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(go);
    } else go();
  }
  if (document.visibilityState === 'hidden') {
    document.addEventListener('visibilitychange', function once() {
      if (document.visibilityState === 'visible') { document.removeEventListener('visibilitychange', once); start(); }
    });
  } else start();

  $('pj-replay').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
    run(false);
  });

  /* ---------- quiet the drawing as the content scrolls over it ---------- */
  function userPaused() { return pauseBtn.getAttribute('aria-pressed') === 'true'; }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var t = Math.min(1, window.scrollY / (window.innerHeight * 0.7));
      root.style.setProperty('--veil', t.toFixed(3));
      // let the walk-through rest while the story covers it
      if (walk && !userPaused()) {
        if (t >= 1 && walk.state === 'playing') walk.pause();
        else if (t < 1 && walk.state === 'paused') walk.resume();
      }
      document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
