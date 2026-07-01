import { canSeePoint } from "./visibility-system.js";

export function pickNearestVisible(state, items, level, reach) {
  let best = null;
  let bestDistance = Infinity;

  for (const item of items || []) {
    if (item.cleared) continue;
    const distance = Math.hypot(item.x - state.player.x, item.y - state.player.y);
    if (distance > reach || distance >= bestDistance) continue;
    if (level && !canSeePoint(level, state.player.x, state.player.y, item.x, item.y)) continue;
    best = item;
    bestDistance = distance;
  }

  return best;
}
