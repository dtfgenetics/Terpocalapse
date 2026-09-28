import assert from 'node:assert/strict';
import fs from 'node:fs';

const main = fs.readFileSync('prototypes/web-fps/main.js', 'utf8');

assert.match(
  main,
  /canvas\.addEventListener\("mousedown",\(\)=>\{if\(mode==="paused"\)mode="running";if\(mode==="running"\)shoot\(\);canvas\.requestPointerLock\?\.\(\)\}\)/,
  'desktop fire and pointer-lock input must be scoped to the game canvas'
);

assert.doesNotMatch(
  main,
  /addEventListener\("mousedown",\(\)=>\{if\(mode==="paused"\)mode="running";if\(mode==="running"\)shoot\(\);canvas\.requestPointerLock/,
  'window-level mouse input must not fire weapons when players click UI controls'
);

assert.match(
  main,
  /addEventListener\("keydown",e=>\{keysDown\.add\(e\.code\);if\(e\.repeat\)return;/,
  'repeated keydown events must not retrigger pause, interact, special, or weapon-selection actions'
);

console.log('Terpocalypse V1 desktop input scope contract passed.');
