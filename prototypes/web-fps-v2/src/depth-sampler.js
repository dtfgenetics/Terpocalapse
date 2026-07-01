import { getMapCell } from "./map.js";

export function sampleDepth(level, x, y, angle, limit = 900) {
  const step = 6;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  for (let distance = 0; distance <= limit; distance += step) {
    const px = x + dx * distance;
    const py = y + dy * distance;
    const cell = getMapCell(level, px, py);
    if (cell === "#" || cell === "D") return { distance, cell, x: px, y: py };
  }

  return {
    distance: limit,
    cell: ".",
    x: x + dx * limit,
    y: y + dy * limit
  };
}
