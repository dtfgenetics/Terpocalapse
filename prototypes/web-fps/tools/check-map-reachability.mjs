import { TILE, MAP, PLAYER_START, PICKUPS } from "../src/game-data.js";

const width = MAP[0].length;
const height = MAP.length;
const start = toTile(PLAYER_START.x, PLAYER_START.y);
const greenKey = PICKUPS.find((item) => item.id === "greenKey");
const greenKeyTile = greenKey ? toTile(greenKey.x, greenKey.y) : null;
const exitTile = findTile("X");

const blockedBeforeKey = new Set(["#", "D"]);
const blockedAfterKey = new Set(["#"]);

const failures = [];

if (!greenKeyTile) failures.push("Green keycard pickup is missing.");
if (!exitTile) failures.push("Exit tile is missing.");

if (greenKeyTile && !isReachable(start, greenKeyTile, blockedBeforeKey)) {
  failures.push("Green keycard is not reachable before opening the green door.");
}

if (greenKeyTile && exitTile && !isReachable(greenKeyTile, exitTile, blockedAfterKey)) {
  failures.push("Exit is not reachable after collecting the green keycard.");
}

if (failures.length > 0) {
  console.error("Map reachability check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Map reachability check passed.");
}

function toTile(x, y) {
  return { x: Math.floor(x / TILE), y: Math.floor(y / TILE) };
}

function findTile(char) {
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (MAP[y][x] === char) return { x, y };
    }
  }
  return null;
}

function isReachable(from, to, blocked) {
  const queue = [from];
  const seen = new Set([key(from)]);
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === to.x && current.y === to.y) return true;
    for (const next of neighbors(current)) {
      if (next.x < 0 || next.x >= width || next.y < 0 || next.y >= height) continue;
      if (blocked.has(MAP[next.y][next.x])) continue;
      const nextKey = key(next);
      if (seen.has(nextKey)) continue;
      seen.add(nextKey);
      queue.push(next);
    }
  }
  return false;
}

function neighbors(tile) {
  return [
    { x: tile.x + 1, y: tile.y },
    { x: tile.x - 1, y: tile.y },
    { x: tile.x, y: tile.y + 1 },
    { x: tile.x, y: tile.y - 1 }
  ];
}

function key(tile) {
  return `${tile.x},${tile.y}`;
}
