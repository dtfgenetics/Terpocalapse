import { MAP_REGISTRY } from "../src/maps/map-registry.js";

const failures = [];

for (const map of MAP_REGISTRY) {
  const rows = map.layout || map.map || [];
  const start = findStart(map, rows);
  const key = findCell(rows, "K");
  const exit = findCell(rows, "X");

  if (!start) failures.push(`${map.title}: missing start`);
  if (!key) failures.push(`${map.title}: missing key marker`);
  if (!exit) failures.push(`${map.title}: missing exit marker`);

  if (start && key && !reachable(rows, start, key, new Set(["#", "D"]))) {
    failures.push(`${map.title}: key is not reachable before door access`);
  }

  if (key && exit && !reachable(rows, key, exit, new Set(["#"]))) {
    failures.push(`${map.title}: exit is not reachable after key access`);
  }
}

if (failures.length > 0) {
  console.error("V2 route validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("V2 route validation passed.");
}

function findStart(map, rows) {
  const marker = findCell(rows, "P");
  if (marker) return marker;
  if (!map.start) return null;
  return { x: Math.floor(map.start.x), y: Math.floor(map.start.y) };
}

function findCell(rows, wanted) {
  for (let y = 0; y < rows.length; y += 1) {
    const x = rows[y].indexOf(wanted);
    if (x !== -1) return { x, y };
  }
  return null;
}

function reachable(rows, from, to, walls) {
  const queue = [from];
  const seen = new Set([`${from.x},${from.y}`]);

  while (queue.length) {
    const current = queue.shift();
    if (current.x === to.x && current.y === to.y) return true;

    for (const next of neighbors(current)) {
      if (next.y < 0 || next.y >= rows.length) continue;
      if (next.x < 0 || next.x >= rows[next.y].length) continue;
      if (walls.has(rows[next.y][next.x])) continue;
      const key = `${next.x},${next.y}`;
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push(next);
    }
  }

  return false;
}

function neighbors(cell) {
  return [
    { x: cell.x + 1, y: cell.y },
    { x: cell.x - 1, y: cell.y },
    { x: cell.x, y: cell.y + 1 },
    { x: cell.x, y: cell.y - 1 }
  ];
}
