import { gateIsOpen } from "./gate-map.js";

export function getMapCell(level, x, y) {
  const tx = Math.floor(x / level.tileSize);
  const ty = Math.floor(y / level.tileSize);
  if (ty < 0 || ty >= level.map.length) return "#";
  if (tx < 0 || tx >= level.map[0].length) return "#";
  return level.map[ty][tx];
}

export function getTilePoint(level, x, y) {
  return {
    tx: Math.floor(x / level.tileSize),
    ty: Math.floor(y / level.tileSize)
  };
}

export function tileKey(tx, ty) {
  return `${tx},${ty}`;
}

export function isSolid(level, x, y, state = null) {
  const cell = getMapCell(level, x, y);
  if (cell === "#") return true;
  if (cell !== "D") return false;

  const tile = getTilePoint(level, x, y);
  return !gateIsOpen(state?.gates || [], tile.tx, tile.ty);
}

export function safeMove(level, item, dx, dy, state = null) {
  const r = item.radius || 14;
  const nx = item.x + dx;
  const ny = item.y + dy;

  if (!isSolid(level, nx - r, item.y, state) && !isSolid(level, nx + r, item.y, state)) {
    item.x = nx;
  }
  if (!isSolid(level, item.x, ny - r, state) && !isSolid(level, item.x, ny + r, state)) {
    item.y = ny;
  }
}
