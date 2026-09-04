import { gateIsOpen } from "./gate-map.js";

export function sampleDepth(level, x, y, angle, limit = 900, state = null) {
  const tileSize = level.tileSize;
  const dirX = Math.cos(angle);
  const dirY = Math.sin(angle);
  const posX = x / tileSize;
  const posY = y / tileSize;

  let mapX = Math.floor(posX);
  let mapY = Math.floor(posY);

  const deltaDistX = dirX === 0 ? Infinity : Math.abs(1 / dirX);
  const deltaDistY = dirY === 0 ? Infinity : Math.abs(1 / dirY);
  const stepX = dirX < 0 ? -1 : 1;
  const stepY = dirY < 0 ? -1 : 1;

  let sideDistX = dirX < 0
    ? (posX - mapX) * deltaDistX
    : (mapX + 1 - posX) * deltaDistX;
  let sideDistY = dirY < 0
    ? (posY - mapY) * deltaDistY
    : (mapY + 1 - posY) * deltaDistY;

  const maxTileDistance = limit / tileSize;
  let side = "x";
  let distanceTiles = 0;

  while (distanceTiles <= maxTileDistance) {
    if (sideDistX < sideDistY) {
      distanceTiles = sideDistX;
      sideDistX += deltaDistX;
      mapX += stepX;
      side = "x";
    } else {
      distanceTiles = sideDistY;
      sideDistY += deltaDistY;
      mapY += stepY;
      side = "y";
    }

    const cell = getCellByTile(level, mapX, mapY);
    if (!isBlockingCell(cell, state, mapX, mapY)) continue;

    const distance = Math.min(limit, distanceTiles * tileSize);
    return {
      distance,
      cell,
      x: x + dirX * distance,
      y: y + dirY * distance,
      tx: mapX,
      ty: mapY,
      side
    };
  }

  return {
    distance: limit,
    cell: ".",
    x: x + dirX * limit,
    y: y + dirY * limit,
    tx: Math.floor((x + dirX * limit) / tileSize),
    ty: Math.floor((y + dirY * limit) / tileSize),
    side: null
  };
}

function getCellByTile(level, tx, ty) {
  if (ty < 0 || ty >= level.map.length) return "#";
  if (tx < 0 || tx >= level.map[0].length) return "#";
  return level.map[ty][tx];
}

function isBlockingCell(cell, state, tx, ty) {
  if (cell === "#") return true;
  if (cell !== "D") return false;
  if (state?.keyOpen) return false;
  return !gateIsOpen(state?.gates || [], tx, ty);
}
