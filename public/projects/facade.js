/* ==========================================================
   Facade: turns a project's elevation spec (see data.js) into an
   architectural elevation drawing as SVG, and plays it as a
   "blueprint drawing itself" animation.

   Works in the browser (window.Facade) and in Node
   (tools/render-elevations.js uses it to write static SVGs).

   All geometry in the spec is in metres. y = 0 is ground level and
   grows upwards; x grows to the right.
   ========================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Facade = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var S = 10; // svg units per metre

  // Margins around the building (svg units) that hold the annotations.
  var M = { l: 120, r: 170, t: 92, b: 120 };

  function sum(a) { return a.reduce(function (s, v) { return s + v; }, 0); }
  function n(v) { return Math.round(v * 100) / 100; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function letter(i) { return i < 26 ? String.fromCharCode(65 + i) : String.fromCharCode(65 + Math.floor(i / 26) - 1) + String.fromCharCode(65 + (i % 26)); }
  function mm(m) {
    var v = Math.round(m * 1000);
    return v >= 10000 ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(v);
  }

  /* ---------- geometry ---------- */
  function layout(spec) {
    var blocks = spec.blocks.map(function (b) {
      var w = sum(b.bays);
      var lines = [b.x];
      b.bays.forEach(function (bw, i) { lines.push(lines[i] + bw); });
      var y = 0;
      var levels = b.levels.map(function (l) {
        var o = Object.assign({}, l, { y0: y, y1: y + l.h });
        y += l.h;
        return o;
      });
      var roof = b.roof || { type: 'flat', h: 0 };
      return Object.assign({}, b, { w: w, lines: lines, levels: levels, eaves: y, top: y + (roof.h || 0), roof: roof });
    });
    var minX = Math.min.apply(null, blocks.map(function (b) { return b.x; }));
    var maxX = Math.max.apply(null, blocks.map(function (b) { return b.x + b.w; }));
    var maxH = Math.max.apply(null, blocks.map(function (b) { return b.top; }));
    var ext = spec.groundExtend == null ? 6 : spec.groundExtend;
    var gx0 = minX - ext, gx1 = maxX + ext;
    var W = (gx1 - gx0) * S + M.l + M.r;
    var H = (maxH + 6) * S + M.t + M.b; // +5 m for grid bubbles above the roof
    var ox = M.l - gx0 * S;
    var gy = H - M.b;
    return { blocks: blocks, minX: minX, maxX: maxX, maxH: maxH, gx0: gx0, gx1: gx1, W: W, H: H, ox: ox, gy: gy };
  }

  /* ---------- drawing ---------- */
  function build(spec) {
    var L = layout(spec);
    var X = function (x) { return n(L.ox + x * S); };
    var Y = function (y) { return n(L.gy - y * S); };
    var items = [];
    var main = L.blocks.filter(function (b) { return b.main; })[0] || L.blocks[0];

    // p: 0..1 height progress (drives "ground up" timing), q: 0..1 left-to-right
    function P(y) { return Math.max(0, Math.min(1, y / L.maxH)); }
    function Q(x) { return Math.max(0, Math.min(1, (x - L.gx0) / (L.gx1 - L.gx0))); }

    function path(layer, cls, d, p, q, extra) {
      if (!d) return;
      items.push({ t: 'path', layer: layer, cls: cls, d: d, p: p || 0, q: q || 0, extra: extra || {} });
    }
    function text(layer, cls, x, y, str, opts) {
      opts = opts || {};
      items.push({ t: 'text', layer: layer, cls: cls, x: x, y: y, s: str, p: opts.p || 0, q: opts.q || 0, anchor: opts.anchor, rot: opts.rot });
    }
    // path builders in metres
    function seg(x1, y1, x2, y2) { return 'M' + X(x1) + ' ' + Y(y1) + 'L' + X(x2) + ' ' + Y(y2); }
    function rect(x, y, w, h) { return 'M' + X(x) + ' ' + Y(y) + 'H' + X(x + w) + 'V' + Y(y + h) + 'H' + X(x) + 'Z'; }
    function poly(pts, close) {
      return pts.map(function (pt, i) { return (i ? 'L' : 'M') + X(pt[0]) + ' ' + Y(pt[1]); }).join('') + (close ? 'Z' : '');
    }

    /* 1. Grid ----------------------------------------------------------- */
    var minor = '';
    var gxA = Math.floor((0 - L.ox) / S), gxB = Math.ceil((L.W - L.ox) / S);
    var gyA = Math.floor((L.gy - L.H) / S), gyB = Math.ceil(L.gy / S);
    for (var gx = gxA; gx <= gxB; gx++) if (gx % 5) minor += 'M' + X(gx) + ' 0V' + n(L.H);
    for (var gyy = -gyB; gyy <= -gyA; gyy++) if (gyy % 5) minor += 'M0 ' + Y(gyy) + 'H' + n(L.W);
    items.push({ t: 'path', layer: 'grid', cls: 'g1', d: minor, p: 0, q: 0, extra: { fade: 1 } });
    for (gx = Math.ceil(gxA / 5) * 5; gx <= gxB; gx += 5) path('grid', 'g5', 'M' + X(gx) + ' ' + n(L.H) + 'V0', 0, Q(gx));
    for (gyy = Math.ceil(-gyB / 5) * 5; gyy <= -gyA; gyy += 5) path('grid', 'g5', 'M0 ' + Y(gyy) + 'H' + n(L.W), P(Math.max(0, gyy)), 0);

    /* 2. Ground --------------------------------------------------------- */
    var midX = (L.gx0 + L.gx1) / 2;
    path('ground', 'gl', seg(midX, 0, L.gx0, 0), 0, 0);
    path('ground', 'gl', seg(midX, 0, L.gx1, 0), 0, 0);
    var hatch = '';
    for (var hx = L.gx0 + 0.4; hx < L.gx1 - 0.6; hx += 1.2) hatch += seg(hx, -0.15, hx + 0.9, -1.05);
    path('ground', 'gh', hatch, 0, 0, { fade: 1 });

    /* 3. Blocks --------------------------------------------------------- */
    L.blocks.forEach(function (b) {
      var x0 = b.x, x1 = b.x + b.w, E = b.eaves, T = b.top, r = b.roof;
      var inset = r.type === 'mansard' ? (r.inset || 2) : 0;

      // Outline, drawn from the ground up on both sides, meeting at the ridge.
      var mid = x0 + b.w / 2;
      path('outline', 'ol', poly([[x0, 0], [x0, E], [x0 + inset, T], [mid, T]]), 0, Q(x0));
      path('outline', 'ol', poly([[x1, 0], [x1, E], [x1 - inset, T], [mid, T]]), 0, Q(x1));

      // Slabs: one band per floor line, appearing level by level.
      b.levels.forEach(function (l, i) {
        if (i === 0) return;
        path('struct', 'sl', seg(x0, l.y0, x1, l.y0) + seg(x1, l.y0 - 0.35, x0, l.y0 - 0.35), P(l.y0), 0);
      });
      path('struct', 'sl', seg(x0 - 0.5, E, x1 + 0.5, E) + seg(x1 + 0.5, E - 0.45, x0 - 0.5, E - 0.45) +
        seg(x0 - 0.5, E, x0 - 0.5, E - 0.45) + seg(x1 + 0.5, E, x1 + 0.5, E - 0.45), P(E), 0);

      // Columns / pilasters rising on every structural grid line.
      b.lines.forEach(function (lx, i) {
        var base = b.levels[0].type === 'colonnade' ? b.levels[0].y1 : 0;
        if (i === 0 || i === b.lines.length - 1) return;
        path('struct', 'st', seg(lx - 0.25, base, lx - 0.25, E - 0.45) + seg(lx + 0.25, E - 0.45, lx + 0.25, base), 0, Q(lx), { dur: 3.4 });
      });

      // Floors
      b.levels.forEach(function (l, li) { drawLevel(b, l, li); });

      // Roof
      if (r.type === 'mansard') {
        var courses = '';
        for (var cy = E + 0.6; cy < T - 0.2; cy += 0.6) {
          var t = (cy - E) / (T - E);
          courses += seg(x0 + inset * t + 0.15, cy, x1 - inset * t - 0.15, cy);
        }
        path('detail', 'dt faint', courses, P(E + 0.5), 0);
        path('struct', 'sl', seg(x0 + inset, T, x1 - inset, T) + seg(x1 - inset - 0.3, T - 0.3, x0 + inset + 0.3, T - 0.3), P(T), 0);
        var per = r.dormersPerBay || 0;
        if (per) b.bays.forEach(function (bw, bi) {
          for (var k = 0; k < per; k++) {
            var cx = b.lines[bi] + bw * (k + 0.5) / per, dw = r.dormerW || 1.5, dy = E + 0.7, dh = r.dormerH || 1.9;
            if (cx - dw / 2 < x0 + inset * 0.6 || cx + dw / 2 > x1 - inset * 0.6) continue;
            path('open', 'op', rect(cx - dw / 2, dy, dw, dh) + poly([[cx - dw / 2 - 0.25, dy + dh], [cx, dy + dh + 0.7], [cx + dw / 2 + 0.25, dy + dh]]), P(dy), Q(cx));
            path('detail', 'dt', seg(cx, dy + 0.1, cx, dy + dh - 0.1) + seg(cx - dw / 2 + 0.1, dy + dh * 0.62, cx + dw / 2 - 0.1, dy + dh * 0.62), P(dy), Q(cx));
          }
        });
      } else if (r.type === 'parapet') {
        path('struct', 'sl', seg(x0 - 0.2, T, x1 + 0.2, T) + seg(x1 + 0.2, T - 0.25, x0 - 0.2, T - 0.25), P(T), 0);
      }
    });

    function drawLevel(b, l, li) {
      var y0 = l.y0, h = l.h, p = P(y0);
      var o = l.opts || {};
      b.bays.forEach(function (bw, bi) {
        var bx = b.lines[bi], q = Q(bx + bw / 2);
        var edgeL = bi === 0 ? 0.6 : 0.4, edgeR = bi === b.bays.length - 1 ? 0.6 : 0.4;
        var gx0 = bx + edgeL, gw = bw - edgeL - edgeR;

        if (l.type === 'colonnade') {
          // piers, deep beam, recessed storefront, transom and canopy
          var entrance = (o.entranceBays || []).indexOf(bi) !== -1;
          var pierW = o.pierW || 0.9;
          if (bi > 0) path('struct', 'st', rect(bx - pierW / 2, 0, pierW, h - 0.9), 0, Q(bx), { dur: 1.4 });
          var gl = gx0 + pierW / 2 - 0.2, gr = bx + bw - (bi === b.bays.length - 1 ? 0.6 : pierW / 2 + 0.2);
          var top = entrance ? h - 1.2 : h * 0.66;
          path('open', 'op', poly([[gl, 0], [gl, top], [gr, top], [gr, 0]]), p, q);
          var mull = '', step = (gr - gl) / Math.max(2, Math.round((gr - gl) / 1.5));
          for (var mx = gl + step; mx < gr - 0.1; mx += step) mull += seg(mx, 0, mx, top);
          mull += seg(gl, top * 0.78, gr, top * 0.78);
          if (entrance) {
            var dc = (gl + gr) / 2;
            mull += rect(dc - 1.2, 0, 2.4, 2.7) + seg(dc, 0, dc, 2.7);
          }
          path('detail', 'dt', mull, p, q);
          if (!entrance) {
            path('detail', 'dt', rect(gl + 0.2, top + 0.45, gr - gl - 0.4, h - top - 1.5), p + 0.02, q);
          } else {
            // projecting entrance canopy
            path('open', 'op', rect(bx - 0.6, h - 1.15, bw + 1.2, 0.35), p + 0.03, q);
            path('detail', 'dt', seg(bx + 0.4, h - 1.15, bx + 0.4, 0) + seg(bx + bw - 0.4, h - 1.15, bx + bw - 0.4, 0), p, q);
          }
        } else if (l.type === 'punched' || l.type === 'screen') {
          var per = o.perBay || 2, ww = Math.min(o.winW || 1.8, bw / per - 0.8);
          var sill = o.sill == null ? 0.9 : o.sill, head = h - (o.headGap || 0.55);
          for (var k = 0; k < per; k++) {
            var cx = bx + bw * (k + 0.5) / per;
            var wx = cx - ww / 2;
            path('open', 'op', rect(wx, y0 + sill, ww, head - sill), p, Q(cx));
            var d = rect(wx + 0.12, y0 + sill + 0.12, ww - 0.24, head - sill - 0.24) + // reveal
              seg(wx - 0.15, y0 + sill - 0.12, wx + ww + 0.15, y0 + sill - 0.12);     // sill
            if (l.type === 'punched') d += seg(cx, y0 + sill + 0.12, cx, y0 + head - 0.12) + seg(wx + 0.12, y0 + head - 0.55, wx + ww - 0.12, y0 + head - 0.55);
            else d += lattice(wx + 0.12, y0 + sill + 0.12, ww - 0.24, head - sill - 0.24, o.lattice || 0.45);
            path('detail', l.type === 'screen' ? 'dt faint' : 'dt', d, p + 0.01, Q(cx));
          }
          // stone coursing between openings
          if (o.coursing !== false) path('detail', 'dt faint', seg(bx + 0.3, y0 + sill / 2, bx + bw - 0.3, y0 + sill / 2), p, q);
        } else if (l.type === 'curtain') {
          var mod = o.module || 1.5, cw = gw;
          path('open', 'op', rect(gx0, y0 + 0.15, cw, h - 0.65), p, q);
          var c = '', cnt = Math.max(1, Math.round(cw / mod)), st = cw / cnt;
          for (var i = 1; i < cnt; i++) c += seg(gx0 + i * st, y0 + 0.15, gx0 + i * st, y0 + h - 0.5);
          c += seg(gx0, y0 + 1.0, gx0 + cw, y0 + 1.0) + seg(gx0, y0 + h - 1.1, gx0 + cw, y0 + h - 1.1);
          path('detail', 'dt', c, p + 0.01, q);
        } else if (l.type === 'balcony') {
          // full-height glazing, projecting slab and glass balustrade
          path('open', 'op', rect(gx0 + 0.2, y0 + 0.2, gw - 0.4, h - 0.7), p, q);
          var g = '', gc = Math.max(2, Math.round((gw - 0.4) / 1.3)), gs = (gw - 0.4) / gc;
          for (var j = 1; j < gc; j++) g += seg(gx0 + 0.2 + j * gs, y0 + 0.2, gx0 + 0.2 + j * gs, y0 + h - 0.5);
          path('detail', 'dt faint', g, p + 0.01, q);
          var bl = bx + 0.25, br = bx + bw - 0.25;
          path('open', 'op', rect(bl, y0 - 0.05, br - bl, 0.25), p + 0.02, q);
          var rail = seg(bl, y0 + 1.1, br, y0 + 1.1) + seg(bl, y0 + 0.95, br, y0 + 0.95);
          for (var px = bl; px <= br + 0.01; px += (br - bl) / 4) rail += seg(px, y0 + 0.2, px, y0 + 1.1);
          path('detail', 'dt', rail, p + 0.03, q);
        }
      });
    }

    function lattice(x, y, w, h, s) {
      // diagonal lattice (mashrabiya) clipped to a rectangle
      var d = '';
      for (var c = -h; c < w; c += s) d += latSeg(x + c, y, 1) + latSeg(x + w - c, y, -1);
      return d;
      function latSeg(sx, sy, dir) {
        // line starting at (sx, sy) heading up at 45deg in direction dir, clipped to the box
        var t0 = 0, t1 = h;
        if (dir > 0) { t0 = Math.max(t0, x - sx); t1 = Math.min(t1, x + w - sx); }
        else { t0 = Math.max(t0, sx - (x + w)); t1 = Math.min(t1, sx - x); }
        if (t1 - t0 < 0.05) return '';
        return seg(sx + dir * t0, sy + t0, sx + dir * t1, sy + t1);
      }
    }

    /* 4. Entourage: palms ---------------------------------------------- */
    (spec.palms || []).forEach(function (pm) {
      var x = pm.x, ht = pm.h || 7, lean = pm.lean || 0.3;
      var d = 'M' + X(x - 0.18) + ' ' + Y(0) + 'Q' + X(x - 0.12 + lean / 2) + ' ' + Y(ht / 2) + ' ' + X(x + lean - 0.08) + ' ' + Y(ht) +
              'M' + X(x + lean + 0.08) + ' ' + Y(ht) + 'Q' + X(x + 0.12 + lean / 2) + ' ' + Y(ht / 2) + ' ' + X(x + 0.18) + ' ' + Y(0);
      var tx = x + lean, f = '';
      [[-3.2, -1.6], [-2.4, 0.2], [-1, 1.4], [1, 1.5], [2.5, 0.3], [3.3, -1.4], [0.2, -2.4]].forEach(function (v) {
        f += 'M' + X(tx) + ' ' + Y(ht) + 'Q' + X(tx + v[0] * 0.55) + ' ' + Y(ht + 1.3 + v[1] * 0.2) + ' ' + X(tx + v[0]) + ' ' + Y(ht + v[1] * 0.55 - 0.6);
      });
      for (var ry = 0.6; ry < ht - 0.3; ry += 0.55) f += seg(x - 0.15 + lean * ry / ht, ry, x + 0.15 + lean * ry / ht, ry + 0.12);
      path('detail', 'dt ent', d + f, 0.05, Q(x), { dur: 1.6 });
    });

    /* 5. Annotations ---------------------------------------------------- */
    var an = 'annot';
    // grid bubbles + centre lines
    var gi = 0, bubbleY = L.maxH + 4.3;
    L.blocks.forEach(function (b) {
      if (b.grid === false) return;
      b.lines.forEach(function (lx) {
        var lab = letter(gi++);
        path(an, 'cl', seg(lx, -1.6, lx, bubbleY - 0.95), 0.2, Q(lx), { fade: 1 });
        path(an, 'an', 'M' + X(lx) + ' ' + n(Y(bubbleY) - 9) + 'a9 9 0 1 1 0 18a9 9 0 1 1 0 -18', 0.9, Q(lx));
        text(an, 'tx bub', X(lx), n(Y(bubbleY) + 3.2), lab, { p: 0.95, q: Q(lx), anchor: 'middle' });
      });
    });

    // level markers on the right of the main block
    var lx0 = main.x + main.w + 1.2, lx1 = main.x + main.w + (spec.levelTagGap || 5);
    var lvls = main.levels.map(function (l) { return { y: l.y0, name: l.name }; });
    lvls.push({ y: main.eaves, name: main.roof.type === 'mansard' ? 'EAVES' : 'ROOF' });
    if (main.roof.h) lvls.push({ y: main.top, name: main.roof.type === 'mansard' ? 'RIDGE' : 'PARAPET' });
    lvls.forEach(function (lv) {
      var yy = Y(lv.y), tx = X(lx1);
      path(an, 'an thin', seg(lx0, lv.y, lx1 + 0.4, lv.y), P(lv.y), 1);
      path(an, 'hi', 'M' + n(tx + 4) + ' ' + n(yy) + 'l-5 -7h10z', P(lv.y), 1);
      text(an, 'tx', n(tx + 12), n(yy - 3), (lv.y === 0 ? '±0.000' : '+' + (lv.y).toFixed(3)), { p: P(lv.y), q: 1 });
      text(an, 'tx dim', n(tx + 12), n(yy + 8), lv.name, { p: P(lv.y), q: 1 });
    });

    // horizontal dimension chain under the main block, and the overall width
    function hDim(xa, xb, yy, label, p) {
      var d = seg(xa - 0.6, yy, xb + 0.6, yy) + seg(xa, yy + 0.8, xa, yy - 0.8) + seg(xb, yy + 0.8, xb, yy - 0.8) +
        seg(xa - 0.35, yy - 0.35, xa + 0.35, yy + 0.35) + seg(xb - 0.35, yy - 0.35, xb + 0.35, yy + 0.35);
      path(an, 'an', d, p || 0, Q(xa));
      text(an, 'tx', X((xa + xb) / 2), n(Y(yy) - 4), label, { p: p || 0, q: Q(xa), anchor: 'middle' });
    }
    L.blocks.forEach(function (b) {
      b.bays.forEach(function (bw, i) { hDim(b.lines[i], b.lines[i + 1], -3.2, mm(bw)); });
      hDim(b.x, b.x + b.w, -6.6, mm(b.w));
    });

    // vertical dimension chain on the left of the main block
    function vDim(xx, ya, yb, label) {
      var d = seg(xx, ya - 0.6, xx, yb + 0.6) + seg(xx - 0.8, ya, xx + 0.8, ya) + seg(xx - 0.8, yb, xx + 0.8, yb) +
        seg(xx - 0.35, ya - 0.35, xx + 0.35, ya + 0.35) + seg(xx - 0.35, yb - 0.35, xx + 0.35, yb + 0.35);
      path(an, 'an', d, P(ya), 0);
      text(an, 'tx', n(X(xx) - 4), Y((ya + yb) / 2), label, { p: P(ya), q: 0, anchor: 'middle', rot: -90 });
    }
    var vx = main.x - 3.4;
    main.levels.forEach(function (l) { vDim(vx, l.y0, l.y1, mm(l.h)); });
    if (main.roof.h) vDim(vx, main.eaves, main.top, mm(main.roof.h));
    vDim(main.x - 7.2, 0, main.top, mm(main.top));

    // section cut A-A through the main block
    var sx = main.x + main.lines[Math.min(main.lines.length - 2, Math.ceil(main.lines.length / 2) - 1)] + main.bays[0] / 2 - 0.9;
    path(an, 'cl', seg(sx, -8.8, sx, main.top + 0.8), 0.5, Q(sx), { fade: 1 });
    [[-9.6, 'A', 'A-201'], [main.top + 1.7, 'A', 'A-201']].forEach(function (s, i) {
      var cy = Y(s[0]);
      path(an, 'hi', 'M' + n(X(sx) - 8) + ' ' + cy + 'a8 8 0 1 1 16 0a8 8 0 1 1 -16 0M' + n(X(sx) - 8) + ' ' + cy + 'h16' +
        'M' + n(X(sx) + 8) + ' ' + cy + 'l7 0l-4 -4m4 4l-4 4', i ? 1 : 0, Q(sx));
      text(an, 'tx sec', X(sx), n(cy - 2), s[1], { p: i ? 1 : 0, q: Q(sx), anchor: 'middle' });
      text(an, 'tx sec2', X(sx), n(cy + 5.6), s[2], { p: i ? 1 : 0, q: Q(sx), anchor: 'middle' });
    });

    // leader notes
    (spec.notes || []).forEach(function (nt) {
      var dx = nt.dx == null ? 6 : nt.dx, dy = nt.dy == null ? 3 : nt.dy;
      var ax = nt.x, ay = nt.y, bx = nt.x + dx, by = nt.y + dy;
      // optional elbow: run level first, then turn towards the label
      var lead = nt.elbowX != null ? seg(ax, ay, nt.elbowX, ay) + seg(nt.elbowX, ay, bx, by) : seg(ax, ay, bx, by);
      var right = dx >= 0;
      var len = nt.text.length * 0.42 + 1;
      path(an, 'an thin nl', 'M' + X(ax) + ' ' + Y(ay) + 'm-1.6 0a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0' +
        lead + seg(bx, by, bx + (right ? len : -len), by), P(ay), Q(ax));
      text(an, 'tx note nl', X(bx + (right ? 0.3 : -0.3)), n(Y(by) - 3), nt.text, { p: P(ay), q: Q(ax), anchor: right ? 'start' : 'end' });
    });

    // title block
    var tb = spec.titleBlock || {};
    var tbx = L.W - 16, tby = L.H - 22;
    text(an, 'tx ttl', tbx, n(tby - 26), (tb.title || 'ELEVATION').toUpperCase(), { p: 1, q: 1, anchor: 'end' });
    text(an, 'tx dim', tbx, n(tby - 13), (tb.sub || 'SCALE 1:200 · DIMENSIONS IN MM').toUpperCase(), { p: 1, q: 1, anchor: 'end' });
    text(an, 'tx dim', tbx, n(tby), (tb.ref || 'DWG A-200').toUpperCase(), { p: 1, q: 1, anchor: 'end' });
    path(an, 'an thin', 'M' + n(tbx - 190) + ' ' + n(tby - 40) + 'H' + tbx, 1, 1);

    // scan line (only animated in the browser)
    var scan = { x0: X(L.gx0), x1: X(L.gx1), y0: Y(0), y1: Y(L.maxH + 1) };

    // a tighter crop around the main block for narrow screens
    var fx0 = X(main.x - 9.5), fx1 = X(main.x + main.w + (spec.levelTagGap || 5) + 8);
    var focus = [fx0, 0, n(fx1 - fx0), n(L.H)];

    return { W: n(L.W), H: n(L.H), items: items, scan: scan, ground: Y(0), focus: focus };
  }

  /* ---------- serialise ---------- */
  function markup(model) {
    var groups = { grid: [], ground: [], outline: [], struct: [], open: [], detail: [], annot: [] };
    model.items.forEach(function (it) {
      var a = ' data-p="' + n(it.p) + '" data-q="' + n(it.q) + '"' +
        (it.extra && it.extra.dur ? ' data-dur="' + it.extra.dur + '"' : '') +
        (it.extra && it.extra.fade ? ' data-fade="1"' : '');
      if (it.t === 'path') {
        groups[it.layer].push('<path class="' + it.cls + '" d="' + it.d + '"' + (it.extra && it.extra.fade ? '' : ' pathLength="1"') + a + '/>');
      } else {
        var tr = it.rot ? ' transform="rotate(' + it.rot + ' ' + it.x + ' ' + it.y + ')"' : '';
        groups[it.layer].push('<text class="' + it.cls + '" x="' + it.x + '" y="' + it.y + '"' +
          (it.anchor ? ' text-anchor="' + it.anchor + '"' : '') + tr + a + ' data-fade="1">' + esc(it.s) + '</text>');
      }
    });
    var s = model.scan;
    return Object.keys(groups).map(function (k) {
      return '<g class="fx-' + k + '">' + groups[k].join('') + '</g>';
    }).join('') +
      '<g class="fx-scan" aria-hidden="true"><line x1="' + s.x0 + '" x2="' + s.x1 + '" y1="0" y2="0"/></g>';
  }

  // Colours for the standalone SVG (cards, no-JS fallback). The live page styles these with CSS.
  var STATIC_CSS =
    'path{fill:none;stroke-linecap:round;stroke-linejoin:round}' +
    '.g1{stroke:#fff;stroke-opacity:.035;stroke-width:.6}.g5{stroke:#fff;stroke-opacity:.07;stroke-width:.7}' +
    '.gl{stroke:#e9e4d8;stroke-width:2}.gh{stroke:#fff;stroke-opacity:.25;stroke-width:.6}' +
    '.ol{stroke:#d8c193;stroke-width:1.8}.sl,.st{stroke:#e9e4d8;stroke-opacity:.8;stroke-width:1}' +
    '.op{stroke:#f2eee5;stroke-opacity:.85;stroke-width:.9}.dt{stroke:#fff;stroke-opacity:.45;stroke-width:.6}.faint{stroke-opacity:.25}' +
    '.an{stroke:#fff;stroke-opacity:.5;stroke-width:.6}.thin{stroke-opacity:.35}.hi{stroke:#d8c193;stroke-width:.9}' +
    '.cl{stroke:#fff;stroke-opacity:.18;stroke-width:.6;stroke-dasharray:14 3 2 3}' +
    'text{font:500 7px "Instrument Sans",system-ui,sans-serif;letter-spacing:.08em;fill:#e9e4d8;fill-opacity:.7}' +
    '.dim{fill-opacity:.45}.bub{font-size:9px;fill:#d8c193;fill-opacity:1}.sec{font-size:7px;fill:#d8c193;fill-opacity:1}.sec2{font-size:4.6px}' +
    '.ttl{font-size:11px;letter-spacing:.2em;fill-opacity:.9}.note{fill-opacity:.6}.fx-scan{display:none}';

  function toStaticSVG(spec, opts) {
    opts = opts || {};
    var m = build(spec);
    var vb = opts.focus ? m.focus.join(' ') : '0 0 ' + m.W + ' ' + m.H;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '"' +
      (opts.title ? ' role="img" aria-label="' + esc(opts.title) + '"' : '') + '>' +
      '<style>' + STATIC_CSS + (opts.focus ? '.nl{display:none}' : '') + '</style>' + markup(m) + '</svg>';
  }

  /* ---------- browser: render + animate ---------- */
  var PHASES = {
    grid:    { start: 0.25, spread: 1.0, xs: 0.6, dur: 1.1 },
    ground:  { start: 1.25, spread: 0,   xs: 0,   dur: 1.1 },
    outline: { start: 1.9,  spread: 0,   xs: 0.2, dur: 2.3 },
    struct:  { start: 2.6,  spread: 3.0, xs: 0.5, dur: 0.9 },
    open:    { start: 3.7,  spread: 2.8, xs: 0.7, dur: 0.75 },
    detail:  { start: 4.3,  spread: 2.8, xs: 0.7, dur: 0.9 },
    annot:   { start: 6.4,  spread: 1.0, xs: 0.6, dur: 1.0 }
  };
  var TOTAL = 8.6;

  function render(svg, spec) {
    var m = build(spec);
    svg.setAttribute('viewBox', '0 0 ' + m.W + ' ' + m.H);
    svg.innerHTML = markup(m);
    svg.__facade = m;
    return m;
  }

  function play(svg, opts) {
    opts = opts || {};
    var anims = [];
    stop(svg);
    var m = svg.__facade;
    var speed = opts.speed || 1;
    var ease = 'cubic-bezier(.45,.05,.25,1)';
    var supported = typeof svg.animate === 'function';
    svg.classList.remove('is-done');
    svg.classList.add('is-playing');

    if (!supported || opts.instant) {
      svg.classList.remove('is-playing');
      svg.classList.add('is-done');
      if (opts.onDone) opts.onDone();
      return { cancel: function () {}, finished: Promise.resolve() };
    }

    Object.keys(PHASES).forEach(function (layer) {
      var ph = PHASES[layer];
      var nodes = svg.querySelectorAll('.fx-' + layer + ' > *');
      Array.prototype.forEach.call(nodes, function (el) {
        var p = +el.getAttribute('data-p') || 0, q = +el.getAttribute('data-q') || 0;
        var dur = (+el.getAttribute('data-dur') || ph.dur) * 1000 / speed;
        var delay = (ph.start + p * ph.spread + q * ph.xs) * 1000 / speed;
        var kf = el.hasAttribute('data-fade')
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }];
        anims.push(el.animate(kf, { duration: dur, delay: delay, easing: ease, fill: 'backwards' }));
      });
    });

    // a champagne scan line rising with the build
    var scan = svg.querySelector('.fx-scan');
    if (scan && m) {
      anims.push(scan.animate([
        { transform: 'translateY(' + m.scan.y0 + 'px)', opacity: 0 },
        { opacity: 1, offset: 0.08 },
        { opacity: 1, offset: 0.9 },
        { transform: 'translateY(' + m.scan.y1 + 'px)', opacity: 0 }
      ], { duration: 4200 / speed, delay: 2400 / speed, easing: 'cubic-bezier(.4,0,.3,1)', fill: 'both' }));
    }

    var t = setTimeout(function () {
      svg.classList.remove('is-playing');
      svg.classList.add('is-done');
      if (opts.onDone) opts.onDone();
    }, TOTAL * 1000 / speed);

    svg.__anims = anims;
    svg.__timer = t;
    return { cancel: function () { stop(svg); } };
  }

  function stop(svg) {
    (svg.__anims || []).forEach(function (a) { a.cancel(); });
    svg.__anims = [];
    clearTimeout(svg.__timer);
  }

  return { build: build, markup: markup, toStaticSVG: toStaticSVG, render: render, play: play, stop: stop, TOTAL: TOTAL };
});
