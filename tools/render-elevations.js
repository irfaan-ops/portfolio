#!/usr/bin/env node
// Writes a static SVG elevation for every project in public/projects/data.js.
// These are used as the project-card thumbnails and as the no-JavaScript fallback.
// Run after adding or editing a project:  node tools/render-elevations.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const pub = path.join(__dirname, '..', 'public');
const Facade = require(path.join(pub, 'projects', 'facade.js'));
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(pub, 'projects', 'data.js'), 'utf8'), sandbox);

const out = path.join(pub, 'assets', 'projects');
fs.mkdirSync(out, { recursive: true });
for (const p of sandbox.window.PROJECTS) {
  // full drawing (no-JavaScript fallback) and a crop around the main block (card thumbnail)
  for (const [suffix, focus] of [['elevation', false], ['card', true]]) {
    const file = path.join(out, p.slug + '-' + suffix + '.svg');
    fs.writeFileSync(file, Facade.toStaticSVG(p.facade, { title: p.title + ' elevation', focus }) + '\n');
    console.log('wrote', path.relative(path.join(__dirname, '..'), file));
  }
}
