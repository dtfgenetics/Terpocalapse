export function getMapCell(level, x, y) {
  const tx = Math.floor(x / level.tileSize);
  const ty = Math.floor(y / level.tileSize);
  if (ty < 0 || ty >= level.map.length) return "#";
  if (tx < 0 || tx >= level.map[0].length) return "#";
  return level.map[ty][tx];
}

export function isSolid(level, x, y, keyOpen = false) {
  const cell = getMapCell(level, x, y);
  return cell === "#" || (cell === "D" && !keyOpen);
}

export function safeMove(level, item, dx, dy, keyOpen = false) {
  const r = item.radius || 14;
  const nx = item.x + dx;
  const ny = item.y + dy;
  if (!isSolid(level, nx - r, item.y, keyOpen) && !isSolid(level, nx + r, item.y, keyOpen)) item.x = nx;
  if (!isSolid(level, item.x, ny - r, keyOpen) && !isSolid(level, item.x, ny + r, keyOpen)) item.y = ny;
}
