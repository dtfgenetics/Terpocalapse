import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('./game-data.js', import.meta.url), 'utf8');
const mapMatch = source.match(/export const MAP=(\[[^;]+\]);/);
assert.ok(mapMatch, 'game-data.js must export the Veg Lab MAP');
const map = JSON.parse(mapMatch[1]);

assert.ok(Array.isArray(map) && map.length >= 8, 'Veg Lab map must contain playable rows');
const width = map[0].length;
assert.ok(width >= 8, 'Veg Lab map must contain playable columns');
assert.ok(map.every((row) => row.length === width), 'Every Veg Lab map row must have equal width');
assert.ok(map[0].split('').every((tile) => tile === '#'), 'Top map boundary must be sealed');
assert.ok(map.at(-1).split('').every((tile) => tile === '#'), 'Bottom map boundary must be sealed');

function locations(marker) {
  const found = [];
  map.forEach((row, y) => {
    [...row].forEach((tile, x) => {
      if (tile === marker) found.push({ x, y });
    });
  });
  return found;
}

const doors = locations('D');
const keys = locations('K');
const exits = locations('X');
assert.equal(doors.length, 1, 'Level 01 must have exactly one Green Key containment door');
assert.equal(keys.length, 1, 'Level 01 must have exactly one Green Key pickup marker');
assert.equal(exits.length, 1, 'Level 01 must have exactly one extraction marker');

const door = doors[0];
const key = keys[0];
const exit = exits[0];
assert.ok(key.x < door.x, 'Green Key must be obtainable on the player side of containment');
assert.ok(exit.x > door.x, 'Extraction must remain behind the containment door');
assert.notEqual(map[door.y][door.x - 1], '#', 'Door needs a reachable tile on its player side');
assert.notEqual(map[door.y][door.x + 1], '#', 'Door needs a reachable tile on its containment side');

for (let y = 1; y < map.length - 1; y += 1) {
  const tile = map[y][door.x];
  assert.ok(tile === '#' || tile === 'D', `Containment barrier bypass at x=${door.x}, y=${y}: found ${tile}`);
}

const playerStartMatch = source.match(/PLAYER_START=\{x:([\d.]+)\*TILE,y:([\d.]+)\*TILE/);
assert.ok(playerStartMatch, 'PLAYER_START must use tile-relative x/y coordinates');
const start = {
  x: Math.floor(Number(playerStartMatch[1])),
  y: Math.floor(Number(playerStartMatch[2]))
};

function reachable(openDoor) {
  const visited = new Set([`${start.x},${start.y}`]);
  const queue = [start];
  const deltas = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length) {
    const current = queue.shift();
    for (const [dx, dy] of deltas) {
      const x = current.x + dx;
      const y = current.y + dy;
      if (x < 0 || y < 0 || y >= map.length || x >= width) continue;
      const id = `${x},${y}`;
      if (visited.has(id)) continue;
      const tile = map[y][x];
      if (tile === '#' || (tile === 'D' && !openDoor)) continue;
      visited.add(id);
      queue.push({ x, y });
    }
  }
  return visited;
}

const lockedReach = reachable(false);
assert.ok(lockedReach.has(`${key.x},${key.y}`), 'Green Key must be reachable before containment opens');
assert.ok(!lockedReach.has(`${exit.x},${exit.y}`), 'Extraction must not be reachable while the Green Key door is locked');
assert.ok(!lockedReach.has(`${door.x + 1},${door.y}`), 'Player must not cross to the containment side before unlocking the door');

const openReach = reachable(true);
assert.ok(openReach.has(`${exit.x},${exit.y}`), 'Extraction must become reachable after the containment door opens');

console.log('Terpocalypse Veg Lab topology validated:', {
  size: `${width}x${map.length}`,
  door,
  key,
  exit,
  lockedTiles: lockedReach.size,
  openTiles: openReach.size
});
