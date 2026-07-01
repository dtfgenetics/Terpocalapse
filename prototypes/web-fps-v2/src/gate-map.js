export function findGateTiles(level) {
  const tiles = [];
  for (let y = 0; y < level.map.length; y += 1) {
    for (let x = 0; x < level.map[y].length; x += 1) {
      if (level.map[y][x] === "D") tiles.push({ x, y, open: false });
    }
  }
  return tiles;
}

export function markGateOpen(tiles, x, y) {
  const tile = tiles.find((item) => item.x === x && item.y === y);
  if (!tile) return false;
  tile.open = true;
  return true;
}

export function gateIsOpen(tiles, x, y) {
  return Boolean(tiles.find((item) => item.x === x && item.y === y && item.open));
}
