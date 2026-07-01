export function wallHeightFromDistance(distance, tileSize = 64, scale = 520, maxHeight = 720) {
  return Math.min(maxHeight, (tileSize * scale) / Math.max(1, distance));
}

export function worldToMapPoint(x, y, tileSize = 64, mapSize = 16, offsetX = 30, offsetY = 30) {
  return {
    x: offsetX + (x / tileSize) * mapSize,
    y: offsetY + (y / tileSize) * mapSize
  };
}

export function normalizeAngle(angle) {
  const full = Math.PI * 2;
  return ((angle % full) + full) % full;
}
