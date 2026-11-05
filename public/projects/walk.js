/* ==========================================================
   Walk: a photographic walk-through that follows the blueprint.

   Each scene is a photo with a slow camera move (from -> to), and
   scenes crossfade into each other. Moving "forward" is a push in
   (scale up); turning back to the entrance is a pull out.

   scene = {
     src: '/assets/projects/<slug>/01-facade.jpg',
     label: 'Facade',               // caption, shown bottom-right
     dur: 6,                        // seconds on screen, incl. crossfades
     from: { x: 0, y: 0, s: 1.04 }, // x/y in % of the frame, s = scale
     to:   { x: -2, y: 1, s: 1.16 },
     focus: '50% 60%'               // optional object-position
   }
   ========================================================== */
(function (root) {
  'use strict';

  var FADE = 1.6; // seconds of crossfade between scenes

  function Walk(container, scenes, opts) {
    this.el = container;
    this.scenes = scenes || [];
    this.opts = opts || {};
    this.anims = [];
    this.shots = [];
    this.ready = null;
    this.state = 'idle';
  }

  // Build the DOM and start loading images; resolves with the scenes that loaded.
  Walk.prototype.load = function () {
    if (this.ready) return this.ready;
    var self = this;
    this.el.textContent = '';
    var caps = document.createElement('ol');
    caps.className = 'walk-steps';
    var bar = document.createElement('span');
    bar.className = 'walk-bar';
    bar.innerHTML = '<span></span>';

    this.ready = Promise.all(this.scenes.map(function (sc, i) {
      var shot = document.createElement('div');
      shot.className = 'walk-shot';
      var img = new Image();
      img.alt = '';
      img.decoding = 'async';
      if (sc.focus) img.style.objectPosition = sc.focus;
      shot.appendChild(img);
      var li = document.createElement('li');
      li.innerHTML = '<span class="walk-n">' + ('0' + (i + 1)).slice(-2) + '</span><span class="walk-l"></span>';
      li.lastChild.textContent = sc.label || '';
      return new Promise(function (resolve) {
        img.onload = function () {
          (img.decode ? img.decode() : Promise.resolve()).catch(function () {}).then(function () {
            resolve({ scene: sc, shot: shot, img: img, cap: li });
          });
        };
        img.onerror = function () { resolve(null); };
        img.src = sc.src;
      });
    })).then(function (list) {
      list = list.filter(Boolean);
      list.forEach(function (it) { self.el.appendChild(it.shot); caps.appendChild(it.cap); });
      if (list.length) { self.el.appendChild(caps); self.el.appendChild(bar); }
      self.shots = list;
      self.bar = bar.firstChild;
      return list;
    });
    return this.ready;
  };

  Walk.prototype.cancel = function () {
    this.anims.forEach(function (a) { a.cancel(); });
    this.anims = [];
    clearTimeout(this.timer);
    this.state = 'idle';
    this.el.classList.remove('is-on', 'is-done', 'is-paused');
  };

  Walk.prototype.pause = function () {
    if (this.state !== 'playing') return;
    this.anims.forEach(function (a) { a.pause(); });
    this.state = 'paused';
    this.el.classList.add('is-paused');
  };

  Walk.prototype.resume = function () {
    if (this.state !== 'paused') return;
    this.anims.forEach(function (a) { a.play(); });
    this.state = 'playing';
    this.el.classList.remove('is-paused');
  };

  // Play the walk-through. opts.still: crossfades only, no camera movement (reduced motion).
  Walk.prototype.play = function (opts) {
    opts = opts || {};
    var self = this;
    this.cancel();
    var list = this.shots;
    if (!list.length) return Promise.resolve(false);
    this.el.classList.add('is-on');
    this.state = 'playing';

    var t = 0, total = 0;
    var spans = list.map(function (it, i) {
      var d = (it.scene.dur || 6) * 1000;
      var start = t;
      t += d - (i < list.length - 1 ? FADE * 1000 : 0);
      return { start: start, d: d };
    });
    total = t;
    var fade = FADE * 1000;

    list.forEach(function (it, i) {
      var sp = spans[i], last = i === list.length - 1, first = i === 0;
      var a = fade / sp.d, b = 1 - a;
      // opacity envelope
      var kf = [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: a },
        { opacity: 1, offset: last ? 1 : b },
      ];
      if (!last) kf.push({ opacity: 0, offset: 1 });
      // the first shot rises out of the drawing like the scan line
      if (first) {
        kf[0].clipPath = 'inset(100% 0 0 0)';
        kf[1].clipPath = 'inset(0% 0 0 0)';
        kf[2].clipPath = 'inset(0% 0 0 0)';
        if (kf[3]) kf[3].clipPath = 'inset(0% 0 0 0)';
      }
      self.anims.push(it.shot.animate(kf, { duration: sp.d, delay: sp.start, fill: last ? 'both' : 'backwards', easing: 'linear' }));
      // camera move
      var f = it.scene.from || { x: 0, y: 0, s: 1.04 }, to = it.scene.to || { x: 0, y: 0, s: 1.14 };
      if (opts.still) { f = to = { x: 0, y: 0, s: 1 }; }
      self.anims.push(it.img.animate([
        { transform: 'translate(' + (f.x || 0) + '%,' + (f.y || 0) + '%) scale(' + (f.s || 1) + ')' },
        { transform: 'translate(' + (to.x || 0) + '%,' + (to.y || 0) + '%) scale(' + (to.s || 1) + ')' }
      ], { duration: sp.d, delay: sp.start, fill: 'both', easing: 'cubic-bezier(.33,0,.4,1)' }));
      // caption
      var ckf = [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none', offset: a }, { opacity: 1, transform: 'none', offset: last ? 1 : b }];
      if (!last) ckf.push({ opacity: 0, transform: 'translateY(-6px)', offset: 1 });
      self.anims.push(it.cap.animate(ckf, { duration: sp.d, delay: sp.start, fill: last ? 'forwards' : 'none', easing: 'ease' }));
    });
    if (this.bar) this.anims.push(this.bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: total, fill: 'both', easing: 'linear' }));

    var done = this.anims[this.anims.length - 1];
    return done.finished.then(function () {
      self.state = 'done';
      self.el.classList.add('is-done');
      return true;
    }, function () { return false; });
  };

  root.Walk = Walk;
})(typeof self !== 'undefined' ? self : this);
